import {
  ActionPanel,
  Action,
  Form,
  showToast,
  Toast,
  Clipboard,
  popToRoot,
} from "@raycast/api";
import { useState } from "react";
import { exec } from "child_process";
import { promisify } from "util";
import { sendToJanAi } from "./utils/janApi";

const execAsync = promisify(exec);

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleExport(values: { days: string; format: string }) {
    setIsLoading(true);

    try {
      await showToast({
        style: Toast.Style.Animated,
        title: "Reading Reminders database...",
      });

      const numDays = parseInt(values.days) || 7;

      // Query the Reminders SQLite database directly
      const dbPath = "~/Library/Reminders/Container_v1/Stores/Data-*.sqlite";

      // SQL query to get reminders with due dates
      const sqlQuery = `
        SELECT 
          ZTITLE,
          datetime(ZDUEDATE + 978307200, 'unixepoch', 'localtime') as due_date,
          ZNOTES
        FROM ZREMINDER 
        WHERE ZCOMPLETED = 0 
          AND ZDUEDATE IS NOT NULL
        ORDER BY ZDUEDATE;
      `;

      console.log("[extract-reminders-db] Querying SQLite database...");

      try {
        const { stdout } = await execAsync(
          `sqlite3 ${dbPath} "${sqlQuery.replace(/"/g, '\\"')}"`,
          { timeout: 5000 },
        );

        if (!stdout || stdout.trim().length < 2) {
          await showToast({
            style: Toast.Style.Failure,
            title: "No reminders found",
            message: "No incomplete reminders with due dates",
          });
          await popToRoot();
          return;
        }

        console.log(
          "[extract-reminders-db] Got data, processing with Jan.ai...",
        );

        await showToast({
          style: Toast.Style.Animated,
          title: "Processing with Jan.ai...",
        });

        // Send to Jan.ai for processing
        const csvPrompt = buildCSVPrompt(numDays, values.format);

        const csvOutput = await sendToJanAi([
          { role: "system", content: csvPrompt },
          { role: "user", content: `Here are the reminders:\\n\\n${stdout}` },
        ]);

        // Clean up response
        let cleanedCSV = csvOutput.trim();
        cleanedCSV = cleanedCSV
          .replace(/```csv\\n?/g, "")
          .replace(/```\\n?/g, "");

        await Clipboard.copy(cleanedCSV);

        await showToast({
          style: Toast.Style.Success,
          title: "CSV copied!",
          message: "Paste into Excel/Sheets",
        });

        await popToRoot();
      } catch (dbError) {
        console.error(
          "[extract-reminders-db] Database access failed:",
          dbError,
        );

        // Fallback: Manual input
        await showToast({
          style: Toast.Style.Failure,
          title: "Database access failed",
          message: "Please use manual copy/paste method",
        });
        await popToRoot();
      }
    } catch (error) {
      console.error("[extract-reminders-db] Error:", error);

      await showToast({
        style: Toast.Style.Failure,
        title: "Export failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Export to Csv" onSubmit={handleExport} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="days"
        title="Days Ahead"
        placeholder="7"
        defaultValue="7"
      />

      <Form.Dropdown id="format" title="Format" defaultValue="expense-income">
        <Form.Dropdown.Item
          value="expense-income"
          title="Expense/Income Split"
        />
        <Form.Dropdown.Item
          value="weekly"
          title="Weekly View (Running Balance)"
        />
      </Form.Dropdown>

      <Form.Description text="Reads Reminders database directly (bypasses AppleScript)" />
    </Form>
  );
}

function buildCSVPrompt(numDays: number, format: string): string {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + numDays);

  const todayStr = today.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  if (format === "weekly") {
    return `Convert reminders into CSV with running balance.

TODAY: ${todayStr}
RANGE: ${todayStr} to ${endDateStr}

Input format: Title|Date|Notes

Output CSV:
Date,Description,Amount,Balance

Extract amounts from title or notes. Bills/fees = negative, income = positive.
Add SUMMARY at end with totals.`;
  } else {
    return `Convert reminders into two CSV tables: EXPENSES and INCOME.

TODAY: ${todayStr}
RANGE: ${todayStr} to ${endDateStr}

Input format: Title|Date|Notes

EXPENSES (negative):
- Keywords: bill, payment, fee, expense, deposit (paying out)

INCOME (positive):
- Keywords: invoice, received, client payment

Output both tables with totals and NET calculation.`;
  }
}
