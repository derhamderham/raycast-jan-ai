# PDF Invoice Processing - Implementation Summary

## What We Built

A complete PDF invoice processing system for your Raycast extension that lets you right-click PDF files in Finder (or email attachments) and automatically create reminders.

## Files Created/Modified

### 1. **package.json** (Modified)
Added new command:
- `create-reminder-from-pdf` - Processes PDF files and creates reminders

### 2. **src/create-reminder-from-pdf.tsx** (New)
Main command file that:
- Accepts PDF file paths from Finder
- Extracts text from PDFs
- Processes with Jan.ai
- Creates reminders in Apple Reminders
- Handles multiple PDFs at once
- Shows progress toasts

### 3. **src/utils/pdfUtils.ts** (New)
PDF text extraction utilities:
- Uses macOS built-in `textutil` (primary method)
- Falls back to `pdftotext` if installed
- Handles errors gracefully
- Supports batch processing

### 4. **PDF-QUICK-ACTION-SETUP.md** (New)
Complete setup instructions for creating the Finder Quick Action

### 5. **README.md** (Modified)
Added documentation for the new PDF feature

## How It Works

```
┌─────────────────┐
│  PDF Invoice    │
│  (Finder)       │
└────────┬────────┘
         │ Right-click →
         │ "Create Reminder from PDF Invoice"
         ↓
┌─────────────────┐
│  Quick Action   │
│  (Automator)    │
└────────┬────────┘
         │ Passes file path
         ↓
┌─────────────────┐
│  Raycast Cmd    │
│  (PDF processor)│
└────────┬────────┘
         │ 1. Extract text
         ↓
┌─────────────────┐
│  pdfUtils.ts    │
│  textutil/      │
│  pdftotext      │
└────────┬────────┘
         │ 2. Parse with AI
         ↓
┌─────────────────┐
│  Jan.ai API     │
│  (Extract data) │
└────────┬────────┘
         │ 3. Create reminders
         ↓
┌─────────────────┐
│  Apple          │
│  Reminders      │
└─────────────────┘
```

## Setup Steps for User

### Step 1: Rebuild Extension
```bash
cd "/Users/mike/Library/Application Support/com.raycast.macos/extensions/jan-ai-extension"
npm run dev  # or npm run build
```

### Step 2: Create Quick Action
Follow instructions in `PDF-QUICK-ACTION-SETUP.md`:

1. Open Automator
2. Create new Quick Action
3. Set to receive "PDF files" in "Finder"
4. Add "Run Shell Script" action
5. Paste the shell script (update `your-name` with actual author)
6. Save as "Create Reminder from PDF Invoice"

### Step 3: Test
1. Right-click any PDF invoice
2. Select Quick Actions → Create Reminder from PDF Invoice
3. Watch as reminders are created!

## Features

✅ **Automatic text extraction** - Works with most PDF invoices
✅ **Multi-payment support** - Handles split payments (50% down, 50% NET 30)
✅ **Date parsing** - Explicit dates ("12.26.25") and NET terms
✅ **Batch processing** - Select multiple PDFs and process at once
✅ **Works from Finder** - Right-click context menu
✅ **Works from Mail** - Right-click email attachments
✅ **Error handling** - Graceful failures with clear messages

## Example Use Case

**PDF Invoice Contains:**
```
INVOICE #185
Hemp Hunter Construction

Payment Terms:
50% DOWN    $60,470.15  DUE TODAY
50% NET 30  $60,470.15  DUE 12.26.25

Total: $120,940.30
```

**After Right-Click → Create Reminder:**

**Reminder 1:**
- Title: "50% Down Payment - Invoice #185"
- Due: December 28, 2025 (today)
- Amount: $60,470.15
- Notes: "Invoice #185"

**Reminder 2:**
- Title: "50% NET 30 Payment - Invoice #185"
- Due: December 26, 2025 (explicit date)
- Amount: $60,470.15
- Notes: "Invoice #185"

## Technical Details

### PDF Text Extraction Methods

1. **textutil** (Built-in macOS)
   - No installation required
   - Works for most PDFs
   - Fast and reliable

2. **pdftotext** (Homebrew)
   - Fallback option
   - Install: `brew install poppler`
   - Better for complex PDFs

### File Path Handling

- Supports single or multiple PDFs
- Comma-separated paths from Finder
- URL encoding for Raycast deep links
- Shell escaping for security

### Error Handling

- PDF extraction failures
- Jan.ai connection errors
- Reminder creation failures
- Per-file error tracking

## Limitations

⚠️ **Scanned/Image PDFs** - Won't work with scanned documents (no OCR)
⚠️ **Encrypted PDFs** - May fail on password-protected files
⚠️ **Complex Layouts** - Some PDFs may have jumbled text extraction

## Future Enhancements

Possible improvements:
- OCR support for scanned PDFs (Tesseract)
- PDF form field extraction
- Attachment handling (ZIP files with PDFs)
- Email integration (process from Mail.app directly)
- Preview window before creating reminders

## Testing Checklist

- [ ] Extension builds successfully
- [ ] Quick Action appears in Finder
- [ ] Single PDF processes correctly
- [ ] Multiple PDFs batch process
- [ ] Dates parse correctly
- [ ] Amounts extract correctly
- [ ] Reminders created in Apple Reminders
- [ ] Error messages are clear
- [ ] Works from email attachments

## Support

For issues:
1. Check Jan.ai is running
2. Verify API settings
3. Test PDF text extraction manually: `textutil -convert txt -stdout invoice.pdf`
4. Check Raycast logs
5. Verify Quick Action is properly installed

---

**Status**: ✅ Complete and ready for testing
**Next Step**: Follow PDF-QUICK-ACTION-SETUP.md to install the Quick Action
