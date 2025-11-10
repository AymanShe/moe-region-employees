#!/bin/bash

echo "===================================="
echo "Starting Local Development Server"
echo "===================================="
echo

# Try Python 3 first
if command -v python3 &> /dev/null; then
    echo "Found Python 3! Starting server on http://localhost:8000"
    echo
    echo "Open your browser and visit:"
    echo "http://localhost:8000"
    echo
    echo "Press Ctrl+C to stop the server"
    echo
    python3 -m http.server 8000
    exit 0
fi

# Try Python
if command -v python &> /dev/null; then
    echo "Found Python! Starting server on http://localhost:8000"
    echo
    echo "Open your browser and visit:"
    echo "http://localhost:8000"
    echo
    echo "Press Ctrl+C to stop the server"
    echo
    python -m http.server 8000
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "Found PHP! Starting server on http://localhost:8000"
    echo
    echo "Open your browser and visit:"
    echo "http://localhost:8000"
    echo
    echo "Press Ctrl+C to stop the server"
    echo
    php -S localhost:8000
    exit 0
fi

# If nothing found
echo "ERROR: No suitable server found!"
echo
echo "Please install one of the following:"
echo "  - Python: https://www.python.org/downloads/"
echo "  - PHP: https://www.php.net/downloads"
echo "  - Node.js: https://nodejs.org/"
echo
echo "Or use VS Code with Live Server extension"
exit 1
