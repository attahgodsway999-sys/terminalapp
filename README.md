# GSE Terminal — Android App

Native Android app for the Ghana Stock Exchange tracker.
Built with Kotlin + WebView + Firebase.

## Quick Start (5 steps)

### Step 1 — Create GitHub Repository
1. Go to github.com → New repository
2. Name it: `gse-terminal-android`
3. Set to **Public** or Private
4. Click **Create repository**
5. Upload all files from this folder (drag and drop the whole folder)

### Step 2 — Set up Firebase (free)
1. Go to console.firebase.google.com
2. Click **Add project** → name it "GSE Terminal"
3. Add Android app → package name: `com.gseterminal.app`
4. Download `google-services.json`
5. Replace the placeholder `app/google-services.json` with the real file
6. In Firebase Console enable:
   - Authentication → Google + Email/Password
   - Firestore Database → Start in test mode
   - Storage → Start in test mode
   - Cloud Messaging (already enabled by default)

### Step 3 — Generate a Signing Keystore
Run this command on your laptop (requires Java installed):
```
keytool -genkey -v \
  -keystore gse-release.jks \
  -alias gse-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=GSE Terminal, OU=Mobile, O=GSETerminal, L=Accra, S=GA, C=GH"
```
Save the passwords — you will need them.

Then convert keystore to base64:
```
base64 -i gse-release.jks | tr -d '\n'
```
Copy the output.

### Step 4 — Add GitHub Secrets
In your GitHub repo → Settings → Secrets and variables → Actions → New secret:

| Secret Name | Value |
|---|---|
| `KEYSTORE_BASE64` | The base64 string from Step 3 |
| `KEYSTORE_PASSWORD` | Your store password |
| `KEY_ALIAS` | `gse-key` |
| `KEY_PASSWORD` | Your key password |
| `GOOGLE_SERVICES_JSON` | Full contents of google-services.json |

### Step 5 — Trigger the Build
Push any commit to the `main` branch. GitHub Actions builds automatically.
- Go to your repo → **Actions** tab
- Wait ~5 minutes for the build
- Click the completed workflow → **Artifacts** → Download the APK

## Project Structure
```
gse-android/
├── app/
│   ├── src/main/
│   │   ├── java/com/gseterminal/app/
│   │   │   ├── GseApplication.kt        # App init, notification channels
│   │   │   ├── ui/
│   │   │   │   ├── splash/SplashActivity.kt  # Splash → route to Auth or Main
│   │   │   │   ├── auth/AuthActivity.kt      # Google Sign-In + OTP email
│   │   │   │   ├── main/MainActivity.kt      # WebView + drawer navigation
│   │   │   │   ├── main/GseBridge.kt         # JS ↔ Android bridge
│   │   │   │   └── profile/ProfileActivity.kt # Photo upload + edit profile
│   │   │   └── service/GseFcmService.kt      # Push notifications
│   │   ├── res/
│   │   │   ├── layout/                   # All XML layouts
│   │   │   ├── values/                   # Colors, strings, themes
│   │   │   └── xml/                      # Security config, file paths
│   │   └── AndroidManifest.xml
│   ├── build.gradle
│   └── proguard-rules.pro
├── .github/workflows/build.yml           # GitHub Actions — auto builds APK
├── build.gradle
├── settings.gradle
└── gradle.properties
```

## Features Built
- WebView loading gseterminal.netlify.app
- Google Sign-In (one tap)
- Email + 6-digit OTP authentication
- User profiles with photo upload (UCrop for circular crop)
- Firebase Firestore for user data
- Firebase Storage for profile photos
- Firebase Cloud Messaging push notifications
- Price alert notifications (from web to native)
- Slide-out navigation drawer
- Secure encrypted local storage
- ProGuard release build optimization

## Security
- All traffic HTTPS only (network security config)
- Sensitive data in EncryptedSharedPreferences (AES256)
- Keystore never committed to repo (injected via GitHub Secrets)
- google-services.json never committed (injected via GitHub Secrets)
- Firebase Security Rules protect all user data

## Common Issues

**Build fails: "google-services.json not found"**
→ Add `GOOGLE_SERVICES_JSON` to GitHub Secrets (Step 4)

**Build fails: "keystore not found"**
→ Add `KEYSTORE_BASE64` to GitHub Secrets (Step 4)

**Google Sign-In fails on device**
→ Add your APK's SHA-1 fingerprint in Firebase Console → Project Settings → Your Android app

**APK installs but shows blank WebView**
→ Check internet permission is in Manifest (it is) and device has internet connection
