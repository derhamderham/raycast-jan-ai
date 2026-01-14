# Usage Examples

## Process with Jan.ai

### Summarize
**Input:**
```
The quarterly earnings report shows significant growth in Q3 2024. Revenue increased by 23% year-over-year, reaching $4.2 million. The growth was primarily driven by our new enterprise offerings and expansion into the European market. Customer retention rates improved to 94%, and we onboarded 47 new enterprise clients. Operating expenses remained stable at $2.1 million despite the expansion efforts.
```

**Action:** Summarize

**Output:**
```
Q3 2024 earnings showed 23% revenue growth to $4.2M, driven by enterprise products and European expansion. Customer retention hit 94% with 47 new enterprise clients, while operating costs stayed at $2.1M.
```

### Improve Writing
**Input:**
```
The thing is that we really need to like get this done soon because its getting kind of urgent and stuff and people are waiting on us.
```

**Action:** Improve Writing

**Output:**
```
We need to complete this task soon as it has become urgent and stakeholders are awaiting our completion.
```

## Quick Actions

### Fix Grammar
**Input:**
```
Their going to the store to buy they're groceries there.
```

**Output:**
```
They're going to the store to buy their groceries there.
```

### Make Professional
**Input:**
```
hey thanks for the email. yeah i can def do that meeting on tuesday. let me know what time works!
```

**Output:**
```
Thank you for your email. I would be happy to attend the meeting on Tuesday. Please let me know what time works best for you.
```

### Convert to Bullet Points
**Input:**
```
We need to prepare for the client presentation next week. First we should review the latest data and update all the charts. Then we need to practice our delivery and make sure everyone knows their parts. Finally we should print handouts and set up the conference room.
```

**Output:**
```
• Review latest data and update charts
• Practice delivery and assign presentation roles
• Print handouts
• Set up conference room
```

## Create Reminder Examples

### Simple Tasks
```
Input: "Call mom tomorrow"
Result:
- Title: "Call mom"
- Due: (tomorrow's date)
```

```
Input: "Finish project proposal by Friday"
Result:
- Title: "Finish project proposal"
- Due: (next Friday)
```

### Bills with Amounts
```
Input: "Electric bill $150.75 due January 15"
Result:
- Title: "Electric bill"
- Notes: "Amount: $150.75\n\n[BILL]"
- Due: 2025-01-15
```

```
Input: "Water bill 89 dollars due next Monday"
Result:
- Title: "Water bill"
- Notes: "Amount: $89.00\n\n[BILL]"
- Due: (next Monday's date)
```

### Invoices
```
Input: "Client ABC invoice $5000 due end of month"
Result:
- Title: "Client ABC invoice"
- Notes: "Amount: $5000.00\n\n[INVOICE]"
- Due: (last day of current month)
```

### Recurring Tasks
```
Input: "Weekly team standup every Monday at 9am"
Result:
- Title: "Weekly team standup"
- Notes: "Recurs: weekly"
- Repeat: weekly
```

```
Input: "Monthly rent $2000 due on the 1st"
Result:
- Title: "Monthly rent"
- Notes: "Amount: $2000.00\nRecurs: monthly"
- Due: (1st of next month)
- Repeat: monthly
```

### Complex Examples
```
Input: "Quarterly insurance payment $450 due March 1st recurring"
Result:
- Title: "Quarterly insurance payment"
- Notes: "Amount: $450.00\nRecurs: monthly"
- Due: 2025-03-01
- Repeat: monthly
```

```
Input: "Submit monthly expense report with receipts by the 5th every month"
Result:
- Title: "Submit monthly expense report with receipts"
- Notes: "Recurs: monthly"
- Due: (5th of next month)
- Repeat: monthly
```

## Edge Cases

### Ambiguous Dates
```
Input: "Review budget next week"
Model interprets: First business day of next week
```

### No Specific Date
```
Input: "Buy new running shoes"
Result: Reminder created without due date
```

### Multiple Actions
```
Input: "Pay rent and utilities $2200 total by Friday"
Result: Single reminder with combined amount
```

### With Context
```
Input: "Dentist appointment tomorrow at 2pm - remember to bring insurance card"
Result:
- Title: "Dentist appointment"
- Notes: "remember to bring insurance card"
- Due: (tomorrow at 2pm)
```

## Testing Checklist

- [ ] Simple text summarization
- [ ] Grammar correction
- [ ] Professional tone conversion
- [ ] Basic reminder creation
- [ ] Bill with dollar amount
- [ ] Invoice tracking
- [ ] Recurring monthly task
- [ ] Relative date ("tomorrow", "next week")
- [ ] Absolute date ("Jan 15", "2025-01-15")
- [ ] Task without date
- [ ] Complex multi-part instruction
