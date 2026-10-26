/**
 * Home Controller
 * Handles requests for the main landing page and server status check.
 */

const { isApiKeyConfigured, getModelName } = require('../config/gemini');

/**
 * Render the welcome/home page proving server and EJS rendering work.
 */
exports.getHomePage = (req, res) => {
  const isConfigured = isApiKeyConfigured();

  res.render('index', {
    pageTitle: 'AI Study Assistant | Home',
    projectTitle: 'AI Study Assistant',
    tagline: 'Your Intelligent Generative AI Academic Companion',
    serverStatus: 'Online',
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
    apiKeyConfigured: isConfigured,
    geminiSdkReady: true,
    serverTimestamp: new Date().toISOString(),
    currentYear: new Date().getFullYear(),
    phases: [
      {
        number: 1,
        title: 'Project Foundation & Architecture',
        status: 'Completed',
        description: 'Node.js, Express, EJS, Public Assets, Dotenv & SDK setup.'
      },
      {
        number: 2,
        title: 'Gemini Generative AI Integration',
        status: 'Upcoming',
        description: 'Conversational chat interface, streaming responses & prompt engineering.'
      },
      {
        number: 3,
        title: 'Study Assistant Tools',
        status: 'Upcoming',
        description: 'Concept summarization, flashcard generators, and interactive quizzes.'
      }
    ]
  });
};

/**
 * Health check endpoint returning server status in JSON format.
 * Can be used by frontend JS to verify live asynchronous communication.
 */
exports.getApiStatus = (req, res) => {
  res.json({
    status: 'success',
    message: 'AI Study Assistant server is healthy and responding.',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    geminiConfigured: isApiKeyConfigured(),
    model: getModelName()
  });
};
