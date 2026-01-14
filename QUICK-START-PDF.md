# 🚀 Quick Start - PDF Invoice to Reminders

## 3-Minute Setup

### 1️⃣ Open Automator
```
Spotlight → Automator → New Document → Quick Action
```

### 2️⃣ Configure
- **Workflow receives**: `PDF files`
- **in**: `Finder`

### 3️⃣ Add Action
- Search: `Run Shell Script`
- Drag to workflow area
- **Pass input**: `as arguments`

### 4️⃣ Paste Script
Copy from `quick-action-script.sh` or use this:

```bash
#!/bin/bash
FILES=""
for file in "$@"; do
    [ -n "$FILES" ] && FILES="$FILES,$file" || FILES="$file"
done
ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$FILES'''))")
open "raycast://extensions/YOUR-NAME/jan-ai-assistant/create-reminder-from-pdf?arguments=%7B%22files%22%3A%22${ENCODED}%22%7D"
```

**⚠️ IMPORTANT**: Replace `YOUR-NAME` with your actual author name!

### 5️⃣ Save
- Name: `Create Reminder from PDF Invoice`
- Close Automator

### 6️⃣ Test
- Right-click any PDF
- Quick Actions → Create Reminder from PDF Invoice
- ✨ Magic happens!

---

## How To Find Your Author Name

Check `package.json`:
```json
{
  "author": "your-name",  // ← This is what you need
  ...
}
```

---

## Common Issues

**Quick Action doesn't show?**
→ Restart Finder or logout/login

**"Cannot extract text"?**
→ PDF might be scanned. Install: `brew install poppler`

**Raycast doesn't open?**
→ Double-check author name in script

---

## What Gets Created

**From this invoice:**
```
Payment Terms:
50% DOWN $60,470.15 DUE TODAY
50% NET 30 $60,470.15 DUE 12.26.25
```

**You get these reminders:**
- ✅ "50% Down Payment" due Dec 28, 2025 ($60,470.15)
- ✅ "50% NET 30 Payment" due Dec 26, 2025 ($60,470.15)

---

## Pro Tips

💡 Select multiple PDFs → Right-click → Process all at once
💡 Works from Mail.app on PDF attachments
💡 Dates are automatically parsed (no manual entry!)
💡 Amounts are extracted and added to notes

---

**Need help?** See `PDF-QUICK-ACTION-SETUP.md` for detailed instructions.
