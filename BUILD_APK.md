# GSE Terminal — Build APK Guide

## What you need (free, one-time setup)
1. **Node.js** — https://nodejs.org (download LTS)
2. **Expo account** — https://expo.dev (free signup)
3. **EAS CLI** — run: `npm install -g eas-cli`

## Steps to get your APK

### 1. Install dependencies
```bash
cd gse-terminal
npm install
```

### 2. Login to Expo
```bash
eas login
```
Enter your Expo email and password.

### 3. Configure project (first time only)
```bash
eas build:configure
```
When asked, choose **Android**.

### 4. Build the APK
```bash
eas build -p android --profile preview
```
This uploads your code to Expo's cloud servers and builds the APK.
Build takes **5–15 minutes**. You'll get a **download link** when done.

### 5. Download & install
- Open the link on your phone or computer
- Download the `.apk` file
- On your Android phone: Settings → Install unknown apps → allow
- Install and open **GSE Terminal**

## Share with friends
Once you have the `.apk` file, share it via:
- WhatsApp
- Google Drive / Dropbox link
- Email attachment
- USB transfer

Friends just need to enable "Install unknown apps" on their Android phones.

## Features in this build
- Live GSE data — all 39 equities from kwayisi.org
- Market Board with sortable table
- Ticker Profile with stats + chat
- IPO Tracker
- Dividends Registry  
- Shareholders Matrix (MTNGH & GCB)
- Market News feed
- GHS ↔ USD currency toggle (updates ticker tape + all prices)
- Pull-to-refresh

## Troubleshooting
- **Build fails**: Make sure you're logged in with `eas login`
- **"Package name taken"**: Edit `app.json` and change `com.gse.terminal` to something unique like `com.yourname.gseterminal`
- **APK won't install on phone**: Enable "Install from unknown sources" in Android settings
