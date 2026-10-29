# StudyMate AI Proguard / R8 Configuration
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepclassmembers class com.studymate.ai.MainActivity$* {
    *;
}
-dontwarn android.webkit.**
