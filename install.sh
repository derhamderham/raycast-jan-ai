#!/bin/bash

echo "Jan AI Assistant - Installation Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Please run this script from the extension directory."
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo ""
echo "✓ Dependencies installed successfully"
echo ""

# Check if Jan.ai is running
echo "Checking Jan.ai connection..."
if curl -s -f http://localhost:1337/v1/models > /dev/null 2>&1; then
    echo "✓ Jan.ai is running"
else
    echo "⚠ Warning: Cannot connect to Jan.ai at http://localhost:1337"
    echo "  Make sure Jan.ai is running and API server is enabled"
fi

echo ""
echo "======================================"
echo "Installation complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start development mode"
echo "2. Configure in Raycast:"
echo "   - Set your Jan.ai API key"
echo "   - Set your model name (e.g., llama-3.1-8b-instruct)"
echo "3. Try the commands:"
echo "   - Process with Jan.ai"
echo "   - Jan.ai Quick Actions"
echo "   - Create Reminder from Text"
echo ""
echo "See QUICKSTART.md for detailed usage."
