#!/bin/bash

# Raycast PDF Invoice Quick Action Script
# This script is called by the Automator Quick Action
# It receives PDF file paths and passes them to Raycast

# Collect all file paths from arguments
FILES=""
for file in "$@"; do
    if [ -n "$FILES" ]; then
        FILES="$FILES,$file"
    else
        FILES="$file"
    fi
done

# Debug logging (optional - remove in production)
# echo "Processing files: $FILES" >> ~/raycast-pdf-debug.log

# URL encode the file paths for Raycast deep link
# Using Python3 (built-in on macOS)
ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$FILES'''))")

# IMPORTANT: Replace 'your-name' with your actual author name from package.json
AUTHOR="your-name"
EXTENSION="jan-ai-assistant"
COMMAND="create-reminder-from-pdf"

# Build Raycast deep link URL
# Format: raycast://extensions/{author}/{extension}/{command}?arguments={json}
RAYCAST_URL="raycast://extensions/${AUTHOR}/${EXTENSION}/${COMMAND}?arguments=%7B%22files%22%3A%22${ENCODED}%22%7D"

# Open Raycast with the PDF file paths
open "$RAYCAST_URL"

# Exit successfully
exit 0
