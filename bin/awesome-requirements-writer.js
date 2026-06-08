#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const skillName = 'awesome-requirements-writer';
const packageRoot = path.resolve(__dirname, '..');
const markerStart = `<!-- ${skillName}:start -->`;
const markerEnd = `<!-- ${skillName}:end -->`;

const targets = [
  'agent',
  'global',
  'codex',
  'claude',
  'cursor',
  'gemini',
  'opencode',
  'opencli',
  'codebuddy',
  'github-copilot',
  'copilot',
  'trae'
];

function usage() {
  console.log(`Awesome Requirements Writer installer

Usage:
  npm install awesome-requirements-writer
  awr install [target] [options]
  npx awr install [target] [options]
  awr list

Targets:
  agent|global       Install to the shared Agent Skills directory. This is the default.
  codex              Install only to the Codex-specific skills directory.
  claude             Install as a Claude Code skill. Defaults to --global.
  cursor             Install Cursor rules into the current project.
  gemini             Merge GEMINI.md instructions into the current project.
  opencode|opencli   Merge AGENTS.md instructions into the current project.
  codebuddy          Install CodeBuddy rules into the current project.
  github-copilot     Install GitHub Copilot repository instructions.
  trae               Install Trae project rules. Defaults to --variant rules.

Options:
  --global, -g       Install to the user-level agent directory when supported.
  --project, -p      Install to a project directory.
  --cwd <path>       Project directory for project installs. Defaults to cwd.
  --force            Overwrite managed files when they differ.
  --dry-run          Print planned changes without writing files.
  --variant <name>   Trae variant: rules or legacy.
  --help, -h         Show this help.

Examples:
  npm install awesome-requirements-writer
  npx awr install codex
  npx awr install claude
  npx awr install cursor --cwd ./my-project
  npx awr install opencode --cwd ./my-project
`);
}

function parseArgs(argv) {
  const args = [...argv];
  const command = args.shift();
  let target;
  if (args[0] && !args[0].startsWith('-')) {
    target = args.shift();
  }
  const options = {
    cwd: process.cwd(),
    dryRun: false,
    force: false,
    global: false,
    project: false,
    variant: 'rules'
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--global' || arg === '-g') options.global = true;
    else if (arg === '--project' || arg === '-p') options.project = true;
    else if (arg === '--force') options.force = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--cwd') options.cwd = path.resolve(args[++i] || '');
    else if (arg === '--variant') options.variant = args[++i] || '';
    else if (arg === '--help' || arg === '-h') options.help = true;
    else fail(`Unknown option: ${arg}`);
  }

  if (options.global && options.project) {
    fail('Use either --global or --project, not both.');
  }

  return { command, target, options };
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function info(message) {
  console.log(message);
}

function source(...parts) {
  return path.join(packageRoot, ...parts);
}

function projectPath(options, ...parts) {
  return path.join(path.resolve(options.cwd), ...parts);
}

function homePath(...parts) {
  return path.join(os.homedir(), ...parts);
}

function ensureDir(dir, options) {
  if (options.dryRun) {
    info(`[dry-run] mkdir -p ${dir}`);
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function sameFileContent(src, dest) {
  return fs.existsSync(dest) && readText(src) === readText(dest);
}

function writeFile(file, content, options) {
  ensureDir(path.dirname(file), options);
  if (options.dryRun) {
    info(`[dry-run] write ${file}`);
    return;
  }
  fs.writeFileSync(file, content);
}

function copyFileSafe(src, dest, options) {
  const existed = fs.existsSync(dest);
  if (fs.existsSync(dest)) {
    if (sameFileContent(src, dest)) {
      info(`unchanged ${dest}`);
      return;
    }
    if (!options.force) {
      throw new Error(`Refusing to overwrite existing file: ${dest}. Re-run with --force if this file is managed by ${skillName}.`);
    }
  }

  ensureDir(path.dirname(dest), options);
  if (options.dryRun) {
    info(`[dry-run] copy ${src} -> ${dest}`);
    return;
  }
  fs.copyFileSync(src, dest);
  info(`${existed ? 'updated' : 'installed'} ${dest}`);
}

function copyDirSafe(srcDir, destDir, options) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) copyDirSafe(src, dest, options);
    else if (entry.isFile()) copyFileSafe(src, dest, options);
  }
}

function mergeMarkdownBlock(src, dest, options) {
  const snippet = readText(src).trim();
  const block = `${markerStart}\n${snippet}\n${markerEnd}`;
  const existed = fs.existsSync(dest);
  const existing = existed ? readText(dest) : '';
  let next;

  if (existing.includes(markerStart) && existing.includes(markerEnd)) {
    const start = existing.indexOf(markerStart);
    const end = existing.indexOf(markerEnd) + markerEnd.length;
    next = `${existing.slice(0, start)}${block}${existing.slice(end)}`;
  } else if (existing.trim()) {
    next = `${existing.replace(/\s*$/, '')}\n\n${block}\n`;
  } else {
    next = `${block}\n`;
  }

  if (existing === next) {
    info(`unchanged ${dest}`);
    return;
  }

  writeFile(dest, next, options);
  info(`${options.dryRun ? '[dry-run] would' : existed ? 'updated' : 'created'} ${dest}`);
}

