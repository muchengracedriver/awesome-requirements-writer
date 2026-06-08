# Trae Adapter

Trae rule-path documentation and community examples differ by version.

Use one of these project-level rule paths after confirming your Trae version:

- `.trae/project_rules.md`
- `.trae/rules/project_rules.md`

Both variants are included in this adapter. Do not install both into the same target project unless your Trae version explicitly supports both without duplicate loading.

Each variant includes a sibling `references/` directory. The rule file tells the agent to read only the matching reference when needed, not to load every reference by default.
