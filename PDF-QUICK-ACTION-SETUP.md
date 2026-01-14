# PDF Invoice Reminder - Quick Action Setup

## What This Does
Right-click any PDF invoice in Finder → Extract payment info → Create reminders automatically!

## Installation Steps

### Step 1: Open Automator
1. Open **Automator** (search in Spotlight)
2. Click **New Document**
3. Select **Quick Action** (or "Service" on older macOS)

### Step 2: Configure the Quick Action
1. At the top, set:
   - **Workflow receives current**: `PDF files`
   - **in**: `Finder`

2. In the left sidebar, search for "Run Shell Script"

3. Drag **Run Shell Script** to the right panel

4. In the shell script box, paste this code:

```bash
#!/bin/bash

# Get file paths from input
FILES=""
for file in "$@"; do
    if [ -n "$FILES" ]; then
        FILES="$FILES,$file"
    else
        FILES="$file"
    fi
done

# URL encode the file paths for Raycast
ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$FILES'))")

# Open Raycast command with PDF file paths
open "raycast://extensions/your-name/jan-ai-assistant/create-reminder-from-pdf?arguments=%7B%22files%22%3A%22$ENCODED%22%7D"
```

**IMPORTANT**: Replace `your-name` with your actual Raycast extension author name from `package.json`

5. Set **Pass input**: `as arguments`

### Step 3: Save the Quick Action
1. Press **⌘S** to save
2. Name it: **Create Reminder from PDF Invoice**
3. Close Automator

### Step 4: Test It!
1. Find any PDF invoice in Finder
2. Right-click the PDF
3. Go to **Quick Actions** (or **Services**)
4. Click **Create Reminder from PDF Invoice**

The PDF will be:
- Extracted to text
- Processed by Jan.ai
- Converted to reminders with payment dates & amounts

## How It Works

```
PDF File (Right-click)
    ↓
Quick Action extracts text
    ↓
Jan.ai parses invoice data
    ↓
Reminders created in Apple Reminders
```

## Features

✅ Works from Finder  
✅ Works from email attachments (Mail.app)  
✅ Supports multiple PDFs at once  
✅ Automatically detects payment dates  
✅ Extracts invoice amounts  
✅ Handles NET 30/60/90 terms  

## Troubleshooting

**Quick Action doesn't appear?**
- Restart Finder: Option+Right-click Finder icon → Relaunch
- Or log out and log back in

**"Cannot extract text" error?**
- PDF might be scanned/image-based
- Install pdftotext: `brew install poppler`

**Reminders not created?**
- Check Jan.ai is running
- Verify API settings in Raycast preferences
- Check model is loaded in Jan.ai

## Example PDF Processing

**Invoice text:**
```
INVOICE #185
Hemp Hunter

Payment Terms:
50% DOWN $60,470.15 DUE TODAY
50% NET 30 $60,470.15 DUE 12.26.25
```

**Result:**
- ✓ Reminder 1: "50% Down Payment - Invoice #185" due Dec 28, 2025 ($60,470.15)
- ✓ Reminder 2: "50% NET 30 Payment - Invoice #185" due Dec 26, 2025 ($60,470.15)
