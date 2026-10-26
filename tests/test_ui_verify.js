const assert = require('assert');

async function verify() {
  const res = await fetch('http://localhost:3000/');
  assert.strictEqual(res.status, 200);
  const html = await res.text();

  const requiredTokens = [
    'id="sidebar"',
    'StudyMate AI',
    'id="newChatBtn"',
    'id="navHome"',
    'id="convoList"',
    'id="navSubjectNotes"',
    'id="navPracticeQuiz"',
    'id="navStudyPlanner"',
    'id="navSavedItems"',
    'id="navSettings"',
    'id="chatSearchInput"',
    'id="themeToggleBtn"',
    'id="notifBtn"',
    'id="notifDropdown"',
    'id="profileChip"',
    'id="messagesArea"',
    'id="welcomeScreen"',
    'id="chatForm"',
    'id="messageInput"',
    'id="sendBtn"',
    'id="studyPanel"',
    'data-action="explain-topic"',
    'data-action="generate-notes"',
    'data-action="solve-problem"',
    'data-action="create-quiz"',
    'data-action="summarize-text"',
    '#DataStructures',
    '#Algorithms',
    '#DBMS',
    '#Python',
    '#OperatingSystems',
    '#Calculus',
    '#Networks',
    '#MachineLearning'
  ];

  let missing = [];
  for (const token of requiredTokens) {
    if (!html.includes(token)) {
      missing.push(token);
    }
  }

  if (missing.length > 0) {
    console.error('FAILED: Missing tokens:', missing);
    process.exit(1);
  }

  console.log(`✅ All ${requiredTokens.length} StudyMate UI tokens verified successfully!`);
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
