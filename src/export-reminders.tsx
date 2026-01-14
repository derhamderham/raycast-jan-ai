import {
  ActionPanel,
  Action,
  List,
  showToast,
  Toast,
  Clipboard,
  getPreferenceValues,
  Icon,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { exec } from "child_process";
import { promisify } from "util";
import { Preferences } from "./utils/types";

const execAsync = promisify(exec);

interface Reminder {
  name: string;
  dueDate: string | null;
  notes: string;
}

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState<string>("");
  const preferences = getPreferenceValues<Preferences>();
  const listName = preferences.reminderList || "To Do";

  useEffect(() => {
    loadReminders();
  }, []);

  async function loadReminders() {
    setIsLoading(true);
    setError("");

    try {
      console.log("[export-reminders] Loading from:", listName);

      await showToast({
        style: Toast.Style.Animated,
        title: "Loading reminders...",
        message: "This may take up to 20 seconds",
      });

      // Ultra-simplified script - get ALL incomplete reminders (even without dates)
      const script = `
tell application "Reminders"
  set output to ""
  try
    set todoList to list "${listName.replace(/"/g, '\\"')}"
    set allReminders to (reminders of todoList whose completed is false)
    
    repeat with r in allReminders
      try
        -- Only include if it has a due date
        if due date of r is not missing value then
          set rName to name of r as text
          set rDue to short date string of (due date of r)
          set rNotes to ""
          try
            set rNotes to body of r as text
          end try
          set output to output & rName & "|||" & rDue & "|||" & rNotes & "\\n"
        end if
      end try
    end repeat
  end try
  return output
end tell
`;

      console.log(
        "[export-reminders] Executing AppleScript with 20s timeout...",
      );

      // 20-second timeout as requested
      const result = await Promise.race([
        execAsync(`osascript -e '${script.replace(/'/g, "'\\''")}'`),
        new Promise<{ stdout: string; stderr: string }>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "AppleScript timeout after 20 seconds. Your reminder list may be too large. Try using a smaller list or the manual copy/paste method.",
                ),
              ),
            20000,
          ),
        ),
      ]);

      const { stdout } = result;

      console.log("[export-reminders] Got response, length:", stdout.length);
      console.log(
        "[export-reminders] First 200 chars:",
        stdout.substring(0, 200),
      );

      if (!stdout || stdout.trim() === "" || stdout.trim().length < 2) {
        console.log("[export-reminders] Empty or minimal response");
        setReminders([]);
        setError(
          `No incomplete reminders with due dates found in "${listName}"`,
        );

        await showToast({
          style: Toast.Style.Success,
          title: "No reminders found",
          message: `List "${listName}" has no incomplete reminders with due dates`,
        });
        return;
      }

      // Filter to next 7 days in JavaScript
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const allParsed = stdout
        .trim()
        .split("\\n")
        .filter(Boolean)
        .map((line) => {
          const parts = line.split("|||");
          return {
            name: parts[0]?.trim() || "",
            dueDate: parts[1]?.trim() || null,
            notes: parts[2]?.trim() || "",
          };
        });

      console.log("[export-reminders] Parsed total:", allParsed.length);

      // Filter to next 7 days
      const filtered = allParsed.filter((r) => {
        if (!r.dueDate) return false;

        // Parse "1/5/26" format
        const dateParts = r.dueDate.split("/");
        if (dateParts.length !== 3) return false;

        const month = parseInt(dateParts[0]) - 1;
        const day = parseInt(dateParts[1]);
        const year = 2000 + parseInt(dateParts[2]);
        const reminderDate = new Date(year, month, day);

        return reminderDate >= today && reminderDate <= nextWeek;
      });

      console.log(
        `[export-reminders] Filtered to next 7 days: ${filtered.length}`,
      );
      setReminders(filtered);

      await showToast({
        style: Toast.Style.Success,
        title: `${filtered.length} reminder(s) loaded`,
        message: "Next 7 days",
      });
    } catch (error) {
      console.error("[export-reminders] Error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setError(errorMsg);

      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load reminders",
        message: errorMsg,
      });
      setReminders([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function exportToCSV(format: "week" | "expense-income") {
    if (reminders.length === 0) {
      await showToast({
        style: Toast.Style.Failure,
        title: "No reminders to export",
        message: "No reminders found for the next week",
      });
      return;
    }

    try {
      let csvOutput = "";

      if (format === "week") {
        csvOutput = generateWeeklyCSV(reminders);
      } else {
        csvOutput = generateExpenseIncomeCSV(reminders);
      }

      await Clipboard.copy(csvOutput);

      await showToast({
        style: Toast.Style.Success,
        title: "CSV copied to clipboard",
        message: `${reminders.length} reminder(s) exported - paste into Excel/Sheets`,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Export failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search reminders...">
      <List.Section title={`Next 7 Days (${reminders.length} reminders)`}>
        {error && !isLoading ? (
          <List.Item
            title="Error Loading Reminders"
            subtitle={error}
            icon={Icon.ExclamationMark}
            actions={
              <ActionPanel>
                <Action
                  title="Retry"
                  icon={Icon.ArrowClockwise}
                  onAction={loadReminders}
                />
              </ActionPanel>
            }
          />
        ) : reminders.length === 0 && !isLoading ? (
          <List.Item
            title="No Reminders Found"
            subtitle={`No reminders in "${listName}" for the next 7 days`}
            icon={Icon.Info}
            actions={
              <ActionPanel>
                <Action
                  title="Refresh"
                  icon={Icon.ArrowClockwise}
                  onAction={loadReminders}
                />
              </ActionPanel>
            }
          />
        ) : (
          reminders.map((reminder, index) => (
            <List.Item
              key={index}
              title={reminder.name}
              subtitle={reminder.dueDate || "No due date"}
              accessories={[{ text: extractAmount(reminder.notes) || "" }]}
              actions={
                <ActionPanel>
                  <Action
                    title="Export Weekly View (csv)"
                    icon={Icon.Document}
                    onAction={() => exportToCSV("week")}
                  />
                  <Action
                    title="Export Expense/income Split (csv)"
                    icon={Icon.BarChart}
                    onAction={() => exportToCSV("expense-income")}
                  />
                  <Action
                    title="Refresh"
                    icon={Icon.ArrowClockwise}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                    onAction={loadReminders}
                  />
                </ActionPanel>
              }
            />
          ))
        )}
      </List.Section>
    </List>
  );
}

function extractAmount(notes: string): string | null {
  const match = notes.match(
    /Amount:\s*\$?([-]?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,
  );
  if (match) {
    const amount = parseFloat(match[1].replace(/,/g, ""));
    return amount >= 0
      ? `+$${amount.toFixed(2)}`
      : `-$${Math.abs(amount).toFixed(2)}`;
  }
  return null;
}

function parseAmount(notes: string): number {
  const match = notes.match(
    /Amount:\s*\$?([-]?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,
  );
  if (match) {
    return parseFloat(match[1].replace(/,/g, ""));
  }
  return 0;
}

function formatDateForCSV(dateStr: string | null): string {
  if (!dateStr) return "";

  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const month = parts[0].padStart(2, "0");
    const day = parts[1].padStart(2, "0");
    const year = `20${parts[2]}`;
    return `${year}-${month}-${day}`;
  }
  return dateStr;
}

function generateWeeklyCSV(reminders: Reminder[]): string {
  const sorted = [...reminders].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return (
      new Date(formatDateForCSV(a.dueDate)).getTime() -
      new Date(formatDateForCSV(b.dueDate)).getTime()
    );
  });

  let csv = "Date,Description,Amount,Balance\n";
  let runningBalance = 0;

  sorted.forEach((reminder) => {
    const date = formatDateForCSV(reminder.dueDate);
    const description = reminder.name.replace(/,/g, ";");
    const amount = parseAmount(reminder.notes);
    runningBalance += amount;

    csv += `${date},${description},${amount.toFixed(2)},${runningBalance.toFixed(2)}\n`;
  });

  csv += "\n";
  csv += "SUMMARY\n";

  const totalIn = sorted.reduce((sum, r) => {
    const amt = parseAmount(r.notes);
    return amt > 0 ? sum + amt : sum;
  }, 0);

  const totalOut = sorted.reduce((sum, r) => {
    const amt = parseAmount(r.notes);
    return amt < 0 ? sum + Math.abs(amt) : sum;
  }, 0);

  csv += `Total Income,${totalIn.toFixed(2)}\n`;
  csv += `Total Expenses,${totalOut.toFixed(2)}\n`;
  csv += `Net Change,${(totalIn - totalOut).toFixed(2)}\n`;

  return csv;
}

function generateExpenseIncomeCSV(reminders: Reminder[]): string {
  const expenses = reminders.filter((r) => parseAmount(r.notes) < 0);
  const income = reminders.filter((r) => parseAmount(r.notes) > 0);

  let csv = "EXPENSES:\n";
  csv += "Date,Description,Amount\n";

  expenses
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return (
        new Date(formatDateForCSV(a.dueDate)).getTime() -
        new Date(formatDateForCSV(b.dueDate)).getTime()
      );
    })
    .forEach((r) => {
      const date = formatDateForCSV(r.dueDate);
      const description = r.name.replace(/,/g, ";");
      const amount = Math.abs(parseAmount(r.notes));
      csv += `${date},${description},-${amount.toFixed(2)}\n`;
    });

  const totalExpenses = expenses.reduce(
    (sum, r) => sum + Math.abs(parseAmount(r.notes)),
    0,
  );
  csv += `TOTAL EXPENSES:,-${totalExpenses.toFixed(2)}\n`;

  csv += "\n";
  csv += "INCOME:\n";
  csv += "Date,Description,Amount\n";

  income
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return (
        new Date(formatDateForCSV(a.dueDate)).getTime() -
        new Date(formatDateForCSV(b.dueDate)).getTime()
      );
    })
    .forEach((r) => {
      const date = formatDateForCSV(r.dueDate);
      const description = r.name.replace(/,/g, ";");
      const amount = parseAmount(r.notes);
      csv += `${date},${description},${amount.toFixed(2)}\n`;
    });

  const totalIncome = income.reduce((sum, r) => sum + parseAmount(r.notes), 0);
  csv += `TOTAL INCOME:,${totalIncome.toFixed(2)}\n`;

  csv += "\n";
  csv += `NET (Income - Expenses):,${(totalIncome - totalExpenses).toFixed(2)}\n`;

  return csv;
}
