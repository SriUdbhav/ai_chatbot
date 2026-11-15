/**
 * StudyMate AI — Complete Offline Package Manager Test Suite
 *
 * Verifies:
 *   1. Complete portable offline package export and folder structure
 *   2. Manifest schema and metadata integrity
 *   3. All 9 Data Structures knowledge files inclusion
 *   4. Application assets and WebLLM runtime bundle inclusion
 *   5. Cryptographic SHA-256 checksum generation and verification
 *   6. Strict security: zero sensitive data (API keys, .env, chat histories)
 *   7. Path traversal defense ('..' rejection)
 *   8. Tampered package rejection (checksum mismatch)
 *   9. Mobile and Android capability detection and model recommendation
 *   10. Offline package import and CacheStorage simulation
 *   11. 9-Step Offline Readiness Audit test
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const OfflinePackageManager = require('../public/js/offline-package-manager.js');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    if (err.stack) console.error(err.stack);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    if (err.stack) console.error(err.stack);
  }
}

(async function () {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log(' STUDYMATE AI — OFFLINE PACKAGE MANAGER & MOBILE TEST SUITE');
  console.log('═════════════════════════════════════════════════════════════════\n');

  // ── TEST 1: Constants & Module API Export ──────────────────────────────────
  runTest('OfflinePackageManager exposes all expected constants and functions', () => {
    assert.strictEqual(OfflinePackageManager.PACKAGE_ROOT_DIR, 'StudyMate-Offline-Package');
    assert.strictEqual(OfflinePackageManager.PACKAGE_FORMAT_VERSION, 1);
    assert.strictEqual(OfflinePackageManager.APP_VERSION, '1.4.0');
    assert.strictEqual(OfflinePackageManager.DATA_STRUCTURES_FILES.length, 9);
    assert.strictEqual(typeof OfflinePackageManager.computeSHA256, 'function');
    assert.strictEqual(typeof OfflinePackageManager.sanitizeZipPath, 'function');
    assert.strictEqual(typeof OfflinePackageManager.detectDeviceCapabilities, 'function');
    assert.strictEqual(typeof OfflinePackageManager.createManifest, 'function');
    assert.strictEqual(typeof OfflinePackageManager.validateManifest, 'function');
    assert.strictEqual(typeof OfflinePackageManager.exportOfflinePackage, 'function');
    assert.strictEqual(typeof OfflinePackageManager.importOfflinePackage, 'function');
    assert.strictEqual(typeof OfflinePackageManager.runComprehensiveOfflineTest, 'function');
  });

  // ── TEST 2: SHA-256 Cryptographic Computation ─────────────────────────────
  await runAsyncTest('Universal computeSHA256 produces exact standard SHA-256 hex digest', async () => {
    const data = 'StudyMate AI Zero-Internet Offline Exam Package';
    const hash = await OfflinePackageManager.computeSHA256(data);
    assert.strictEqual(typeof hash, 'string');
    assert.strictEqual(hash.length, 64);
    // Verified against Node's crypto
    const expected = require('crypto').createHash('sha256').update(data).digest('hex');
    assert.strictEqual(hash, expected);
  });

  // ── TEST 3: Path Traversal Security Defense ───────────────────────────────
  runTest('sanitizeZipPath strictly blocks path traversal and malicious filenames', () => {
    // Valid relative paths
    assert.strictEqual(OfflinePackageManager.sanitizeZipPath('manifest.json'), 'manifest.json');
    assert.strictEqual(OfflinePackageManager.sanitizeZipPath('models/Qwen/model.bin'), 'models/Qwen/model.bin');
    assert.strictEqual(OfflinePackageManager.sanitizeZipPath('knowledge/data-structures/trees.json'), 'knowledge/data-structures/trees.json');

    // Path traversal with ..
    assert.throws(() => {
      OfflinePackageManager.sanitizeZipPath('../evil.sh');
    }, /Security Violation.*Path traversal/);

    assert.throws(() => {
      OfflinePackageManager.sanitizeZipPath('models/../../etc/passwd');
    }, /Security Violation.*Path traversal/);

    assert.throws(() => {
      OfflinePackageManager.sanitizeZipPath('..\\..\\windows\\system32\\calc.exe');
    }, /Security Violation.*Path traversal/);

    // Absolute paths and drive letters
    assert.throws(() => {
      OfflinePackageManager.sanitizeZipPath('/etc/shadow');
    }, /Security Violation/);

    assert.throws(() => {
      OfflinePackageManager.sanitizeZipPath('C:\\Users\\hacked.bat');
    }, /Security Violation/);
  });

  // ── TEST 4: Device & Mobile Capability Detector ───────────────────────────
  await runAsyncTest('detectDeviceCapabilities reports memory, mobile status, and model recommendations', async () => {
    const caps = await OfflinePackageManager.detectDeviceCapabilities();
    assert.strictEqual(typeof caps.isMobile, 'boolean');
    assert.strictEqual(typeof caps.isDesktop, 'boolean');
    assert.strictEqual(typeof caps.recommendedModel, 'object');
    assert.ok(caps.recommendedModel.modelId);
    assert.ok(caps.recommendedModel.reason);
    assert.ok(Array.isArray(caps.warnings));
  });

  // ── TEST 5: Complete Package Export to Portable ZIP ────────────────────────
  let exportedZipBuffer = null;
  let exportedManifest = null;

  await runAsyncTest('exportOfflinePackage generates a complete structured ZIP archive', async () => {
    const mockModelShards = {
      'mlc-chat-config.json': JSON.stringify({ model_type: 'qwen2', conv_template: 'qwen2' }),
      'ndarray-cache.json': JSON.stringify({ records: [{ dataPath: 'params_shard_0.bin', format: 'raw-shard' }] }),
      'params_shard_0.bin': Buffer.from('MODEL_TENSOR_WEIGHT_SHARD_0_DATA'),
      'tokenizer.json': JSON.stringify({ version: '1.0', model: {} }),
      'tokenizer_config.json': JSON.stringify({ tokenizer_class: 'QwenTokenizer' })
    };

    const targetModel = 'Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC';
    let progressReported = false;

    const res = await OfflinePackageManager.exportOfflinePackage({
      modelId: targetModel,
      mockModelFiles: mockModelShards,
      onProgress: (p) => {
        if (p.percent > 0) progressReported = true;
      }
    });

    assert.ok(res.blob);
    assert.ok(Buffer.isBuffer(res.blob) || res.blob instanceof Uint8Array);
    assert.ok(res.totalFiles > 20);
    assert.ok(res.totalSizeBytes > 0);
    assert.ok(progressReported);
    assert.strictEqual(res.filename, `StudyMate-Offline-${targetModel}.zip`);

    exportedZipBuffer = res.blob;
    exportedManifest = res.manifest;
  });

  // ── TEST 6: Archive Layout and File Content Audit ─────────────────────────
  await runAsyncTest('Exported ZIP conforms strictly to package structure layout', async () => {
    assert.ok(exportedZipBuffer);
    const zip = await JSZip.loadAsync(exportedZipBuffer);

    // 1. Root files
    assert.ok(zip.file('StudyMate-Offline-Package/manifest.json'), 'manifest.json must exist at root');
    assert.ok(zip.file('StudyMate-Offline-Package/README.txt'), 'README.txt must exist at root');
    assert.ok(zip.file('StudyMate-Offline-Package/checksums/SHA256SUMS'), 'checksums/SHA256SUMS must exist');

    // 2. Model files
    const modelDir = 'StudyMate-Offline-Package/models/Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC';
    assert.ok(zip.file(`${modelDir}/mlc-chat-config.json`));
    assert.ok(zip.file(`${modelDir}/ndarray-cache.json`));
    assert.ok(zip.file(`${modelDir}/params_shard_0.bin`));
    assert.ok(zip.file(`${modelDir}/tokenizer.json`));

    // 3. All 9 Data Structures knowledge files
    const dsDir = 'StudyMate-Offline-Package/knowledge/data-structures';
    for (const fname of OfflinePackageManager.DATA_STRUCTURES_FILES) {
      assert.ok(zip.file(`${dsDir}/${fname}`), `Missing knowledge file: ${fname}`);
      const text = await zip.file(`${dsDir}/${fname}`).async('string');
      const parsed = JSON.parse(text);
      assert.ok(parsed, `Knowledge file ${fname} must be valid JSON`);
    }

    // 4. Application files
    assert.ok(zip.file('StudyMate-Offline-Package/application/css/chat.css'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/chat.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/local-ai.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/ds-knowledge-engine.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/local-ai-detector.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/offline-package-manager.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/web-llm.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/webllm-worker.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/application/js/jszip.min.js'));

    // 5. WebLLM runtime folder
    assert.ok(zip.file('StudyMate-Offline-Package/webllm/web-llm.js'));
    assert.ok(zip.file('StudyMate-Offline-Package/webllm/webllm-worker.js'));
  });

  // ── TEST 7: Manifest Schema and Security Verification ─────────────────────
  runTest('Manifest schema includes required metadata and strictly excludes secrets', () => {
    assert.ok(exportedManifest);
    assert.strictEqual(exportedManifest.packageName, 'StudyMate-Offline-Package');
    assert.strictEqual(exportedManifest.formatVersion, 1);
    assert.strictEqual(exportedManifest.appVersion, '1.4.0');
    assert.strictEqual(exportedManifest.webllmVersion, '0.2.78');
    assert.strictEqual(exportedManifest.model.modelId, 'Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC');
    assert.strictEqual(exportedManifest.knowledgeBase.syllabusUnits, 9);
    assert.strictEqual(exportedManifest.security.containsPersonalData, false);
    assert.strictEqual(exportedManifest.security.containsApiKeys, false);
    assert.ok(exportedManifest.integrity.totalFiles > 20);
    assert.ok(exportedManifest.integrity.totalSizeBytes > 0);

    const manifestStr = JSON.stringify(exportedManifest);
    assert.ok(!manifestStr.includes('GEMINI_API_KEY'), 'Manifest must never contain GEMINI_API_KEY');
    assert.ok(!manifestStr.includes('AIza'), 'Manifest must never contain Google API keys');
    assert.ok(!manifestStr.includes('studymate_chats'), 'Manifest must never contain private chat histories');
  });

  // ── TEST 8: Package Integrity Verification (SHA-256 Validation) ───────────
  await runAsyncTest('importOfflinePackage with verifyOnly validates all SHA-256 checksums', async () => {
    assert.ok(exportedZipBuffer);
    const verifyRes = await OfflinePackageManager.importOfflinePackage(exportedZipBuffer, {
      verifyOnly: true
    });

    assert.strictEqual(verifyRes.success, true);
    assert.strictEqual(verifyRes.valid, true);
    assert.strictEqual(verifyRes.modelId, 'Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC');
    assert.ok(verifyRes.totalFiles > 20);
  });

  // ── TEST 9: Tampered Package Detection & Rejection ────────────────────────
  await runAsyncTest('Tampered files in archive are caught by cryptographic SHA-256 check', async () => {
    const zip = await JSZip.loadAsync(exportedZipBuffer);
    // Tamper with a model file
    const targetFile = 'StudyMate-Offline-Package/models/Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC/params_shard_0.bin';
    assert.ok(zip.file(targetFile));
    zip.file(targetFile, Buffer.from('TAMPERED_MALICIOUS_BYTES_HERE'));

    const tamperedZipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    let threw = false;
    try {
      await OfflinePackageManager.importOfflinePackage(tamperedZipBuffer, { verifyOnly: true });
    } catch (e) {
      threw = true;
      assert.ok(e.message.includes('Package integrity error') || e.message.includes('Checksum mismatch') || e.message.includes('File size mismatch'));
    }
    assert.strictEqual(threw, true, 'Tampered package MUST be rejected');
  });

  // ── TEST 10: Path Traversal Attack Rejection during Import ─────────────────
  await runAsyncTest('Archive containing path traversal entry is blocked before extraction', async () => {
    const maliciousZip = new JSZip();
    maliciousZip.file('manifest.json', JSON.stringify({ packageName: 'StudyMate-Offline-Package' }));
    maliciousZip.file('models/../../evil.sh', 'echo pwned');

    const maliciousBuffer = await maliciousZip.generateAsync({ type: 'nodebuffer' });

    let caught = false;
    try {
      await OfflinePackageManager.importOfflinePackage(maliciousBuffer);
    } catch (e) {
      caught = true;
      assert.ok(e.message.includes('Security Violation') || e.message.includes('Path traversal'));
    }
    assert.strictEqual(caught, true, 'Malicious path traversal archive MUST be rejected');
  });

  // ── TEST 11: 9-Step Offline Readiness Audit Execution ─────────────────────
  await runAsyncTest('runComprehensiveOfflineTest executes 9-step audit', async () => {
    let stepsReported = 0;
    const report = await OfflinePackageManager.runComprehensiveOfflineTest({
      onStepProgress: (step) => {
        stepsReported++;
        assert.ok(step.step >= 1 && step.step <= 9);
        assert.ok(['PASS', 'FAIL', 'WARN'].includes(step.status));
      }
    });

    assert.strictEqual(report.steps.length, 9, 'Must execute exactly 9 audit steps');
    assert.strictEqual(stepsReported, 9);
    assert.ok(typeof report.passed === 'boolean');
    assert.ok(report.timestamp);
  });

  // ── TEST 12: Cache Version & Service Worker Precache Alignment ─────────────
  runTest('public/sw.js precaches offline-package-manager.js and has version v1.4.0', () => {
    const swPath = path.join(__dirname, '..', 'public', 'sw.js');
    const swContent = fs.readFileSync(swPath, 'utf8');
    assert.ok(swContent.includes("CACHE_VERSION = 'v1.4.0'"), 'Service worker cache version must be v1.4.0');
    assert.ok(swContent.includes("'/js/offline-package-manager.js'"), 'Service worker must precache /js/offline-package-manager.js');
  });

  // ── TEST 13: views/chat.ejs Settings Modal & Script Tag Alignment ──────────
  runTest('views/chat.ejs contains offlinePackageManagerGroup and script tag', () => {
    const ejsPath = path.join(__dirname, '..', 'views', 'chat.ejs');
    const ejsContent = fs.readFileSync(ejsPath, 'utf8');
    assert.ok(ejsContent.includes('id="offlinePackageManagerGroup"'), 'Must have offlinePackageManagerGroup in chat.ejs');
    assert.ok(ejsContent.includes('id="exportPackageBtn"'), 'Must have exportPackageBtn in chat.ejs');
    assert.ok(ejsContent.includes('id="importPackageBtn"'), 'Must have importPackageBtn in chat.ejs');
    assert.ok(ejsContent.includes('id="verifyPackageBtn"'), 'Must have verifyPackageBtn in chat.ejs');
    assert.ok(ejsContent.includes('id="comprehensiveReadinessBtn"'), 'Must have comprehensiveReadinessBtn in chat.ejs');
    assert.ok(ejsContent.includes('<script src="/js/offline-package-manager.js"></script>'), 'Must load offline-package-manager.js script');
  });

  // ── TEST 14: public/js/chat.js Event Wiring Alignment ──────────────────────
  runTest('public/js/chat.js initializes initOfflinePackageManagerSettings', () => {
    const chatJsPath = path.join(__dirname, '..', 'public', 'js', 'chat.js');
    const chatJsContent = fs.readFileSync(chatJsPath, 'utf8');
    assert.ok(chatJsContent.includes('initOfflinePackageManagerSettings'), 'chat.js must include initOfflinePackageManagerSettings');
    assert.ok(chatJsContent.includes('exportPackageBtn'), 'chat.js must wire exportPackageBtn');
    assert.ok(chatJsContent.includes('importPackageBtn'), 'chat.js must wire importPackageBtn');
    assert.ok(chatJsContent.includes('verifyPackageBtn'), 'chat.js must wire verifyPackageBtn');
    assert.ok(chatJsContent.includes('comprehensiveReadinessBtn'), 'chat.js must wire comprehensiveReadinessBtn');
  });

  console.log('\n─────────────────────────────────────────────────────────────────');
  console.log(` RESULTS: ${passedTests} / ${totalTests} checks passed.`);
  console.log('─────────────────────────────────────────────────────────────────\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
})();

