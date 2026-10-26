# 🎓 AI Study Assistant &mdash; College Capstone Project

An intelligent, Generative AI-powered conversational chatbot designed to act as an academic study companion for students, powered by Node.js, Express, EJS, and the official Google GenAI SDK (Gemini API).

---

## 📌 Project Overview

- **Project Type:** Generative AI Conversational Assistant
- **Foundation Stack:** Node.js, Express.js, EJS, HTML5, Vanilla CSS, Client JS
- **AI Engine:** Google Gemini API (`@google/genai` / `@google/generative-ai`)
- **Configuration:** `dotenv` for secure environment variable isolation
- **Security Guarantee:** The Gemini API key remains strictly server-side and is **never** exposed to the browser or client-side JavaScript.

---

## 📁 Project Architecture & Directory Structure

```text
ai-study-assistant/
├── config/
│   └── gemini.js         # Server-side Gemini client configuration & validator
├── controllers/
│   └── homeController.js # Page rendering & system diagnostic controllers
├── public/
│   ├── css/
│   │   └── style.css     # Responsive glassmorphism UI & modern design system
│   └── js/
│       └── main.js       # Client-side scripts & asynchronous API tester
├── routes/
│   └── index.js          # Main Express router & endpoint mounts
├── views/
│   ├── partials/
│   │   ├── header.ejs    # Reusable navigation & document head
│   │   └── footer.ejs    # Reusable footer & client script tags
│   ├── 404.ejs           # Graceful error page
│   └── index.ejs         # Dynamic welcome page proving server & EJS rendering
├── .env                  # Local environment file (ignored by Git)
├── .env.example          # Safe configuration template (placeholders only)
├── .gitignore            # Git exclusion rules (node_modules, .env, etc.)
├── package.json          # Node dependencies and scripts
├── server.js             # Express application entry point
└── README.md             # Project documentation & setup guide
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (Tested on Node v20.18.0)
- **npm**: v9.0.0 or higher
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

---

### Installation & Setup

1. **Clone or Navigate to the Project Directory:**
   ```bash
   cd "c:/Users/Sidhartha/OneDrive/Desktop/Capstone Project"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` (already created for you):
   ```bash
   cp .env.example .env
   ```
   Open `.env` and replace `your_gemini_api_key_here` with your actual Google Gemini API key:
   ```env
   PORT=3000
   GEMINI_API_KEY=AIzaSy...your_real_key_here
   ```

---

## 🏃 Running the Application

### Development Mode (with hot-reload):
```bash
npm run dev
```
*Alternatively, you can run:*
```bash
npm run dev:watch
```

### Production / Standard Mode:
```bash
npm start
```

Once started, open your web browser and navigate to:
```
http://localhost:3000
```

---

## 🧪 Verification & Health Check

1. **Welcome Page:** Visit `http://localhost:3000` to verify that:
   - Express server is running and routing properly.
   - EJS template engine dynamically renders server variables (`nodeVersion`, `serverTimestamp`, `phases`).
   - Static assets (CSS styles, Google Fonts, and JS) load with full visual fidelity.
2. **Interactive Server Ping:** Click the **"Test Server Round-Trip"** button on the welcome page. Client-side JavaScript will ping `/api/status` asynchronously and display live server latency and uptime.
3. **API Status Endpoint:** Visit `http://localhost:3000/api/status` to inspect the raw JSON health response.

---

## 🔒 Security Best Practices

- **Zero Client Exposure:** The client browser never communicates directly with `generativelanguage.googleapis.com`. All AI interactions pass through backend Express endpoints.
- **Environment Isolation:** Sensitive credentials reside in `.env`, which is strictly excluded from version control via `.gitignore`.

---

## 🗺️ Roadmap & Next Phase

- **Phase 1 (Completed):** Project Foundation & Architecture (Express, EJS, Static Pipeline, Dotenv, Google GenAI SDK configuration).
- **Phase 2 (Next Phase):** Conversational Chatbot Integration (Interactive chat interface, Gemini streaming responses, contextual academic prompt templates).
- **Phase 3:** Study Tooling (Concept summarization, flashcards, and practice quiz generators).
