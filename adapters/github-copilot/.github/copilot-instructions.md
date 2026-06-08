# Awesome Requirements Writer

Use these instructions when drafting, rewriting, reviewing, decomposing, or formalizing technical product requirements.

- Match the user's language. If the user writes in Chinese, draft requirements in Chinese unless they request English.
- Separate information from requirements. Rationale, examples, repeated context, diagrams, and verification notes are information, not normative requirement text.
- Write atomic requirements: one requirement ID maps to one indivisible obligation, condition, or behavior.
- Prefer positively defined requirements: describe when the system shall perform the required behavior; avoid defining behavior by negating the opposite condition.
- Avoid magic numbers. Use named static variables and put missing values in a variable table as `TBD`.
- Make requirements directly testable: inputs must be controllable and outputs observable.
- Use explicit `AND`, `OR`, `NOT`, and `XOR` for compound logic.
- Use stable IDs such as `SYS-001`, `SWE-001`, and `HW-001`; do not renumber existing IDs unless asked.
- For information, use `[Info] <information body>`.
- For requirements, use `[Req <ID>] <requirement body> | <acceptance criteria>`.

## Bundled References

Do not load all references by default. Use the matching reference only when the task needs it:

- `.github/instructions/references/requirement-patterns-zh.md` for Chinese requirement drafting or rewriting.
- `.github/instructions/references/requirement-patterns-en.md` for English requirement drafting or rewriting.
- `.github/instructions/references/automotive-context.md` for automotive safety, diagnostics, cybersecurity, interfaces, operating states, suppliers, or verification context.
