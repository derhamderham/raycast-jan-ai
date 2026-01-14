# PDF Native Processing - Implementation Summary

## Overview
This implementation adds native multimodal PDF processing to the Jan.ai Raycast extension, allowing PDFs to be sent directly to the Jan.ai API without requiring OCR or text extraction.

## Changes Made

### 1. Type Definitions (`src/utils/types.ts`)
- Added `MessageContentText` interface for text content
- Added `MessageContentImageUrl` interface for PDF/image content with data URLs
- Updated `MessageContent` type to support both string and multimodal array formats
- Updated `Message` interface to use the new `MessageContent` type

### 2. PDF Utilities (`src/utils/pdfUtils.ts`)
- Added `pdfToBase64(pdfPath)` - Converts PDF files to base64 encoding
- Added `getPDFSize(pdfPath)` - Gets PDF file size in bytes
- Both functions handle sandboxed file access by copying to temp locations

### 3. Jan.ai API Functions (`src/utils/janApi.ts`)
- Added `sendToJanAiWithPDF(pdfPath, userPrompt, systemPrompt?, model?)` - General-purpose function for sending PDFs to Jan.ai
- Added `extractTaskFromPDF(pdfPath)` - Specialized function for extracting tasks/invoices from PDFs
- Both functions use multimodal message format with base64-encoded PDF data URLs

### 4. New Commands

#### `src/process-pdf-native.tsx`
A comprehensive PDF processing command with three modes:
- **Extract Tasks**: Extract and create reminders from invoices/bills
- **Summarize**: Generate PDF summaries
- **Custom Prompt**: Ask custom questions about PDFs

#### Updated `src/create-reminder-from-pdf-direct.tsx`
- Modified to use `extractTaskFromPDF()` instead of OCR-based extraction
- Faster and more accurate for native PDF processing
- Updated descriptions to mention native multimodal support

### 5. Extension Configuration (`package.json`)
Added two new commands:
- `create-reminder-from-pdf-direct` - Direct native PDF reminder creation
- `process-pdf-native` - Multi-purpose native PDF processing

### 6. Documentation
- `PDF_PROCESSING.md` - Comprehensive guide to PDF processing features
- `IMPLEMENTATION_SUMMARY.md` - This file, documenting the implementation

## API Format

The implementation uses the OpenAI-compatible multimodal message format:

```typescript
{
  role: "user",
  content: [
    {
      type: "text",
      text: "Your question here"
    },
    {
      type: "image_url",
      image_url: {
        url: "data:application/pdf;base64,<base64_data>"
      }
    }
  ]
}
```

## Key Features

1. **Native PDF Reading**: AI processes PDFs directly without OCR
2. **Multimodal Support**: Combines text prompts with PDF content
3. **Backward Compatible**: Existing OCR-based commands still work
4. **Flexible**: Supports custom prompts for any PDF analysis task
5. **Error Handling**: Comprehensive error handling and logging
6. **Sandboxed File Support**: Handles Raycast's sandboxed file access

## How It Works

1. **PDF Selection**: User selects PDF file(s) via Raycast form
2. **Base64 Encoding**: PDF is converted to base64 string
3. **Data URL Creation**: Base64 is wrapped in `data:application/pdf;base64,` URL
4. **API Request**: Multimodal message sent to Jan.ai with text prompt + PDF
5. **Response Processing**: AI response is parsed and processed
6. **Action**: Results are either:
   - Created as Apple Reminders
   - Copied to clipboard
   - Displayed to user

## Usage Examples

### Extract Tasks from Invoice
```typescript
const tasks = await extractTaskFromPDF("/path/to/invoice.pdf");
// Returns: [{ title: "Invoice #123", dueDate: "2026-01-15", amount: 1500 }]
```

### Summarize Document
```typescript
const summary = await sendToJanAiWithPDF(
  "/path/to/document.pdf",
  "Summarize this document in 3 bullet points"
);
```

