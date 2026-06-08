---
applyTo: "**/*.{md,mdx,txt}"
---

# Awesome Requirements Writer

Apply these instructions when the task involves automotive product requirements, software requirements, system requirements, diagnostics requirements, interface requirements, acceptance criteria, or requirement quality review.

## Core Behavior

- Convert informal engineering notes into requirements that can be designed, reviewed, implemented, verified, and traced.
- Match the user's language. If the user writes in Chinese, draft requirements in Chinese unless they request English.
- Separate information from requirements. Rationale, examples, repeated context, diagrams, and verification notes are information, not normative requirement text.
- Prefer positively defined requirements: describe when the system shall perform the required behavior; avoid defining behavior by negating the opposite condition.
- Use named static variables instead of hard-coded numbers. Put missing values in a variable table as `TBD`.
- Use explicit `AND`, `OR`, `NOT`, and `XOR` for compound logic.

## Output Shape

For information:

`[Info] <information body>`

For requirements:

`[Req <ID>] <requirement body> | <acceptance criteria>`

Use stable IDs such as `SYS-001`, `SWE-001`, and `HW-001`. Do not renumber existing IDs unless the user asks.

## Bundled References

Do not load all references by default. Use the matching reference only when the task needs it:

- `.github/instructions/references/requirement-patterns-zh.md` for Chinese requirement drafting or rewriting.
- `.github/instructions/references/requirement-patterns-en.md` for English requirement drafting or rewriting.
- `.github/instructions/references/automotive-context.md` for automotive safety, diagnostics, cybersecurity, interfaces, operating states, suppliers, or verification context.
