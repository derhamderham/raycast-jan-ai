# 📊 Quick Start - Reminders to CSV

## What You Get

**Input (Reminders):**
```
Electric bill $150 due Jan 15
Client invoice $5000 received Jan 10
Rent $2000 due Jan 20
```

**Output (CSV):**
```
EXPENSES:
Date,Subject,Amount
2025-01-15,Electric bill,-150.00
2025-01-20,Rent,-2000.00

INCOME:
Date,Subject,Amount
2025-01-10,Client invoice,5000.00
```

---

## Two Ways to Use

### 🚀 Method 1: Standalone (Best)
```
Raycast → "Convert Reminders to CSV"
→ Paste reminders
→ Press Enter
→ CSV copied to clipboard!
```

### ⚡ Method 2: Quick Action (Fast)
```
Copy reminders to clipboard
→ Raycast → "Jan.ai Quick Actions"  
→ "Reminders to CSV Table"
→ Done!
```

---

## Classification Rules

### Bills/Expenses → Negative (-)
Keywords: bill, payment, due, cost, rent, expense
```
"Electric bill $150" → -150.00
"Rent payment $2000" → -2000.00
```

### Income → Positive (+)
Keywords: invoice, received, earned, completed
```
"Client invoice $5000" → 5000.00
"Freelance work $1200" → 1200.00
```

---

## Import to Spreadsheet

**Excel/Google Sheets:**
1. Copy CSV from Raycast
2. Paste into spreadsheet (⌘V)
3. Data auto-separates into columns
4. Done! 

**Quick Analysis:**
- Sum amounts: `=SUM(C:C)`
- Filter by date
- Create pivot tables
- Generate charts

---

## Pro Tips

✅ Use keywords ("bill", "invoice") for clarity
✅ Include $ symbol for amounts  
✅ Specific dates ("Jan 15") work best
✅ One reminder per line
✅ Test with small list first

---

## Common Patterns

### Monthly Bills
```
Netflix $15.99 monthly
Gym $50 monthly
Phone $80 monthly
→ All expenses, current month dates
```

### Income & Expenses Mixed
```
Client A $3000 received yesterday
Office rent $1200 due today  
Freelance $1500 completed
→ Automatically separated
```

### No Amounts
```
Call dentist
Email client
Meeting on Friday
→ All get 0.00 amount
```

---

**Full Guide:** See `REMINDERS-TO-CSV-GUIDE.md`
