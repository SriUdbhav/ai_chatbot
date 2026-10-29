# StudyMate AI — Official Android Application Project

This directory contains the standalone, complete, and production-ready **Android Studio project** for **StudyMate AI**. It wraps the deployed web application at `https://ai-chatbot-2-084d.onrender.com/` inside a high-performance Android WebView application.

---

## 📱 Application Overview

- **Application Name**: StudyMate AI
- **Package / Namespace**: `com.studymate.ai`
- **Target URL**: `https://ai-chatbot-2-084d.onrender.com/`
- **Language**: Kotlin
- **Minimum Android Version**: Android 7.0 (API Level 24) — compatible with >97% of active Android devices worldwide
- **Target Android Version**: Android 14 (API Level 34)

---

## 🚀 Key Built-In Features

1. **Native Document Uploads**:
   - Implements `WebChromeClient.onShowFileChooser` connected to an `ActivityResultLauncher`.
   - Supports selecting **PDF (`.pdf`)**, **Word (`.docx`)**, and **Plain Text (`.txt`)** documents directly from the Android storage provider.
   - Works seamlessly with the StudyMate AI Document Studio and notes summarizer.

2. **Strict HTTPS & SSL Security**:
   - Enforces `network_security_config.xml` with cleartext traffic prohibited.
   - SSL certificates are strictly validated; invalid or self-signed certificates are rejected without bypass to protect user sessions and prevent man-in-the-middle attacks.

3. **Persistent Local Storage**:
   - `domStorageEnabled = true` and `databaseEnabled = true` ensure chat history, study preferences, and notepad entries are safely persisted across app restarts in Android's sandboxed storage.

4. **Intuitive Android Navigation**:
   - Back button navigates through internal WebView history (`canGoBack()`).
   - Double-tap back button prompt prevents accidental exits.
   - External links (e.g. `mailto:`, `tel:`) open in native system applications.

5. **Pull-to-Refresh & Loading Feedback**:
   - Integrated `SwipeRefreshLayout` allows swiping down to refresh the study assistant.
   - Top progress bar gives instant visual feedback while pages load.

6. **Offline Detection & Retry**:
   - If internet connection drops, the app presents a clean offline view with a **Retry Connection** button rather than an ugly browser error code.

---

## 🛠️ How to Generate the APK Using Android Studio

You already have the Android Studio installer downloaded on your computer in your Downloads folder:
`C:\Users\Sidhartha\Downloads\android-studio-rabbit1-windows.exe`

### Step 1: Install or Open Android Studio
1. If not yet installed, double-click `C:\Users\Sidhartha\Downloads\android-studio-rabbit1-windows.exe` and follow the standard installation wizard (it installs the Android SDK and standard tools automatically).
2. Open **Android Studio**.

### Step 2: Open the Project
1. On the Android Studio Welcome screen, click **Open** (or go to **File > Open**).
2. Browse to this directory:
   `c:\Users\Sidhartha\OneDrive\Desktop\Capstone Project\android-app`
3. Click **OK**.
4. Android Studio will automatically sync Gradle and download dependencies.

### Step 3: Build the APK
1. In the top menu bar, click:
   **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Android Studio will compile the Kotlin code, package the assets, and generate the APK.
3. Once completed, a pop-up in the bottom-right corner will appear:
   `APK(s) generated successfully for 1 module`
4. Click **locate** in that pop-up.
   The generated file is located at:
   `android-app/app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 How to Install the APK on an Android Phone

You have several convenient ways to install the APK:

### Option A: Using LocalSend (Already Installed on your PC!)
1. Open **LocalSend** on your PC (`C:\Users\Sidhartha\AppData\Local\Programs\LocalSend\LocalSend.exe`).
2. Open **LocalSend** on your Android phone (connected to the same Wi-Fi).
3. Select `app-debug.apk` and send it to your phone.
4. On your phone, tap the received APK file to install it.

### Option B: Direct USB Transfer
1. Connect your Android phone to your PC via a USB cable.
2. Select **File Transfer / MTP** mode on your phone.
3. Copy `app-debug.apk` to your phone's **Downloads** folder.
4. Open the **Files** app on your phone, navigate to Downloads, tap `app-debug.apk`, and tap **Install**.
   *(If prompted, toggle "Allow from this source" in settings).*

### Option C: Google Drive / Cloud Storage
1. Upload `app-debug.apk` to your Google Drive.
2. On your phone, open the Google Drive app, tap the file, and select **Install Package**.

---

## 🔒 Privacy & Architecture Notes

- **Zero Website Modifications**: The website codebase and Render deployment remain 100% untouched.
- **Server-Side Security**: All Gemini API keys, environment variables, and AI logic remain safely stored on Render. No keys or sensitive credentials are embedded in the APK.
