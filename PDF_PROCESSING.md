# PDF Processing with Native Multimodal Support

This extension now supports sending PDFs directly to Jan.ai API with native multimodal support, allowing the AI to read PDF content without requiring OCR or text extraction.

## Features

### 1. Native PDF Processing
The extension can now send PDFs directly to Jan.ai using base64 encoding and the OpenAI-compatible multimodal API format. This provides several advantages:

- **No OCR Required**: The AI reads the PDF natively, preserving formatting and layout
- **Better Accuracy**: Native PDF reading is more reliable than OCR for text-based PDFs
- **Faster Processing**: Eliminates the OCR step for many documents
- **Better Layout Understanding**: The AI can understand tables, columns, and document structure

### 2. Available Commands

#### Process PDF with Jan.ai (Native)
**Command**: `process-pdf-native`

A comprehensive PDF processing command with multiple modes:

- **Extract Tasks & Create Reminders**: Automatically extract tasks, invoices, bills, and payment information from PDFs and create Apple Reminders
- **Summarize PDF**: Generate a comprehensive summary of the PDF content
- **Custom Prompt**: Ask any question or request any analysis of the PDF

**Usage**:
1. Select one or more PDF files
2. Choose an action (Extract Tasks, Summarize, or Custom)
3. Optionally provide a custom prompt
4. Results are either created as reminders or copied to clipboard

#### Create Reminder from PDF (Direct)
**Command**: `create-reminder-from-pdf-direct`

A streamlined command focused specifically on extracting payment and task information from PDFs:

- Processes invoices, bills, receipts, and documents
- Extracts dates, amounts, and payment terms
- Automatically creates reminders in Apple Reminders app
- Supports multiple PDFs at once

## API Functions

### New Functions in `janApi.ts`

#### `sendToJanAiWithPDF(pdfPath, userPrompt, systemPrompt?, model?)`
Sends a PDF directly to Jan.ai API with multimodal support.

**Parameters**:
- `pdfPath`: Path to the PDF file
- `userPrompt`: The user's question or request about the PDF
- `systemPrompt`: Optional system prompt for context
- `model`: Optional model override

**Returns**: String response from the AI

**Example**:
```typescript
const summary = await sendToJanAiWithPDF(
  "/path/to/invoice.pdf",
  "What is the total amount and due date?",
  "You are a financial document analyzer."
);
```

#### `extractTaskFromPDF(pdfPath)`
Extracts tasks, invoices, and payment information from a PDF using Jan.ai.

**Parameters**:
- `pdfPath`: Path to the PDF file

**Returns**: Array of `ParsedTask` objects with title, dueDate, amount, notes, etc.

**Example**:
```typescript
const tasks = await extractTaskFromPDF("/path/to/invoice.pdf");
// Returns: [{ title: "Payment Due", dueDate: "2026-01-15", amount: 1500.00 }]
```

### New Utility Functions in `pdfUtils.ts`

#### `pdfToBase64(pdfPath)`
Converts a PDF file to base64 encoding for API submission.

**Parameters**:
- `pdfPath`: Path to the PDF file

**Returns**: Base64-encoded string of the PDF

#### `getPDFSize(pdfPath)`
Gets the size of a PDF file in bytes.

**Parameters**:
- `pdfPath`: Path to the PDF file

**Returns**: File size in bytes

## Type Definitions

### Updated Message Types in `types.ts`

The message types now support multimodal content:

```typescript
export interface MessageContentText {
  type: "text";
  text: string;
}

export interface MessageContentImageUrl {
  type: "image_url";
  image_url: {
    url: string; // Can be a data URL with base64-encoded PDF
  };
}

export type MessageContent = string | Array<MessageContentText | MessageContentImageUrl>;

export interface Message {
  role: "system" | "user" | "assistant";
  content: MessageContent;
}
```

## API Format

When sending PDFs to Jan.ai, the extension uses this format:

```json
{
  "messages": [
    {
      "role": "system",
      "content": "System prompt here"
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Your question about the PDF"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:application/pdf;base64,JVBERi0xLjQK..."
          }
        }
      ]
    }
  ],
  "model": "model-name",
  "temperature": 0.7,
  "max_tokens": 2000
}
```

## Requirements

### Jan.ai Configuration
- Jan.ai must be running with API server enabled
- Your model must support multimodal inputs (image_url with PDF data URLs)
- Recommended models: Models with vision/multimodal capabilities

### Model Compatibility
Not all models support native PDF processing. If your model doesn't support multimodal inputs, you can:
1. Use the original OCR-based commands (e.g., `create-reminder-from-file`)
2. Switch to a model with multimodal support
3. Update Jan.ai to a version that supports multimodal APIs

## Comparison: Native PDF vs OCR

### Native PDF Processing (New)
- **Pros**:
  - Native document understanding
  - Preserves layout and formatting
  - Faster for text-based PDFs
  - No external dependencies
- **Cons**:
  - Requires multimodal-capable model
  - May have file size limits
  - Depends on Jan.ai API support

### OCR-based Processing (Original)
- **Pros**:
  - Works with image-based PDFs
  - Works with any text-only model
  - Proven reliability
- **Cons**:
  - Requires Tesseract installation
  - Slower processing
  - May lose formatting
  - Can have OCR errors

## Best Practices

1. **File Size**: Keep PDFs under 10MB for best performance. Large files are supported but may be slower.

2. **Model Selection**: Use models with multimodal capabilities for native PDF processing.

3. **Error Handling**: The functions include fallback mechanisms and detailed logging for troubleshooting.

4. **Sandboxed Files**: The utilities automatically handle Raycast's sandboxed file access by copying to temp locations.

## Example Use Cases

### Invoice Processing
```typescript
const tasks = await extractTaskFromPDF("/path/to/invoice.pdf");
// Automatically extracts: amounts, due dates, NET terms, invoice numbers
```

### Document Summarization
```typescript
const summary = await sendToJanAiWithPDF(
  "/path/to/report.pdf",
  "Provide a 3-bullet executive summary"
);
```

### Custom Analysis
```typescript
const analysis = await sendToJanAiWithPDF(
  "/path/to/contract.pdf",
  "List all payment terms and deadlines mentioned in this contract",
  "You are a legal document analyzer."
);
```

## Troubleshooting

### "Cannot connect to Jan.ai"
- Ensure Jan.ai is running
- Check that the API server is enabled in Jan.ai settings
- Verify the API URL in extension preferences (default: `http://localhost:1337/v1/chat/completions`)

### "No response from Jan.ai"
- Check that your model supports multimodal inputs
- Try with a smaller PDF file
- Check Jan.ai logs for errors

### "Failed to convert PDF to base64"
- Verify the PDF file is not corrupted
- Check file permissions
- Try copying the file to a non-sandboxed location

## Future Enhancements

Potential improvements for future versions:
- Support for multiple PDFs in a single API call
- Page range selection
- PDF preprocessing options
- Batch processing with progress indicators
- Caching for frequently accessed PDFs
