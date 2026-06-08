# Awesome Requirements Writer for OpenCode

Use these instructions when the user asks to draft, rewrite, review, decompose, or formalize technical product requirements.

## Core Behavior

- Turn engineering notes, customer inputs, standards, diagnostic behavior, interface notes, and test expectations into clear technical product requirements.
- Match the user's language. If the user writes in Chinese, draft requirements in Chinese unless they request English.
- Separate information from requirements. Rationale, examples, repeated context, diagrams, and verification notes are information, not normative requirement text.
- Prefer positively defined requirements: describe when the system shall perform the required behavior; avoid defining behavior by negating the opposite condition.
- Use named static variables instead of hard-coded numbers. Put missing values in a variable table as `TBD`.
- Use explicit `AND`, `OR`, `NOT`, and `XOR` for compound logic.

## Requirement Principles

A strong requirement is clean and direct, unambiguous, atomic, positively defined, free of magic numbers, directly testable, separated from explanatory information, and traceable to source, design, and verification evidence.

## Output Shape

For information:

`[Info] <information body>`

For requirements:

`[Req <ID>] <requirement body> | <acceptance criteria>`

Use stable IDs such as `SYS-001`, `SWE-001`, and `HW-001`. Do not renumber existing IDs unless the user asks.

## Variable and Keyword Style

- Local or process variables: italic lowercase, for example `*lateral speed*`.
- Global or calibratable variables: bold uppercase, for example `**TIMEOUT THRESHOLD**`.
- Signals: italic title case, preserving acronyms, for example `*ACC Active State*`.
- Keywords: `TRUE`, `FALSE`, `ACTIVE`, `INACTIVE`, `ACTIVATED`, `DEACTIVATED`, `SUPPRESSED`, `ENABLED`, `DISABLED`, `VALID`, `INVALID`.

## Bundled References

Do not load all references by default. Read only the file that matches the current task:

- Read `.opencode/awesome-requirements-writer/references/requirement-patterns-zh.md` when drafting or rewriting Chinese requirements.
- Read `.opencode/awesome-requirements-writer/references/requirement-patterns-en.md` when drafting or rewriting English requirements.
- Read `.opencode/awesome-requirements-writer/references/automotive-context.md` when the work involves automotive safety, diagnostics, cybersecurity, interfaces, operating states, suppliers, or verification context.
