# Awesome Requirements Writer

作为一个具有十多年工作经验的汽车软件工程师和带领工程团队获得ASPICE认证的技术经理，我把多年来参与编写/评审技术产品需求的心得总结出来，写成了这个可复用的 AI agent skill，用于把工程笔记、客户输入、标准条款和测试期望转换为清晰、可测试的技术产品需求。

对于这个skill中提到的一些内容，我曾经写过一篇文章，具体请浏览：https://zhuanlan.zhihu.com/p/338598640

[English](./README.md) | 简体中文

## 聚焦的问题

对于初级工程师而言，撰写的技术需求总会遇到一些常见的问题，例如：

- 口语化工程笔记直接变成了模糊需求；
- 需求正文混入了原因解释、例子、图示或测试建议；
- 复合条件里的 `AND` / `OR` 逻辑不清楚；
- 一个需求 ID 同时覆盖多个行为或多个测试点；
- 静态数值直接写进需求，没有命名变量和变量表；
- 输入、输出、状态和验收标准不可测试；
- 中间级需求不能和上下级作出清晰关联等等。


## 解决方案

这个仓库把一个 `SKILL.md` 文件和中英文需求写作模板打包成可给 AI agent 调用的 skill，以解决工程师经验不做的问题。


| 原则 | 防止的问题 |
| --- | --- |
| **干净直接** | 原因解释或背景信息混进规范性需求正文 |
| **无歧义** | 主观词、隐藏假设、不明确的布尔逻辑 |
| **原子化** | 一个 ID 覆盖多个义务或条件 |
| **正向定义** | 通过否定相反条件来定义需求 |
| **没有魔法数字** | 硬编码数值缺少静态变量表 |
| **可直接测试** | 测试团队无法控制输入或观察输出 |
| **需求和信息分离** | 把需求、说明、上下文、例子和图混在一起 |
| **可追溯** | 需求缺少来源、测试、设计或验收链接 |


## 安装

如果用于 Codex 的用户级安装，把仓库 clone 到通用 Agent Skills 目录：

```bash
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/muchengracedriver/awesome-requirements-writer.git "$HOME/.agents/skills/awesome-requirements-writer"
```

如果用于某个项目级安装，把 `adapters/` 下对应平台的 adapter 复制到目标项目。

## 使用

显式调用 skill：

```text
Use $awesome-requirements-writer to turn these engineering notes into product requirements:
...
```

这个 skill 会跟随用户语言输出。用户用中文输入时，默认输出中文需求，除非明确要求英文。

## 仓库结构

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

`SKILL.md` 是核心 agent 指令。`references/` 里的文件只在任务需要详细模板或汽车工程上下文时读取。

## 平台适配

| 目标平台 | Adapter 来源 | 安装目标 |
| --- | --- | --- |
| Codex | `adapters/codex/.agents/skills/awesome-requirements-writer/` | `.agents/skills/awesome-requirements-writer/` 或 `~/.agents/skills/awesome-requirements-writer/` |
| Claude Code | `adapters/claude/.claude/skills/awesome-requirements-writer/` | `.claude/skills/awesome-requirements-writer/` 或 `~/.claude/skills/awesome-requirements-writer/` |
| Cursor | `adapters/cursor/.cursor/rules/` | `.cursor/rules/`，包含 `references/` |
| Gemini CLI | `adapters/gemini/` | 项目根目录，包含 `GEMINI.md` 和 `references/`；如果已有 `GEMINI.md`，应合并而不是覆盖 |
| OpenCode | `adapters/opencode/` | 将 `AGENTS.snippet.md` 合并到项目根目录 `AGENTS.md`；复制 `opencode.json` 和 `references/` |
| CodeBuddy | `adapters/codebuddy/.codebuddy/rules/awesome-requirements-writer/` | `.codebuddy/rules/awesome-requirements-writer/`，包含 `RULE.mdc` 和 `references/` |
| GitHub Copilot | `adapters/github-copilot/.github/` | `.github/`，包含 `copilot-instructions.md`、`instructions/` 和 `instructions/references/` |
| Trae | `adapters/trae/.trae/` | Trae 项目规则路径，需确认当前版本使用 `.trae/project_rules.md` 还是 `.trae/rules/project_rules.md` |

规则型 adapter 现在也包含 `references/`，但入口文件会明确要求 agent 不要默认加载全部 reference，只在任务需要时读取对应语言模板或汽车工程上下文。对于 `AGENTS.md` 或 `GEMINI.md` 这类固定入口文件，应把提供的 snippet 合并进用户已有文件，而不是覆盖。

## 如何判断它在起作用

如果输出满足以下特征，说明 skill 正在发挥作用：

- 需求和解释性信息分开。
- 使用稳定 ID，例如 `SYS-001`、`SWE-001` 或 `HW-001`。
- 明确触发条件、状态、输入、输出和验收标准。
- 用命名静态变量替代未解释的数字。
- 复合条件中的 `AND` / `OR` 逻辑清晰。
- 对缺失工程值提出开放问题，而不是编造阈值。

## 个性化修改

用户可修改 `SKILL.md` 来调整核心行为，可在## Project-Specific Guidelines 一节中加入自己公司/团队的定制化规则。修改 `references/requirement-patterns-en.md` 和 `references/requirement-patterns-zh.md` 来调整语言相关的示例、模板和术语。

## 许可

MIT
