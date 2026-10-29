package com.studymate.ai

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.net.http.SslError
import android.os.Build
import android.os.Bundle
import android.view.View
import android.webkit.SslErrorHandler
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.studymate.ai.databinding.ActivityMainBinding
import android.webkit.ConsoleMessage

/**
 * StudyMate AI — Android WebView Host Activity
 *
 * Encapsulates the deployed StudyMate AI web application:
 * URL: https://ai-chatbot-2-084d.onrender.com/
 *
 * Features:
 *  - Full DOM Storage and JavaScript support for conversation history and study modes
 *  - Native Document/File picker integration (PDF, DOCX, TXT) via WebChromeClient.onShowFileChooser
 *  - Strict HTTPS validation (SSL certificate verification never bypassed)
 *  - Safe back-button stack navigation inside WebView before exiting app
 *  - Offline detection with a clean Retry screen
 *  - Pull-to-refresh and top loading progress bar
 *  - Safe lifecycle management (onPause, onResume, onDestroy)
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private var backPressedTime: Long = 0L

    companion object {
        const val TARGET_URL = "https://ai-chatbot-2-084d.onrender.com/"
        private const val BACK_PRESS_EXIT_DELAY_MS = 2000L
    }

    /**
     * Activity result launcher for handling document and file uploads requested by the WebView.
     */
    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val data = result.data
            val results: Array<Uri>? = when {
                data?.clipData != null -> {
                    val count = data.clipData!!.itemCount
                    Array(count) { i -> data.clipData!!.getItemAt(i).uri }
                }
                data?.data != null -> arrayOf(data.data!!)
                else -> null
            }
            fileUploadCallback?.onReceiveValue(results)
        } else {
            // Cancel callback so subsequent file chooser clicks in web page are not blocked
            fileUploadCallback?.onReceiveValue(null)
        }
        fileUploadCallback = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupWebView()
        setupSwipeRefresh()
        setupRetryButton()
        setupBackPressedHandler()

        if (savedInstanceState == null) {
            loadWebsite()
        } else {
            binding.webView.restoreState(savedInstanceState)
        }
    }

    /**
     * Configures the Android WebView with all necessary HTML5, JavaScript, and storage settings.
     */
    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        with(binding.webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT

            // Document and content uploads
            allowFileAccess = true
            allowContentAccess = true

            // Responsive viewport handling
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(true)
            builtInZoomControls = false
            displayZoomControls = false

            // Strict HTTPS security
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW

            // Append custom app identifier while preserving standard mobile User-Agent
            val defaultUserAgent = userAgentString ?: ""
            userAgentString = "$defaultUserAgent StudyMateAI-Android/1.0"
        }

        binding.webView.webViewClient = object : WebViewClient() {

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                val host = request.url?.host ?: ""

                // Keep all StudyMate AI onrender URLs inside this WebView
                if (host.contains("onrender.com") || host.contains("studymate") || url.startsWith("/")) {
                    return false
                }

                // Handle system schemes like mailto:, tel:, whatsapp:
                if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("sms:") || url.startsWith("whatsapp:")) {
                    return try {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        startActivity(intent)
                        true
                    } catch (e: Exception) {
                        false
                    }
                }

                // Open external links in device browser to protect user session
                return try {
                    val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(browserIntent)
                    true
                } catch (e: Exception) {
                    false
                }
            }

            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                binding.progressBar.visibility = View.VISIBLE
                binding.errorLayout.visibility = View.GONE
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                binding.progressBar.visibility = View.GONE
                binding.swipeRefreshLayout.isRefreshing = false
            }

