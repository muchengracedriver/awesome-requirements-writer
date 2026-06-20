# Awesome Requirements Writer
v0.2.0

[![npm version](https://img.shields.io/npm/v/awesome-requirements-writer?label=npm)](https://www.npmjs.com/package/awesome-requirements-writer)
[![npm downloads](https://img.shields.io/npm/dm/awesome-requirements-writer?label=downloads)](https://www.npmjs.com/package/awesome-requirements-writer)

本skill支持中文技术需求文档编写，请浏览 简体中文(./README-zh.md) 内容。

As an automotive engineer and techinical manager with more than ten years of experience who has led engineering teams through ASPICE certification, I summarized what I have learned from years of writing and reviewing technical product requirements into this reusable AI agent skill. It helps turn engineering notes, customer inputs, standards, and test expectations into clear, testable technical product requirements.

Some of the ideas behind this skill are discussed in an article I wrote (in Chinese) a couple years ago: https://zhuanlan.zhihu.com/p/338598640

English | [简体中文](./README-zh.md)

## Problems Addressed

Junior engineers often run into recurring problems when writing technical requirements, such as:

- Conversational engineering notes becoming vague requirements;
- Requirement text mixing normative behavior with rationale, examples, diagrams, or test advice;
- Compound conditions with unclear `AND` / `OR` logic;
- One requirement ID covering multiple behaviors or multiple test points;
- Static values written directly into requirements without named variables or a variable table;
- Inputs, outputs, states, and acceptance criteria that are not testable;
- Intermediate-level requirements that cannot be clearly linked to upper-level or lower-level requirements.

## Solution

This repository packages one `SKILL.md` file plus English and Chinese requirement-writing templates as an AI-agent skill to help compensate for gaps in requirement-writing experience.

| Principle | Prevents |
| --- | --- |
| **Clean and direct** | Rationale or background information leaking into normative requirement text |
| **Unambiguous** | Subjective wording, hidden assumptions, unclear Boolean logic |
| **Atomic** | One ID covering multiple obligations or conditions |
| **Positively defined** | Requirements defined by negating the opposite condition |
| **No magic numbers** | Hard-coded values without a static-variable table |
| **Directly testable** | Inputs or outputs that verification teams cannot control or observe |
| **Separate requirements from information** | Requirements, explanations, context, examples, and diagrams mixed together |
| **Traceable** | Requirements without source, test, design, or acceptance links |

## Install

**Method 1 (Recommended):**
Tell your agent directly: install `awesome-requirements-writer` skill.

**Method 2:**

Prerequisite: install Node.js 18 or newer.

Install Node.js LTS on Linux/macOS with nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash && . "$HOME/.nvm/nvm.sh" && nvm install --lts
```

Check your environment:

```bash
node --version
```

After confirming Node.js is installed, run:

```bash
npx awesome-requirements-writer install
```

Note:
This package also provides an optional installer CLI for target-specific adapters. For example, if you only want to install to the Codex-specific directory:

```bash
npx awesome-requirements-writer install codex
```

OpenClaw and Hermes both consume `SKILL.md`-style skill folders, so they reuse the same canonical skill package:

```bash
npx awesome-requirements-writer install openclaw
npx awesome-requirements-writer install hermes
```

List supported targets:

```bash
npx awesome-requirements-writer list
```

## Use

Invoke the skill explicitly:

```text
Use $awesome-requirements-writer to turn these engineering notes into product requirements:
...
```

The skill follows the user's language. Chinese input produces Chinese requirements unless English is requested.

## Repository Layout

```text
package.json
bin/awesome-requirements-writer.js
SKILL.md
references/
  automotive-context.md
  requirement-patterns-en.md
  requirement-patterns-zh.md
adapters/
  codex/
  claude/
  cursor/
  gemini/
  opencode/
  codebuddy/
  github-copilot/
  trae/
```

`SKILL.md` is the core agent instruction. The files in `references/` are loaded only when the task needs detailed templates or automotive engineering context.
OpenClaw and Hermes reuse the `SKILL.md` package rather than adding a separate adapter wrapper.

## Adapters

| Target | Adapter source | Install target |
| --- | --- | --- |
| Shared Agent Skills | `adapters/codex/.agents/skills/awesome-requirements-writer/` | `~/.agents/skills/awesome-requirements-writer/` or project `.agents/skills/awesome-requirements-writer/` |
| Codex-only | `adapters/codex/.agents/skills/awesome-requirements-writer/` | `~/.codex/skills/awesome-requirements-writer/` or project `.codex/skills/awesome-requirements-writer/` |
| Claude Code | `adapters/claude/.claude/skills/awesome-requirements-writer/` | `.claude/skills/awesome-requirements-writer/` or `~/.claude/skills/awesome-requirements-writer/` |
| Cursor | `adapters/cursor/.cursor/rules/` | `.cursor/rules/`, including `references/` |
| Gemini CLI | `adapters/gemini/` | Merge into `GEMINI.md`; copy references under `.gemini/awesome-requirements-writer/` |
| OpenCode | `adapters/opencode/` | Merge `AGENTS.snippet.md` into `AGENTS.md`; copy references under `.opencode/awesome-requirements-writer/` |
| OpenClaw | `adapters/codex/.agents/skills/awesome-requirements-writer/` | `~/.openclaw/skills/awesome-requirements-writer/` or workspace `skills/awesome-requirements-writer/` |
| Hermes Agent | `adapters/codex/.agents/skills/awesome-requirements-writer/` | `~/.hermes/skills/awesome-requirements-writer/` |
| CodeBuddy | `adapters/codebuddy/.codebuddy/rules/awesome-requirements-writer/` | `.codebuddy/rules/awesome-requirements-writer/`, including `RULE.mdc` and `references/` |
| GitHub Copilot | `adapters/github-copilot/.github/` | `.github/`, including `copilot-instructions.md`, `instructions/`, and `instructions/references/` |
| Trae | `adapters/trae/.trae/` | Trae project rules path, confirm whether your version uses `.trae/project_rules.md` or `.trae/rules/project_rules.md` |

Rule-style adapters include bundled `references/`, but their entry files explicitly tell the agent not to load every reference by default. The agent should read only the matching language or automotive-context reference when the task needs it. OpenClaw and Hermes use the canonical `SKILL.md` package directly instead of a separate wrapper file. OpenClaw/Hermes support means local SKILL.md-compatible installation support; it does not claim ClawHub or Hermes registry publication until those registry flows are tested separately. For fixed entry filenames such as `AGENTS.md` or `GEMINI.md`, merge the provided snippet into the user's existing file instead of overwriting it.

The CLI installer performs this merge automatically by using a marked block. Re-running the installer updates that block instead of appending duplicates.

## How to Know It's Working

The skill is working if the output has:

- Requirements separated from explanatory information.
- Stable IDs such as `SYS-001`, `SWE-001`, or `HW-001`.
- Explicit triggers, states, inputs, outputs, and acceptance criteria.
- Named static variables instead of unexplained numbers.
- Clear `AND` / `OR` logic for compound conditions.
- Open questions for missing engineering values instead of invented thresholds.

## Customization

Users can edit `SKILL.md` to adjust the core behavior, and can add company- or team-specific rules under a `## Project-Specific Guidelines` section. Edit `references/requirement-patterns-en.md` and `references/requirement-patterns-zh.md` to adjust language-specific examples, templates, and terminology.

## License

MIT 
