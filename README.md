# Jan AI Assistant

A comprehensive Raycast extension for Jan.ai that provides text processing, quick actions, and intelligent reminder creation.

## Features

### 1. Process with Jan.ai
Interactive text processing with multiple quick actions:
- **Summarize** - Create concise summaries
- **Improve Writing** - Enhance clarity and flow
- **Fix Grammar** - Correct errors and typos
- **Make Professional** - Convert to business language
- **Explain** - Simplify complex concepts

### 2. Jan.ai Quick Actions
Fast clipboard-based actions:
- Summarize, improve, fix grammar
- Make professional or casual
- Expand or shorten text
- Explain concepts
- Translate to Spanish
- Convert to bullet points

### 3. Create Reminder from Text
Intelligent reminder creation with special support for bills and invoices:
- **Natural language parsing** - "Call dentist tomorrow"
- **Invoice & bill tracking** - "Electric bill $150 due Jan 15"
- **Due date extraction** - Supports relative and absolute dates
- **Recurring reminders** - Daily, weekly, monthly, yearly
- **Amount tracking** - Extracts and stores dollar amounts

### 4. Create Reminder from PDF Invoice 📄
Right-click PDF invoices to automatically extract payment info:
- **PDF text extraction** - Extracts text from invoice PDFs
- **Multi-payment support** - Handles split payments (50% down, 50% NET 30)
- **Automatic date parsing** - Detects explicit dates and NET terms
- **Finder Quick Action** - Right-click any PDF → Create reminders
- **Batch processing** - Process multiple PDFs at once

See [PDF-QUICK-ACTION-SETUP.md](PDF-QUICK-ACTION-SETUP.md) for installation instructions.

### 5. Convert Reminders to CSV 📊 NEW!
Parse reminders and convert to CSV table for spreadsheet import:
- **Automatic categorization** - Separates expenses from income
- **Smart date parsing** - Handles multiple date formats
- **Amount extraction** - Pulls dollar amounts automatically
- **CSV export** - Ready to paste into Excel/Google Sheets
- **Dual tables** - EXPENSES (negative) and INCOME (positive) separated

See [REMINDERS-TO-CSV-GUIDE.md](REMINDERS-TO-CSV-GUIDE.md) for usage examples.

## Prerequisites

1. **Jan.ai** running locally with API server enabled
2. **Apple Reminders** app (for reminder creation)
3. Jan.ai model downloaded (e.g., llama-3.1-8b-instruct, mistral-7b-instruct)

## Installation

```bash
git clone <repository>
cd jan-ai-assistant
npm install
npm run dev
```

## Configuration

In Raycast preferences for this extension:

- **Jan.ai API URL**: Default `http://localhost:1337/v1/chat/completions`
- **API Key**: Your Jan.ai API key
- **Default Model**: Model name (e.g., `llama-3.1-8b-instruct`)
- **Temperature**: 0.0-1.0 (default: 0.7)
- **Max Tokens**: Maximum response length (default: 2000)
- **Reminder List Name**: Apple Reminders list (default: "To Do")

## Usage

### Process with Jan.ai

1. Copy text to clipboard or provide as argument
2. Run "Process with Jan.ai" command
3. Select action from menu
4. View result and copy/paste as needed

### Quick Actions

1. Copy text to clipboard
2. Run "Jan.ai Quick Actions" command
3. Select desired action
4. Result is automatically copied to clipboard

### Create Reminder

Run "Create Reminder from Text" with examples like:

**Simple tasks:**
```
Call dentist tomorrow
Buy groceries on Friday
```

**Bills with amounts:**
```
Electric bill $150 due January 15th
Internet $89.99 due next week
```

**Recurring bills:**
```
Monthly rent $2000 due on the 1st
Weekly gym class every Monday
```

**Invoices:**
```
Client invoice $5000 due next Friday
Quarterly tax payment $3500 due March 15
```

## How Reminders Work

1. Text is sent to Jan.ai for structured extraction
2. Jan.ai returns JSON with:
   - Title
   - Amount (if applicable)
   - Due date
   - Recurrence pattern
   - Bill/Invoice classification
3. Extension creates reminder in Apple Reminders with:
   - Task title
   - Amount in notes (formatted as "$150.00")
   - Due date
   - [BILL] or [INVOICE] tag
   - Recurrence information

## Supported Date Formats

- **Relative**: "tomorrow", "next week", "in 3 days"
- **Absolute**: "Jan 15", "January 15th", "2025-01-15"
- **Day names**: "Monday", "next Friday"

## Supported Repeat Intervals

- `daily`
- `weekly`
- `monthly`
- `yearly`

## Troubleshooting

### "Cannot connect to Jan.ai"
- Ensure Jan.ai is running
- Enable API server in Jan.ai settings
- Verify API URL in preferences

### "Missing authorization header"
- Set your Jan.ai API key in preferences
- Verify the key is correct

### Model errors
- Check installed models in Jan.ai
- Use exact model ID (case-sensitive)
- Verify model is downloaded and active

### Reminder creation fails
- Ensure "To Do" list exists in Apple Reminders
- Extension will create list if missing
- Check Reminders app permissions

## Project Structure

```
jan-ai-assistant/
├── src/
│   ├── process-text.tsx       # Text processing command
│   ├── quick-actions.tsx      # Quick actions command
│   ├── create-reminder.tsx    # Reminder creation command
│   └── utils/
│       ├── janApi.ts          # Jan.ai API integration
│       ├── reminderUtils.ts   # Apple Reminders integration
│       ├── textHelpers.ts     # Text formatting utilities
│       └── types.ts           # TypeScript types
├── package.json               # Dependencies & config
├── tsconfig.json              # TypeScript config
└── README.md                  # Documentation
```

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint
```

## Tips

1. **Better date parsing**: Be specific - "Jan 15" works better than "next month"
2. **Amount extraction**: Include currency symbols - "$150" or "€50"
3. **Categorization**: Use keywords like "bill", "invoice", "recurring" for better results
4. **Model selection**: Larger models give better extraction but are slower

## Getting Your Model Name

```bash
curl http://localhost:1337/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Common model IDs:
- `llama-3.1-8b-instruct`
- `mistral-7b-instruct-v0.2`
- `phi-2`

## License

MIT
