@echo off
:: 设置网络代理
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890

echo ============================================================
echo LobClaw Project Upload Script (Super Trust Mode)
echo ============================================================
echo.
cd /d %~dp0

:: 解决 dubious ownership 问题
echo Trusting directory...
git config --global --add safe.directory %cd:\=/%

:: 清理旧的 Remote
git remote remove origin >nul 2>&1

:: 设置新的 Remote
echo Connecting to https://github.com/supercrypto1984/lobclaw.git ...
git remote add origin https://github.com/supercrypto1984/lobclaw.git

:: 确保在 main 分支
git branch -M main

:: 提交所有更改
echo Committing changes...
git add .
git commit -m "feat: Full integration of LobClaw (BSC/EVM) with New API Backend"

:: 推送
echo.
echo Pushing to GitHub (Force)...
echo PLEASE LOG IN IF PROMPTED.
echo.
git push -u origin main -f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo SUCCESS! Your project is now live at:
    echo https://github.com/supercrypto1984/lobclaw
    echo ============================================================
) else (
    echo.
    echo ERROR: Push failed. Please check your network or Git credentials.
)

pause
