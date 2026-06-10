# Harfist Android APK Build

This repository now includes a Capacitor Android packaging setup. The existing web game files remain unchanged.

## What was added

- `package.json` — npm and Capacitor dependencies/scripts
- `capacitor.config.json` — Android app configuration
- `scripts/build-www.js` — copies web files into `www/` for Capacitor
- `.github/workflows/android-debug-apk.yml` — GitHub Actions debug APK build
- `.gitignore` — excludes generated build folders

## Current app package

- App name: `Harfist`
- Android package ID: `com.gibiamie.harfist`
- Capacitor web directory: `www`

## Local build commands

```bash
npm install
npm run build:web
npx cap add android
npx cap sync android
npx cap open android
```

In Android Studio, run the app on a physical device or emulator.

## GitHub Actions APK build

1. Open the repository on GitHub.
2. Go to **Actions**.
3. Select **Build Android Debug APK**.
4. Click **Run workflow**.
5. After it finishes, download the `harfist-debug-apk` artifact.

## Important QA rule

Do not publish the APK until the GitHub Pages web version passes functional QA for:

- Harfist Classic
- Kelime Ağı
- Turkish character keyboard
- dictionary validation
- mobile layout
- no invalid words being accepted

## Release note

The generated debug APK is for device testing only. For Google Play, build and sign an Android App Bundle (`.aab`) after final QA.
