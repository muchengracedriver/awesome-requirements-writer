# Awesome Requirements Writer

As an automotive software engineer with more than ten years of experience, and as a technical manager who has led engineering teams through ASPICE certification, I summarized what I have learned from years of writing and reviewing technical product requirements into this reusable AI agent skill. It helps turn engineering notes, customer inputs, standards, and test expectations into clear, testable technical product requirements.

Some of the ideas behind this skill are discussed in an article I wrote: https://zhuanlan.zhihu.com/p/338598640

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

For Codex user-level use, clone this repository into the shared Agent Skills directory:

```bash
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/muchengracedriver/awesome-requirements-writer.git "$HOME/.agents/skills/awesome-requirements-writer"
```

For project-level installation, copy the relevant adapter from `adapters/` into the target project.

## Use

Invoke the skill explicitly:

```text
Use $awesome-requirements-writer to turn these engineering notes into product requirements:
...
```

The skill follows the user's language. Chinese input produces Chinese requirements unless English is requested.

## Repository Layout

```text
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

## Adapters

| Target | Adapter source | Install target |
| --- | --- | --- |
| Codex | `adapters/codex/.agents/skills/awesome-requirements-writer/` | `.agents/skills/awesome-requirements-writer/` or `~/.agents/skills/awesome-requirements-writer/` |
| Claude Code | `adapters/claude/.claude/skills/awesome-requirements-writer/` | `.claude/skills/awesome-requirements-writer/` or `~/.claude/skills/awesome-requirements-writer/` |
| Cursor | `adapters/cursor/.cursor/rules/` | `.cursor/rules/`, including `references/` |
| Gemini CLI | `adapters/gemini/` | Project root, including `GEMINI.md` and `references/`; merge with existing `GEMINI.md` instead of overwriting |
| OpenCode | `adapters/opencode/` | Merge `AGENTS.snippet.md` into project-root `AGENTS.md`; copy `opencode.json` and `references/` |
| CodeBuddy | `adapters/codebuddy/.codebuddy/rules/awesome-requirements-writer/` | `.codebuddy/rules/awesome-requirements-writer/`, including `RULE.mdc` and `references/` |
| GitHub Copilot | `adapters/github-copilot/.github/` | `.github/`, including `copilot-instructions.md`, `instructions/`, and `instructions/references/` |
| Trae | `adapters/trae/.trae/` | Trae project rules path, confirm whether your version uses `.trae/project_rules.md` or `.trae/rules/project_rules.md` |

Rule-style adapters include bundled `references/`, but their entry files explicitly tell the agent not to load every reference by default. The agent should read only the matching language or automotive-context reference when the task needs it. For fixed entry filenames such as `AGENTS.md` or `GEMINI.md`, merge the provided snippet into the user's existing file instead of overwriting it.

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