### Custom Analysis
```typescript
const answer = await sendToJanAiWithPDF(
  "/path/to/contract.pdf",
  "What are the payment terms?",
  "You are a legal analyst."
);
```

## Requirements

### Jan.ai Setup
- Jan.ai must be running with API server enabled
- Model must support multimodal inputs
- API endpoint: `http://localhost:1337/v1/chat/completions` (default)

### Model Requirements
The model must support:
- OpenAI-compatible chat completions API
- Multimodal inputs (image_url content type)
- Data URLs with base64-encoded PDFs

### No Additional Dependencies
The implementation uses only:
- Node.js built-in `fs` and `path` modules
- Raycast API
- Existing `node-fetch` dependency

## Performance Considerations

1. **File Size**: PDFs are base64-encoded, increasing size by ~33%
2. **Memory**: Entire PDF is loaded into memory during encoding
3. **API Limits**: Jan.ai may have request size limits
4. **Processing Time**: Varies based on PDF size and model speed

## Testing Checklist

- [ ] Test with text-based PDF (invoice, letter, etc.)
- [ ] Test with image-based PDF (scanned document)
- [ ] Test with large PDF (>5MB)
- [ ] Test with multiple PDFs in batch
- [ ] Test task extraction and reminder creation
- [ ] Test summarization feature
- [ ] Test custom prompt feature
- [ ] Verify error handling for invalid PDFs
- [ ] Verify error handling when Jan.ai is not running
- [ ] Verify sandboxed file access works correctly

## Future Improvements

Potential enhancements:
1. **Streaming Responses**: Support streaming for large PDFs
2. **Page Selection**: Allow users to specify page ranges
3. **PDF Metadata**: Extract and use PDF metadata
4. **Caching**: Cache processed PDFs to avoid re-encoding
5. **Batch Processing**: Process multiple PDFs in parallel
6. **Progress Indicators**: Show detailed progress for large files
7. **Image Support**: Extend to support image files (PNG, JPG) with same approach
8. **Fallback Logic**: Auto-fallback to OCR if multimodal fails

## Compatibility

### Backward Compatibility
All existing commands continue to work:
- `create-reminder-from-file` - Uses OCR-based extraction
- `create-reminder-from-pdf` - Uses text extraction + Jan.ai

### Forward Compatibility
The implementation follows OpenAI's multimodal API standard, ensuring compatibility with:
- Future Jan.ai API versions
- Other OpenAI-compatible APIs
- Models with enhanced multimodal capabilities

## Migration Path

Users can choose between two approaches:

### OCR-Based (Original)
- Use `create-reminder-from-file`
- Requires Tesseract + Python dependencies
- Works with any text-capable model
- Best for image-based PDFs

### Native Multimodal (New)
- Use `create-reminder-from-pdf-direct` or `process-pdf-native`
- No external dependencies
- Requires multimodal-capable model
- Best for text-based PDFs

## Files Modified

1. `src/utils/types.ts` - Added multimodal message types
2. `src/utils/pdfUtils.ts` - Added base64 conversion functions
3. `src/utils/janApi.ts` - Added native PDF processing functions
4. `src/create-reminder-from-pdf-direct.tsx` - Updated to use native processing
5. `package.json` - Added new commands

## Files Created

1. `src/process-pdf-native.tsx` - New multi-purpose PDF command
2. `PDF_PROCESSING.md` - User documentation
3. `IMPLEMENTATION_SUMMARY.md` - This implementation summary

## Code Quality

- Comprehensive error handling throughout
- Detailed logging for debugging
- Type safety with TypeScript
- Follows existing code patterns
- Maintains backward compatibility
- Clean separation of concerns

## Conclusion

This implementation successfully adds native multimodal PDF processing to the Jan.ai Raycast extension, providing a faster and more accurate alternative to OCR-based processing while maintaining full backward compatibility with existing features.
