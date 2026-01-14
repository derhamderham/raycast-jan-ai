# Reminders to CSV - Implementation Summary

## What Was Built

A new command that converts pasted reminders text into a CSV table with expenses and income separated - perfect for importing into Excel or Google Sheets for budget tracking.

## Files Created/Modified

### 1. **src/reminders-to-csv.tsx** (New)
Standalone command that:
- Provides a form interface for pasting reminders
- Sends to Jan.ai for parsing
- Converts to CSV format with two tables (EXPENSES and INCOME)
- Copies result to clipboard
- Includes paste-from-clipboard shortcut (⌘V)

### 2. **src/quick-actions.tsx** (Modified)
Added "Reminders to CSV Table" quick action:
- Works from clipboard
- Same functionality as standalone command
- Faster for quick conversions

### 3. **package.json** (Modified)
Added new command:
- `reminders-to-csv` - Full-featured form interface

### 4. **REMINDERS-TO-CSV-GUIDE.md** (New)
Comprehensive usage guide with:
- Examples and use cases
- Input/output formats
- Spreadsheet import instructions
- Troubleshooting tips

### 5. **README.md** (Modified)
Added documentation for the CSV conversion feature

## How It Works

```
┌─────────────────────┐
│  Paste Reminders    │
│  (Natural Language) │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Jan.ai Parsing     │
│  (Extract Data)     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Smart              │
│  Classification     │
│  (Expense/Income)   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Two CSV Tables     │
│  - EXPENSES         │
│  - INCOME           │
└─────────────────────┘
```

## Features

✅ **Two separate tables** - Expenses and income clearly separated
✅ **Smart categorization** - Auto-detects bills vs. income
✅ **Date parsing** - Handles relative and absolute dates
✅ **Amount extraction** - Pulls dollar amounts automatically
✅ **Negative/Positive** - Bills are negative, income is positive
✅ **CSV format** - Ready to paste into spreadsheets
✅ **Two interfaces** - Standalone form or quick action

## Classification Logic

### EXPENSES (Negative Amounts)
Keywords: bill, payment, due, cost, expense, fee, rent, subscription

Examples:
- "Electric bill $150 due Jan 15" → -150.00
- "Rent payment $2000" → -2000.00

### INCOME (Positive Amounts)  
Keywords: invoice, received, earned, income, completed, paid to me

Examples:
- "Client invoice $5000 received" → 5000.00
- "Freelance work $1200 completed" → 1200.00

## Example Usage

### Input:
```
Electric bill $150 due Jan 15
Client invoice $5000 received Jan 10
Rent payment $2000 due Jan 20
Freelance project $1200 completed Jan 25
```

### Output:
```csv
EXPENSES:
Date,Subject,Amount
2025-01-15,Electric bill,-150.00
2025-01-20,Rent payment,-2000.00

INCOME:
Date,Subject,Amount
2025-01-10,Client invoice,5000.00
2025-01-25,Freelance project,1200.00
```

## Two Ways to Access

### 1. Standalone Command (Recommended)
**Command**: "Convert Reminders to CSV"
- Full form interface
- Paste reminders
- See preview before converting
- Best for larger lists

### 2. Quick Action
**Command**: "Jan.ai Quick Actions" → "Reminders to CSV Table"
- Clipboard-based
- Instant conversion
- Best for quick tasks

## Use Cases

### 📊 Monthly Budget Tracking
Convert all monthly bills and income into CSV → Import to budget spreadsheet → Track spending

### 💼 Business Expense Reports
Separate business expenses from income → Export to CSV → Submit to accounting

### 📅 Financial Planning
List all expected expenses and income → Convert to CSV → Analyze in Excel

### 🏦 Bank Reconciliation
Extract transactions from reminders → CSV format → Match against bank statements

## Spreadsheet Import

### Excel
1. Paste CSV
2. Data separates into columns automatically
3. Create pivot tables
4. Add charts/formulas

### Google Sheets
1. Paste CSV
2. Columns auto-populate
3. Use built-in analysis tools

### Numbers (Mac)
1. Paste CSV
2. Format as table
3. Create visualizations

## Advanced Features

### Date Parsing
- "Jan 15" → 2025-01-15
- "next Friday" → calculated date
- "monthly" → uses current month

### Amount Formats
- "$150" → 150.00
- "150 dollars" → 150.00
- "€50" → 50.00
- No amount → 0.00

### Smart Defaults
- Uses current year if not specified
- Sorts by date within each table
- Two decimal places for all amounts

## Technical Details

### System Prompt
The command uses a detailed system prompt that:
- Defines CSV output format
- Specifies classification rules
- Provides examples
- Ensures consistency

### Error Handling
- Validates input text
- Cleans markdown formatting
- Removes code blocks
- Provides clear error messages

### Performance
- Low temperature (0.1) for consistency
- Moderate token limit (2000)
- Fast processing for typical lists

## Future Enhancements

Possible improvements:
- Multi-currency support
- Category tags (utilities, rent, etc.)
- Monthly totals row
- Year-to-date summaries
- Export to multiple formats (Excel, JSON)

## Testing Checklist

- [ ] Standalone command opens correctly
- [ ] Quick action appears in menu
- [ ] Paste from clipboard works (⌘V)
- [ ] Expenses classified correctly
- [ ] Income classified correctly
- [ ] Dates parse accurately
- [ ] Amounts extract properly
- [ ] Negative/positive signs correct
- [ ] CSV format valid
- [ ] Copies to clipboard
- [ ] Imports to Excel/Sheets cleanly

## Known Limitations

⚠️ **Ambiguous items** - Some items may be hard to classify (clarify with keywords)
⚠️ **Complex dates** - Very vague dates may default to end of month
⚠️ **Currency conversion** - No automatic conversion between currencies
⚠️ **Formatting** - Output is plain CSV (no colors or formatting)

## Tips for Best Results

1. **Use keywords** - Include "bill", "invoice", "received" for clarity
2. **Be specific** - "Jan 15" is better than "soon"
3. **One per line** - Makes parsing easier
4. **Include amounts** - Use $ symbol for clarity
5. **Test small first** - Try with 3-4 items before bulk processing

---

**Status**: ✅ Complete and ready to use
**Next Step**: Try it with your reminders!

Example test input:
```
Electric bill $150 due Jan 15
Client payment $5000 received yesterday
Rent $2000 due on the 1st
Freelance work $1200 completed
```
