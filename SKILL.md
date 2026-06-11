---
name: awesome-requirements-writer
description: Use when drafting, rewriting, reviewing, or decomposing technical product requirements for product systems, micro-processors, sensors, actuators, or functions, diagnostics, interfaces, or specifications, engineering change requests. Helps turn engineering know-how, notes, standards, customer notes and test expectations from conversational casual writing into clear, atomic, measurable, traceable，unambiguous requirements with acceptance criteria.
---

# Awesome Requirements Writer
 
## Overview

Turn engineering intent into requirements that can be designed, reviewed, implemented, verified, and traced. Prefer precise requirements over broad product prose, and flag missing engineering inputs instead of inventing thresholds.


## Requirement Principles

A strong requirement is:

- **Clean and direct:** include only necessary normative or definitional content in the requirement statement, no rationale content. 
- **Unambiguous:** avoid subjective terms, vague modifiers, and implicit Boolean logic; use explicit `AND` / `OR` for compound conditions.
- **Atomic:** assign one requirement ID to one indivisible obligation, condition, or behavior.
- **Positively defined:** describe when the system shall perform the required behavior; avoid defining behavior by negating the opposite condition.
- **No magic numbers:** all static numbers shall be expressed by a static variable name with a table of all static variables with its real engineering value.
- **Directly testable:** make required inputs controllable and required outputs observable by the intended verification method.
- **Separate from information:** keep rationale, examples, diagrams, repeated context, and verification notes outside the normative requirement text.
- **Traceable:** link upward to source, system, safety, customer, regulatory, or design-constraint needs, and sideways or downward to test and design evidence.


## Workflow

1. Identify the item under requirement: product system, subsystem, feature, variant, and lifecycle phase.
2. Extract stakeholder intent, system behavior, constraints, interfaces and validation expectations.
3. Determine if the content is "information" or "requirement". Information is the content which is rationale, examples, diagrams, repeated else-defined requirements, and verification notes outside the normative requirement text.
4. Classify requirements by type: functional vs non-functional. 
5. Draft atomic "shall" statements with a single subject, condition, behavior, measurable target, operating bounds, and verification path.
6. Add metadata: type(information/requirement), ID , content body and acceptance criteria.
7. List all functional requirements and related information in one chapter, while all non-functional requirements in another.
8. In a new chapter make a table of all static variables and its value. If no value is given, type TBD.
9. Audit the result for ambiguity, hidden design decisions, unverifiable claims, duplicate requirements, conflicting limits, missing fault behavior, and missing open questions.

**Note:** Functional requirements are direct related to a specific feature or design, while non-functional requirements are related to general performance, system efficiency, software extensibility etc。 They are not direct related to feature level performance definition,more focusing on system level or product level. For example, "The fault flag shall be set within 100 ms after the fault occurs" is a functional requirement, while "The CPU load of the product shall be equal or less than 80%" is a non-functional requirement.

## Requirement Shape

Use this format unless the user asks for another one:

for information:
- [Info] `<information body>`   

for requirement:
- [Req `<ID>`] `<requirement body>` | `<acceptance criteria>`


## Output Rules

- Match the user's language. If the user writes in Chinese, draft requirements in Chinese unless they request English.
- If source notes are incomplete, produce the best draft plus a short "Open Questions" list.
- If multiple interpretations are plausible, state the assumption used.
- Generate output as a .md file.

## Project-Specific Guidelines
User can add their customized project-specific guidelines in this section.


## References

- Read `references/requirement-patterns-en.md` when drafting many requirements or converting informal engineering notes in English.
- Read `references/requirement-patterns-zh.md` when drafting many requirements or converting informal engineering notes in Chinese.
- Read `references/automotive-context.md` when the work involves automotive engineering.
