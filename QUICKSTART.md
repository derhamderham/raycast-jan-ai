# Quick Start Guide

## Setup (5 minutes)

### 1. Install
```bash
cd jan-ai-assistant
npm install
npm run dev
```

### 2. Configure in Raycast
Open Raycast → Extensions → Jan AI Assistant

**Required settings:**
- API Key: Your Jan.ai API key
- Default Model: e.g., `llama-3.1-8b-instruct`

**Optional settings:**
- API URL: Default is `http://localhost:1337/v1/chat/completions`
- Temperature: 0.7 (creativity level)
- Max Tokens: 2000 (response length)
- Reminder List: "To Do" (or your preferred list name)

### 3. Test Each Command

#### Process with Jan.ai
1. Copy any text
2. Run "Process with Jan.ai"
3. Choose "Summarize" action
4. View result

#### Quick Actions
1. Copy text: "This is a test sentence with some gramattical errors."
2. Run "Jan.ai Quick Actions"
3. Select "Fix Grammar"
4. Corrected text copied to clipboard

#### Create Reminder
1. Run "Create Reminder from Text"
2. Enter: "Call dentist tomorrow at 2pm"
3. Check Apple Reminders for new task

## Common Use Cases

### Text Processing
```
Copy: "The meeting was really long and we talked about many different topics including the quarterly results and the new product launch..."

Action: Summarize
Result: Brief summary of meeting topics
```

### Quick Actions
```
Copy: "hey can u send me that file? thx"

Action: Make Professional
Result: "Could you please send me that file? Thank you."
```

### Simple Reminder
```
Input: "Buy milk tomorrow"
Creates: Reminder "Buy milk" with due date = tomorrow
```

### Bill Tracking
```
Input: "Electric bill $150 due January 15"
Creates: 
- Title: "Electric bill"
- Notes: "Amount: $150.00\n\n[BILL]"
- Due: 2025-01-15
```

### Recurring Invoice
```
Input: "Monthly rent invoice $2000 due on the 1st"
Creates:
- Title: "Monthly rent invoice"
- Notes: "Amount: $2000.00\n\n[INVOICE]\nRecurs: monthly"
- Recurring: monthly
```

## Troubleshooting

### Extension won't load
```bash
# Verify Jan.ai is running
curl http://localhost:1337/v1/models -H "Authorization: Bearer YOUR_KEY"
```

### Wrong model name
1. Open Jan.ai → Models
2. Copy exact model ID
3. Paste in Raycast preferences

### Reminder list not found
1. Open Apple Reminders
2. Create list called "To Do"
3. Or change preference to existing list name

## Get Model Name

```bash
curl http://localhost:1337/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY" | grep '"id"'
```

Use the exact `id` value in Raycast preferences.

## Next Steps

1. Customize quick actions in `src/quick-actions.tsx`
2. Add custom prompts for your workflow
3. Adjust temperature for creativity vs consistency
4. Create keyboard shortcuts in Raycast for frequent actions

## Support

- Check Jan.ai logs for API errors
- Verify API key and model name are correct
- Ensure Apple Reminders has necessary permissions
- Check console logs in Raycast for debugging
