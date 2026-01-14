# Reminders to CSV - Feature Guide

## What It Does

Converts a list of reminders/tasks into a CSV table that separates **EXPENSES** (negative amounts) and **INCOME** (positive amounts) - perfect for importing into Excel or Google Sheets!

## Two Ways to Use It

### Method 1: Standalone Command (Recommended)
**Best for**: Creating formatted CSV tables

1. Open Raycast
2. Type "Convert Reminders to CSV"
3. Paste your reminders list
4. Press Enter
5. ✨ CSV table copied to clipboard!

### Method 2: Quick Action
**Best for**: Quick processing from clipboard

1. Copy reminders to clipboard
2. Open Raycast → "Jan.ai Quick Actions"
3. Select "Reminders to CSV Table"
4. ✨ Result copied to clipboard!

## Input Format

Paste reminders in natural language:

```
Electric bill $150 due Jan 15
Client invoice $5000 received Jan 10
Rent payment $2000 due Jan 20
Freelance project $1200 completed Jan 25
Internet bill $89.99 due monthly
Grocery expenses $450 this month
```

## Output Format

You get TWO CSV tables:

### EXPENSES:
```csv
Date,Subject,Amount
2025-01-15,Electric bill,-150.00
2025-01-20,Rent payment,-2000.00
2025-01-31,Internet bill,-89.99
2025-01-31,Grocery expenses,-450.00
```

### INCOME:
```csv
Date,Subject,Amount
2025-01-10,Client invoice,5000.00
2025-01-25,Freelance project,1200.00
```

## Smart Classification

The AI automatically determines if something is an expense or income based on keywords:

**EXPENSES** (negative amounts):
- bill, payment, due, cost, expense, fee
- rent, utilities, subscription
- "pay to", "owe"

**INCOME** (positive amounts):
- invoice, payment received, earned, income
- "received", "paid to me", "completed"
- client work, freelance

## Date Parsing

Supports multiple date formats:
- **Absolute**: "Jan 15", "January 15th", "2025-01-15"
- **Relative**: "next week", "in 3 days"
- **Recurring**: "monthly", "weekly"
- **Vague**: "this month" (uses last day of month)

## Amount Parsing

Automatically extracts amounts:
- "$150" or "$150.00" → 150.00
- "150 dollars" → 150.00
- "€50" or "50 euros" → 50.00
- No amount specified → 0.00

## Use Cases

### 📊 Monthly Budget Tracking
```
Input:
- Salary $6000 received
- Rent $2000 due
- Utilities $300 total
- Freelance $1500 completed

Output: Clean CSV to import into budget spreadsheet
```

### 💼 Business Expense Report
```
Input:
- Client A invoice $5000 paid
- Office rent $1200 due
- Software licenses $450 monthly
- Contractor payment $2000 due

Output: Separated expenses vs. income for accounting
```

### 📅 Annual Financial Planning
```
Input:
- Q1 revenue $45000 estimated
- Annual insurance $3600 due
- Quarterly taxes $8000 due
- Equipment upgrade $5000 planned

Output: Full year projection in CSV
```

## Pro Tips

✅ **Be specific with dates** - "Jan 15" is better than "next month"
✅ **Use keywords** - "bill", "invoice", "received" help classification
✅ **Include currency** - "$150" is clearer than "150"
✅ **One reminder per line** - Easier for AI to parse
✅ **Paste directly into Excel/Sheets** - CSV format is ready to import

## Example Workflow

1. **Copy reminders** from email, notes, or Apple Reminders
2. **Run command** in Raycast
3. **Paste into spreadsheet** (Excel, Google Sheets, Numbers)
4. **Create pivot tables/charts** for visualization
5. **Track monthly spending** vs. income

## Importing to Spreadsheet Apps

### Excel
1. Create new workbook
2. Paste CSV (Ctrl/Cmd+V)
3. Use "Text to Columns" if needed
4. Format as table

### Google Sheets
1. Create new sheet
2. Paste CSV (Ctrl/Cmd+V)
3. Data automatically separates into columns

### Numbers (Mac)
1. Create new spreadsheet
2. Paste CSV
3. Format as needed

## Troubleshooting

**Amounts not negative for bills?**
→ Make sure to use keywords like "bill", "payment", "due"

**Dates not parsing correctly?**
→ Use explicit dates like "Jan 15" instead of "soon"

**Income classified as expense?**
→ Add keywords like "received", "invoice", "earned"

**All amounts are 0?**
→ Include $ symbol or "dollars" in the text

## Output Customization

The CSV format can be easily modified in spreadsheet:
- Add columns (Category, Notes, Status)
- Calculate totals/subtotals
- Create charts and graphs
- Filter by date range
- Sort by amount

## Advanced Examples

### Recurring Bills
```
Input:
- Netflix $15.99 monthly
- Gym membership $50 monthly  
- Phone bill $80 monthly

Output: Each gets current month's date
```

### Mixed Transactions
```
Input:
- Client payment $3000 received yesterday
- Office supplies $127.50 purchased today
- Consulting fee $1500 due next Friday
- Refund $45 received today

Output: Properly split into expenses and income
```

### International Currency
```
Input:
- Euro invoice €2000 received
- Pound payment £500 due
- Dollar bill $150 due

Output: All amounts properly extracted (symbol retained in subject)
```

## Keyboard Shortcuts

When form is open:
- **⌘V** - Paste from clipboard
- **⌘Enter** - Submit/Convert
- **Esc** - Cancel

---

**Need help?** The AI is smart but works best with clear, structured input. Use keywords and explicit dates for best results!
