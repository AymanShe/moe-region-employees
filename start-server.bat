@echo off
echo ====================================
echo Starting Local Development Server
echo ====================================
echo.

REM Try Python 3 first
where python >nul 2>&1
if %errorlevel% == 0 (
    echo Found Python! Starting server on http://localhost:8008
    echo.
    echo Open your browser and visit:
    echo http://localhost:8008
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8008
    goto :end
)

REM Try PHP
where php >nul 2>&1
if %errorlevel% == 0 (
    echo Found PHP! Starting server on http://localhost:8000
    echo.
    echo Open your browser and visit:
    echo http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

REM If nothing found
echo ERROR: No suitable server found!
echo.
echo Please install one of the following:
echo   - Python: https://www.python.org/downloads/
echo   - PHP: https://www.php.net/downloads
echo   - Node.js: https://nodejs.org/
echo.
echo Or use VS Code with Live Server extension
pause

:end
