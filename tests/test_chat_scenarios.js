// Test simulation of chat.js conversation activation and rendering logic
const fs = require('fs');

function testScenario(name, storedItem) {
  console.log(`\n--- Testing Scenario: ${name} ---`);
  const raw = JSON.stringify({ [storedItem.id]: storedItem });
  const parsed = JSON.parse(raw);
  
  const validConversations = {};
  Object.values(parsed).forEach(item => {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string') return;
    const title = typeof item.title === 'string' && item.title.trim()
      ? item.title.trim().slice(0, 60)
      : 'Conversation';
    const createdAt = typeof item.createdAt === 'number' ? item.createdAt : Date.now();
    const updatedAt = typeof item.updatedAt === 'number' ? item.updatedAt : createdAt;
    const customTitle = Boolean(item.customTitle);
    const messages = [];
    if (Array.isArray(item.messages)) {
      item.messages.forEach(msg => {
        if (!msg || typeof msg !== 'object') return;
        const role = msg.role === 'user' ? 'user' : 'model';
        const content = typeof msg.content === 'string' ? msg.content : '';
        if (!content) return;
        messages.push({
          id: msg.id || 'msg_1',
          role: role,
          content: content,
          timestamp: msg.timestamp || Date.now(),
          time: msg.time || '10:00 AM',
          isError: Boolean(msg.isError)
        });
      });
    }
    validConversations[item.id] = {
      id: item.id,
      title: title,
      customTitle: customTitle,
      createdAt: createdAt,
      updatedAt: updatedAt,
      messages: messages
    };
  });

  const activeId = storedItem.id;
  const conv = validConversations[activeId];
  if (!conv || !conv.messages || !conv.messages.length) {
    console.log(`Result: showWelcomeScreen() called! Active title: "${conv ? conv.title : 'None'}"`);
  } else {
    console.log(`Result: renderMessages() called with ${conv.messages.length} messages. Active title: "${conv.title}"`);
  }
}

testScenario('Udbhav with empty messages', {
  id: 'conv_udbhav_1',
  title: 'udbhav',
  updatedAt: Date.now(),
  messages: []
});

testScenario('Udbhav with undefined messages', {
  id: 'conv_udbhav_2',
  title: 'udbhav',
  updatedAt: Date.now()
});

testScenario('Udbhav with 1 user message', {
  id: 'conv_udbhav_3',
  title: 'udbhav',
  updatedAt: Date.now(),
  messages: [{ id: 'm1', role: 'user', content: 'udbhav', timestamp: Date.now() }]
});

console.log('\nAll scenarios completed without exceptions.');