function copyIfMissing(src, dest, options) {
  if (fs.existsSync(dest)) {
    info(`kept existing ${dest}`);
    return;
  }
  copyFileSafe(src, dest, options);
}

function installCodex(options) {
  const dest = options.project
    ? projectPath(options, '.codex', 'skills', skillName)
    : homePath('.codex', 'skills', skillName);
  copyDirSafe(source('adapters', 'codex', '.agents', 'skills', skillName), dest, options);
}

function installAgent(options) {
  const dest = options.project
    ? projectPath(options, '.agents', 'skills', skillName)
    : homePath('.agents', 'skills', skillName);
  copyDirSafe(source('adapters', 'codex', '.agents', 'skills', skillName), dest, options);
}

function installClaude(options) {
  const dest = options.project
    ? projectPath(options, '.claude', 'skills', skillName)
    : homePath('.claude', 'skills', skillName);
  copyDirSafe(source('adapters', 'claude', '.claude', 'skills', skillName), dest, options);
}

function installCursor(options) {
  rejectGlobal('cursor', options);
  copyDirSafe(source('adapters', 'cursor', '.cursor'), projectPath(options, '.cursor'), options);
}

function installCodeBuddy(options) {
  rejectGlobal('codebuddy', options);
  copyDirSafe(source('adapters', 'codebuddy', '.codebuddy'), projectPath(options, '.codebuddy'), options);
}

function installGitHubCopilot(options) {
  rejectGlobal('github-copilot', options);
  copyDirSafe(
    source('adapters', 'github-copilot', '.github', 'instructions'),
    projectPath(options, '.github', 'instructions'),
    options
  );
  mergeMarkdownBlock(
    source('adapters', 'github-copilot', '.github', 'copilot-instructions.md'),
    projectPath(options, '.github', 'copilot-instructions.md'),
    options
  );
}

function installGemini(options) {
  const base = options.global ? homePath('.gemini') : projectPath(options, '.gemini');
  const geminiFile = options.global ? homePath('.gemini', 'GEMINI.md') : projectPath(options, 'GEMINI.md');
  copyDirSafe(source('adapters', 'gemini', '.gemini'), base, options);
  mergeMarkdownBlock(source('adapters', 'gemini', 'GEMINI.md'), geminiFile, options);
}

function installOpenCode(options) {
  rejectGlobal('opencode', options);
  copyDirSafe(source('adapters', 'opencode', '.opencode'), projectPath(options, '.opencode'), options);
  copyIfMissing(source('adapters', 'opencode', 'opencode.json'), projectPath(options, 'opencode.json'), options);
  mergeMarkdownBlock(source('adapters', 'opencode', 'AGENTS.snippet.md'), projectPath(options, 'AGENTS.md'), options);
}

function installTrae(options) {
  rejectGlobal('trae', options);
  if (!['rules', 'legacy'].includes(options.variant)) {
    fail('Trae --variant must be "rules" or "legacy".');
  }

  const variantPath = options.variant === 'rules'
    ? ['.trae', 'rules']
    : ['.trae'];
  const srcBase = source('adapters', 'trae', ...variantPath);
  const destBase = projectPath(options, ...variantPath);
  copyDirSafe(path.join(srcBase, 'references'), path.join(destBase, 'references'), options);
  mergeMarkdownBlock(path.join(srcBase, 'project_rules.md'), path.join(destBase, 'project_rules.md'), options);
}

function rejectGlobal(target, options) {
  if (options.global) {
    fail(`${target} adapter is project-level only. Remove --global and optionally pass --cwd <project>.`);
  }
}

function install(target, options) {
  const normalized = normalizeTarget(target || 'agent');
  if (!normalized) fail(`Unknown target: ${target}. Run "awr list".`);

  if (!options.global && !options.project && ['agent', 'codex', 'claude'].includes(normalized)) {
    options.global = true;
  }

  const installers = {
    agent: installAgent,
    codex: installCodex,
    claude: installClaude,
    cursor: installCursor,
    gemini: installGemini,
    opencode: installOpenCode,
    codebuddy: installCodeBuddy,
    'github-copilot': installGitHubCopilot,
    trae: installTrae
  };

  installers[normalized](options);
  info(`Done. ${options.dryRun ? 'Planned install of' : 'Installed'} ${skillName} for ${normalized}.`);
}

function normalizeTarget(target) {
  if (target === 'global') return 'agent';
  if (target === 'opencli') return 'opencode';
  if (target === 'copilot') return 'github-copilot';
  return targets.includes(target) ? target : null;
}

function listTargets() {
  console.log(`Supported targets:
  agent (alias: global, default)
  codex
  claude
  cursor
  gemini
  opencode (alias: opencli)
  codebuddy
  github-copilot (alias: copilot)
  trae`);
}

function main() {
  const { command, target, options } = parseArgs(process.argv.slice(2));
  if (!command || options.help || command === 'help' || command === '--help' || command === '-h') {
    usage();
    return;
  }
  if (command === 'list') {
    listTargets();
    return;
  }
  if (command !== 'install') {
    fail(`Unknown command: ${command}`);
  }
  try {
    install(target, options);
  } catch (error) {
    fail(error.message);
  }
}

main();
