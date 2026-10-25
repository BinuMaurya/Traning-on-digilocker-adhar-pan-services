import { execFileSync } from 'node:child_process';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const debounceMs = 5000;
let debounceTimer;
let isProcessing = false;

function runGit(args) {
  return execFileSync('git', args, {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function scheduleUpdate() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateGitHub().catch((error) => {
      console.error(`Auto-push failed: ${error.message}`);
    });
  }, debounceMs);
}

async function updateGitHub() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const changedFiles = runGit(['status', '--porcelain', '--untracked-files=no']);
    if (!changedFiles) return;

    const stagedFiles = runGit(['diff', '--cached', '--name-only']);
    if (stagedFiles) {
      console.warn(
        'Auto-push paused: staged Git changes already exist. Unstage or commit them before continuing.',
      );
      return;
    }

    runGit(['add', '--update']);
    if (!runGit(['diff', '--cached', '--name-only'])) return;

    const timestamp = new Date().toISOString();
    runGit(['commit', '-m', `Auto-update: ${timestamp}`]);

    const branch = runGit(['branch', '--show-current']);
    if (!branch) throw new Error('Cannot push from a detached Git HEAD.');
    runGit(['push', 'origin', branch]);
    console.log(`Pushed saved changes to origin/${branch}.`);
  } catch (error) {
    const details = error.stderr?.toString().trim() || error.message;
    throw new Error(details);
  } finally {
    isProcessing = false;
  }
}

const watcher = watch(projectRoot, { recursive: true }, (_eventType, filename) => {
  if (!filename) {
    scheduleUpdate();
    return;
  }

  const changedPath = filename.toString();
  const ignoredDirectory = changedPath.split(/[\\/]/).some((part) =>
    ['.git', 'node_modules', 'dist'].includes(part),
  );
  if (!ignoredDirectory) scheduleUpdate();
});

watcher.on('error', (error) => {
  console.error(`Auto-push file watcher stopped: ${error.message}`);
  process.exitCode = 1;
});

console.log('GitHub auto-push is watching this project (5-second save debounce).');
scheduleUpdate();