//            override fun onReceivedError(
//                view: WebView?,
//                request: WebResourceRequest?,
//                error: WebResourceError?
//            ) {
//                super.onReceivedError(view, request, error)
//                // Show offline/error screen only for primary page navigation errors
//                if (request?.isForMainFrame == true) {
//                    showOfflineError(getString(R.string.no_internet_title), getString(R.string.no_internet_desc))
//                }
//            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)

                if (request?.isForMainFrame == true) {
                    android.util.Log.e(
                        "StudyMateWebView",
                        "URL: ${request.url}, Error: ${error?.description}, Code: ${error?.errorCode}"
                    )

                    showOfflineError(
                        getString(R.string.no_internet_title),
                        "${error?.description} (Code: ${error?.errorCode})"
                    )
                }
            }

            override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
                // Strict Security Rule: Never bypass SSL certificate validation!
                handler?.cancel()
                showOfflineError(
                    getString(R.string.ssl_error_title),
                    getString(R.string.ssl_error_desc)
                )
            }
        }

        binding.webView.webChromeClient = object : WebChromeClient() {

            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress in 1..99) {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.progressBar.progress = newProgress
                } else {
                    binding.progressBar.visibility = View.GONE
                }
            }
            override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                android.util.Log.e(
                    "StudyMateJS",
                    "${message.message()} | Line: ${message.lineNumber()} | Source: ${message.sourceId()}"
                )
                return true
            }
            /**
             * Handles document and file selection dialogs triggered by HTML <input type="file"> elements.
             * Supports PDF (.pdf), Word (.docx), and Plain Text (.txt) files.
             */
            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                // Cancel any pending callbacks to prevent the interface from hanging
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback

                return try {
                    val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "*/*"
                        putExtra(
                            Intent.EXTRA_MIME_TYPES,
                            arrayOf(
                                "application/pdf",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                "application/msword",
                                "text/plain"
                            )
                        )
                    }

                    // Enable multiple file selection if specified by the web form
                    if (fileChooserParams?.mode == FileChooserParams.MODE_OPEN_MULTIPLE) {
                        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
                    }

                    fileChooserLauncher.launch(Intent.createChooser(intent, getString(R.string.file_chooser_title)))
                    true
                } catch (e: Exception) {
                    fileUploadCallback?.onReceiveValue(null)
                    fileUploadCallback = null
                    false
                }
            }
        }
    }

    /**
     * Configures the pull-to-refresh interaction.
     */
    private fun setupSwipeRefresh() {
        binding.swipeRefreshLayout.setColorSchemeResources(
            R.color.primary,
            R.color.accent_blue
        )
        binding.swipeRefreshLayout.setOnRefreshListener {
            if (isNetworkAvailable()) {
                binding.errorLayout.visibility = View.GONE
                binding.webView.reload()
            } else {
                binding.swipeRefreshLayout.isRefreshing = false
                showOfflineError(getString(R.string.no_internet_title), getString(R.string.no_internet_desc))
            }
        }
    }

    /**
     * Configures the Retry button shown when network is unavailable or loading fails.
     */
    private fun setupRetryButton() {
        binding.btnRetry.setOnClickListener {
            if (isNetworkAvailable()) {
                binding.errorLayout.visibility = View.GONE
                loadWebsite()
            } else {
                Toast.makeText(this, R.string.no_internet_title, Toast.LENGTH_SHORT).show()
            }
        }
    }

    /**
     * Intercepts Android back-button events to navigate backward within WebView history
     * before exiting the application.
     */
    private fun setupBackPressedHandler() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (binding.webView.canGoBack()) {
                    binding.webView.goBack()
                } else {
                    val currentTime = System.currentTimeMillis()
                    if (currentTime - backPressedTime < BACK_PRESS_EXIT_DELAY_MS) {
                        finish()
                    } else {
                        backPressedTime = currentTime
                        Toast.makeText(this@MainActivity, R.string.exit_prompt, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }

    /**
     * Loads the target production website or displays the offline error screen if disconnected.
     */
    private fun loadWebsite() {
        if (isNetworkAvailable()) {
            binding.errorLayout.visibility = View.GONE
            binding.webView.loadUrl(TARGET_URL)
        } else {
            showOfflineError(getString(R.string.no_internet_title), getString(R.string.no_internet_desc))
        }
    }

    /**
     * Displays a clean, user-friendly offline or error screen.
     */
    private fun showOfflineError(title: String, description: String) {
        binding.progressBar.visibility = View.GONE
        binding.swipeRefreshLayout.isRefreshing = false
        binding.errorTitle.text = title
        binding.errorDescription.text = description
        binding.errorLayout.visibility = View.VISIBLE
    }

    /**
     * Checks if the Android device currently has an active, validated internet connection.
     */
    private fun isNetworkAvailable(): Boolean {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
            ?: return false
        val network = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        binding.webView.saveState(outState)
    }

    override fun onResume() {
        super.onResume()
        binding.webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        binding.webView.onPause()
    }

    override fun onDestroy() {
        // Clean up WebView resources to avoid memory leaks
        fileUploadCallback?.onReceiveValue(null)
        fileUploadCallback = null
        binding.webView.stopLoading()
        binding.webView.destroy()
        super.onDestroy()
    }
}
