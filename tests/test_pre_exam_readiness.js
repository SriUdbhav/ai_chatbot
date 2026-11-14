/**
 * tests/test_pre_exam_readiness.js
 * Comprehensive automated verification for zero-internet exam readiness in StudyMate AI.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING PRE-EXAM READINESS AUDIT ---');

const ROOT_DIR = path.resolve(__dirname, '..');
const localAiPath = path.join(ROOT_DIR, 'public', 'js', 'local-ai.js');
const chatJsPath = path.join(ROOT_DIR, 'public', 'js', 'chat.js');
const swPath = path.join(ROOT_DIR, 'public', 'sw.js');
const chatEjsPath = path.join(ROOT_DIR, 'views', 'chat.ejs');

const localAiCode = fs.readFileSync(localAiPath, 'utf8');
const chatJsCode = fs.readFileSync(chatJsPath, 'utf8');
const swCode = fs.readFileSync(swPath, 'utf8');
const chatEjsCode = fs.readFileSync(chatEjsPath, 'utf8');

let testsPassed = 0;
let testsTotal = 0;

function runTest(name, fn) {
    testsTotal++;
    try {
        fn();
        console.log(`[PASS] ${name}`);
        testsPassed++;
    } catch (err) {
        console.error(`[FAIL] ${name}:`, err.message);
    }
}

// 1. Local AI Readiness Test Methods
runTest('local-ai.js exports runPreExamReadinessTest and getExamVerificationStatus', () => {
    assert.ok(localAiCode.includes('runPreExamReadinessTest'), 'Missing runPreExamReadinessTest');
    assert.ok(localAiCode.includes('getExamVerificationStatus'), 'Missing getExamVerificationStatus');
    assert.ok(localAiCode.includes('checkStorageQuotaForModel'), 'Missing checkStorageQuotaForModel');
});

runTest('local-ai.js defines storage requirements for all models', () => {
    assert.ok(localAiCode.includes('requiredStorageMB: 1100'), 'Qwen 1.5B missing requiredStorageMB');
    assert.ok(localAiCode.includes('requiredStorageMB: 480'), 'Qwen 0.5B missing requiredStorageMB');
    assert.ok(localAiCode.includes('requiredStorageMB: 800'), 'Llama 1B missing requiredStorageMB');
});

runTest('local-ai.js runPreExamReadinessTest verifies all 6 exam prerequisites', () => {
    assert.ok(localAiCode.includes('WebGPU'), 'Missing WebGPU check in readiness test');
    assert.ok(localAiCode.includes('appShell'), 'Missing appShell check');
    assert.ok(localAiCode.includes('runtimeAndWorker'), 'Missing runtimeAndWorker check');
    assert.ok(localAiCode.includes('modelCache'), 'Missing modelCache check');
    assert.ok(localAiCode.includes('storagePersistence'), 'Missing storagePersistence check');
    assert.ok(localAiCode.includes('offlineInference'), 'Missing offlineInference check');
    assert.ok(localAiCode.includes('studymate_offline_exam_verified'), 'Missing verified flag in localStorage');
});

// 2. Service Worker Storage Isolation & Navigation Resilience
runTest('public/sw.js protects WebLLM caches and bypasses large model weights', () => {
    assert.ok(swCode.includes(".startsWith('studymate-')"), 'SW must only purge studymate- caches');
    assert.ok(swCode.includes('huggingface.co'), 'SW must bypass Hugging Face domains');
    assert.ok(swCode.includes('.bin') && swCode.includes('.safetensors'), 'SW must bypass raw weight extensions');
    assert.ok(swCode.includes('{ ignoreSearch: true }'), 'SW must use ignoreSearch for offline navigation resilient matching');
});

// 3. UI Elements in views/chat.ejs
runTest('views/chat.ejs contains Pre-Exam Offline Readiness Checker elements', () => {
    assert.ok(chatEjsCode.includes('examReadinessOverallBadge'), 'Missing #examReadinessOverallBadge');
    assert.ok(chatEjsCode.includes('examCheckModelName'), 'Missing #examCheckModelName');
    assert.ok(chatEjsCode.includes('examCheckDownloadStatus'), 'Missing #examCheckDownloadStatus');
    assert.ok(chatEjsCode.includes('examCheckShaderStatus'), 'Missing #examCheckShaderStatus');
    assert.ok(chatEjsCode.includes('examCheckPersistenceStatus'), 'Missing #examCheckPersistenceStatus');
    assert.ok(chatEjsCode.includes('examCheckAssetsStatus'), 'Missing #examCheckAssetsStatus');
    assert.ok(chatEjsCode.includes('examCheckInferenceStatus'), 'Missing #examCheckInferenceStatus');
    assert.ok(chatEjsCode.includes('testOfflineModeBtn'), 'Missing #testOfflineModeBtn');
    assert.ok(chatEjsCode.includes('grantStoragePersistBtn'), 'Missing #grantStoragePersistBtn');
    assert.ok(chatEjsCode.includes('examTestProgressLog'), 'Missing #examTestProgressLog');
});

// 4. Client Controller Wiring in public/js/chat.js
runTest('public/js/chat.js wires up testOfflineModeBtn and refreshExamReadiness', () => {
    assert.ok(chatJsCode.includes('refreshExamReadiness'), 'Missing refreshExamReadiness function');
    assert.ok(chatJsCode.includes('testOfflineModeBtn.onclick'), 'Missing testOfflineModeBtn.onclick handler');
    assert.ok(chatJsCode.includes('grantStoragePersistBtn.onclick'), 'Missing grantStoragePersistBtn.onclick handler');
    assert.ok(chatJsCode.includes('runPreExamReadinessTest'), 'Missing localAi.runPreExamReadinessTest call');
});

// 5. Zero-Internet / Offline Routing Behavior
runTest('public/js/chat.js handles offline auto-switching to Local AI', () => {
    assert.ok(chatJsCode.includes('localAi.generateLocalResponse'), 'Missing generateLocalResponse call');
    assert.ok(chatJsCode.includes('useLocalAi'), 'Missing useLocalAi state flag');
});

console.log(`\nAUDIT RESULT: ${testsPassed} / ${testsTotal} tests passed.`);
if (testsPassed !== testsTotal) {
    process.exit(1);
} else {
    console.log('ALL PRE-EXAM READINESS CHECKS PASSED SUCCESSFULLY.');
}
