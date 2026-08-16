# MTK-Terminal — Project Specification

## 1. Project Overview

Build **MTK-Terminal**, an interactive terminal-style portfolio frontend application.

The application should visually and behaviorally resemble a modern Linux terminal while functioning as a personal portfolio website.

The primary goal is to make the portfolio feel like a **real terminal session**, rather than a conventional portfolio website.

The application must be responsive, polished, accessible, and maintainable.

---

# 2. Core Product Requirements

## 2.1 Theme

* Use a **dark blue terminal theme** as the default and only theme.
* No theme switcher is required.
* The visual style should resemble a modern Linux terminal.
* Use a monospace font throughout the terminal.
* Use terminal-appropriate colors for:

  * Prompt
  * Commands
  * Output
  * Links
  * Errors
  * Hints
  * Important/welcome text
* The UI should feel like a real terminal rather than a generic dark website.

---

# 3. Terminal Tabs

At the top of the application, display terminal tabs similar to Linux terminal applications.

## Initial State

The application starts with exactly one terminal session:

```text
terminal1
```

`terminal1` must be active by default.

The default `terminal1` tab must **NOT** have a close (`x`) button.

A `+` button must appear after the terminal tabs.

Example:

```text
┌───────────────┬─────┐
│ terminal1     │  +  │
└───────────────┴─────┘
```

## Creating a Terminal

When the user clicks `+`:

1. Create a new terminal session.
2. Assign the next terminal name:

   * terminal2
   * terminal3
   * terminal4
   * etc.
3. Automatically activate the newly created terminal.
4. Each terminal must maintain its own:

   * command history
   * current working directory
   * terminal output
   * command input state

Example:

```text
terminal1 | terminal2 x | terminal3 x | +
```

## Closing a Terminal

Only terminals created after `terminal1` have an `x` close button.

Example:

```text
terminal1 | terminal2 x | terminal3 x | +
```

When the user clicks `x`:

1. Close that terminal session.
2. Remove its tab.
3. Activate an appropriate remaining terminal.
4. Never allow the application to have zero terminals.
5. `terminal1` cannot be closed.

If the currently active terminal is closed, activate the nearest remaining terminal.

---

# 4. Terminal Session Model

Each terminal tab represents an independent terminal session.

Each session should maintain:

```text
id
name
commandHistory
historyIndex
currentDirectory
output
inputValue
```

Initial values:

```text
name: terminal1
currentDirectory: ~
commandHistory: []
historyIndex: -1
```

Every newly created terminal should start independently at:

```text
maythinkyi@portfolio:~$
```

A new terminal must execute/display the `help` command automatically.

---

# 5. Initial Terminal State

When a terminal is created or activated for the first time, it should display the equivalent of:

```text
maythinkyi@portfolio:~$ help
```

Then render the help output.

After the help output, display an active command prompt:

```text
maythinkyi@portfolio:~$
```

The cursor must be visually active/blinking like a Linux terminal.

The user should immediately be able to type a command.

---

# 6. Welcome / Help Output

The `help` command must display the following content in this exact logical order.

## Welcome Header

Display:

```text
MAY THIN KYI
```

This should be visually prominent and resemble Linux terminal welcome/banner text.

It should be implemented as an attractive terminal-style ASCII/banner treatment.

The exact ASCII art can be designed appropriately, but the text **MAY THIN KYI** must be clearly recognizable.

## Help Description

Display:

```text
Hello, welcome to MTK Terminal. Type one of these commands -
```

Then:

```text
about - View about me
neofetch / fastfetch / github - View about Github profile
experience - View experience
links - View contact info and links
help - View this help section
history - View command history
whoami - View current username
echo - Echo the input
clear - Clear screen
```

Then:

```text
You can use arrow keys to scroll through history.
Click + to open a new tab. Each tab has its own history and working directory.
Visit my website: maythinkyi.vercel.app
```

Then display the active prompt:

```text
maythinkyi@portfolio:~$
```

---

# 7. Command Input

The command input must behave like a real terminal input.

The prompt must look like:

```text
maythinkyi@portfolio:~$
```

The user types immediately after the prompt.

Do **NOT** use a conventional browser text input design that visually looks like a form.

The input should visually resemble:

```text
maythinkyi@portfolio:~$ _
```

The cursor should blink.

The command input should automatically remain focused whenever appropriate.

---

# 8. Command Autocomplete / Hints

Implement terminal-style command hints.

When the user starts typing a command, show matching supported commands.

For example, if the user types:

```text
h
```

display:

```text
help   history
```

Only commands matching the current input should be displayed.

For example:

```text
g
```

could display:

```text
github
```

For:

```text
a
```

display:

```text
about
```

The hint list should update dynamically as the user types.

## Tab Completion

Implement Linux-style Tab completion.

Example:

User enters:

```text
g
```

Hint:

```text
github
```

When the user presses `Tab`, complete the input to:

```text
github
```

If there are multiple matches, follow sensible terminal-style completion behavior.

Do not submit/execute the command when pressing Tab.

---

# 9. Keyboard History

Implement terminal-style command history.

## Arrow Up

When the user presses `ArrowUp`:

* Move backward through the current terminal's command history.
* Populate the input with the previous command.
* Repeated `ArrowUp` continues moving backward.

Example:

```text
history:
help
about
github
experience
```

Pressing ArrowUp should retrieve:

```text
experience
```

Then:

```text
github
```

Then:

```text
about
```

etc.

## Arrow Down

When the user presses `ArrowDown`:

* Move forward through command history.
* Eventually return to an empty command input.

History must be independent between terminal tabs.

---

# 10. Command Execution

When the user presses Enter:

1. Read the command.
2. Add the command to that terminal session's history.
3. Render the entered command as terminal output.
4. Execute the corresponding command.
5. Render the command output.
6. Display a new prompt.
7. Reset the command input.
8. Reset the history navigation index.

The command must not cause a full page reload.

---

# 11. Supported Commands

The application must support exactly these commands:

```text
help
about
neofetch
fastfetch
github
experience
links
history
whoami
echo
clear
```

Do not implement `onefetch` or `repos`.

---

# 12. `help`

Command:

```text
help
```

Output the complete help section described in Section 6.

---

# 13. `about`

Command:

```text
about
```

Display a visually organized terminal-style profile containing:

## Name

```text
Name: May Thin Kyi
```

## Introduction

Display a short professional introduction.

The content should be stored in a configuration/data structure rather than hardcoded directly inside the command execution logic.

## Skills

Display skills in a terminal-friendly format.

Example:

```text
Skills
────────────────────────────────────────

Frontend
  React
  Next.js
  TypeScript
  Tailwind CSS

Backend
  Node.js
  Express
  PostgreSQL
  MongoDB
  Redis

DevOps / Tools
  Docker
  Git
  GitLab CI
```

The exact skills/content should be easy to modify from a central portfolio data file.

## Education

Display education information using a clean terminal layout.

The overall output should feel like structured terminal information rather than a normal HTML portfolio card.

---

# 14. `github`, `neofetch`, and `fastfetch`

Commands:

```text
github
neofetch
fastfetch
```

These commands should provide GitHub/profile information.

At minimum display:

```text
GitHub:
https://github.com/<username>
```

The GitHub URL must behave like a terminal hyperlink:

* Visually distinguish the link.
* Make it clickable.
* Open the GitHub profile in a new browser tab.

`neofetch` and `fastfetch` should provide GitHub/profile-oriented terminal output.

They may share underlying profile data, but their visual output should feel inspired by their respective terminal commands.

Do not implement actual system-level neofetch/fastfetch behavior.

These are portfolio commands that emulate the concept.

---

# 15. `experience`

Command:

```text
experience
```

Display professional experience.

Experience entries must be displayed one by one with clear terminal-style separators.

Each experience must contain:

```text
Position
Duration
Description
```

Example:

```text
────────────────────────────────────────
Associate Software Engineer
Frontiir Co., Ltd.
Oct 2025 - Present

Description:
...
────────────────────────────────────────

Software Engineer
Company Name
Duration

Description:
...
────────────────────────────────────────
```

Use visually appropriate terminal separators.

Experience data should come from a centralized portfolio data structure.

---

# 16. `links`

Command:

```text
links
```

Display:

```text
Github :    github_link
LinkedIn :  linkedin_link
Email :     email1, email2
```

All applicable links should be clickable.

Links should visually resemble terminal hyperlinks.

---

# 17. `history`

Command:

```text
history
```

Display commands executed in the current terminal session.

Example:

```text
1 echo
2 help
3 about
4 neofetch
5 github
6 experience
7 links
```

History numbering starts from `1`.

History must be session-specific.

If terminal1 executes:

```text
help
about
github
```

and terminal2 executes:

```text
help
experience
```

their histories must remain separate.

Do not reset history when `clear` is executed.

---

# 18. `whoami`

Command:

```text
whoami
```

Output:

```text
maythinkyi
```

---

# 19. `echo`

Command:

```text
echo <text>
```

Output exactly the text after `echo`.

Example:

```text
maythinkyi@portfolio:~$ echo 123
123
```

Example:

```text
maythinkyi@portfolio:~$ echo Hello World
Hello World
```

If the user enters:

```text
echo
```

output an empty line.

---

# 20. `clear`

Command:

```text
clear
```

Clear the current terminal screen/output.

It must behave like a Linux terminal clear operation.

Important:

* Do not close the terminal tab.
* Do not reset command history.
* Do not reset the working directory.
* Only clear visible terminal output.
* Keep the prompt active after clearing.

Example result:

```text
maythinkyi@portfolio:~$
```

---

# 21. Unknown Commands

If the user enters an unsupported command, display:

```text
Unknown command: werwrwerer
```

Example:

```text
maythinkyi@portfolio:~$ werwrwerer
Unknown command: werwrwerer
```

Then display a new prompt.

Do not crash the application.

---

# 22. Command Parsing

The command system should distinguish:

```text
command
```

from:

```text
command arguments
```

For example:

```text
echo hello world
```

should be parsed as:

```text
command: echo
arguments: ["hello", "world"]
```

Command matching should preferably be case-insensitive for better UX.

---

# 23. Working Directory

Every terminal session must have its own working directory state.

Initial directory:

```text
~
```

The current scope does not require `cd` as a user-facing command.

However, the terminal architecture should maintain:

```text
currentDirectory
```

per session so that future filesystem-like commands can be added easily.

The prompt must dynamically use the session's current directory:

```text
maythinkyi@portfolio:~$
```

---

# 24. Terminal Architecture

Do not implement all command behavior inside one large component.

Use a modular architecture.

Recommended conceptual structure:

```text
src/
├── components/
│   └── terminal/
│       ├── TerminalApp
│       ├── TerminalTabs
│       ├── TerminalTab
│       ├── TerminalWindow
│       ├── TerminalOutput
│       ├── TerminalPrompt
│       ├── TerminalInput
│       └── CommandHints
│
├── commands/
│   ├── commandRegistry
│   ├── help
│   ├── about
│   ├── github
│   ├── experience
│   ├── links
│   ├── history
│   ├── whoami
│   ├── echo
│   └── clear
│
├── data/
│   └── portfolio
│
├── types/
│   └── terminal
│
└── utils/
```

The exact directory structure can be adjusted to match the selected frontend framework.

---

# 25. Command Registry

Commands should be registered through a centralized registry rather than using a large chain of `if/else` statements.

Example conceptual model:

```text
commandRegistry = {
  help,
  about,
  neofetch,
  fastfetch,
  github,
  experience,
  links,
  history,
  whoami,
  echo,
  clear
}
```

Aliases should also be supported where required.

There are currently no aliases such as `onefetch` or `repos`.

This architecture should make adding a new command easy.

---

# 26. Portfolio Data

Keep personal portfolio information separate from UI components.

Create a centralized data structure containing:

```text
profile
skills
education
github
experience
links
```

Example conceptual structure:

```text
portfolioData = {
  profile: {...},
  skills: [...],
  education: [...],
  github: {...},
  experience: [...],
  links: {...}
}
```

Do not scatter personal information throughout components.

---

# 27. Responsive Design

The terminal must work on:

* Desktop
* Laptop
* Tablet
* Mobile

On smaller screens:

* Terminal should remain usable.
* Tabs should horizontally scroll if necessary.
* Terminal output should wrap appropriately.
* Long URLs must not break the layout.
* Command input must remain accessible.
* The terminal should occupy the available viewport without causing unwanted page-level horizontal scrolling.

The application should still feel like a terminal on mobile.

---

# 28. Visual Design

The design should feel like a polished Linux terminal.

Important characteristics:

* Dark blue background.
* Monospace typography.
* Subtle terminal chrome.
* Terminal tab bar.
* Clear active tab styling.
* Blinking cursor.
* Terminal-style prompt.
* Terminal-style hyperlinks.
* ASCII/banner welcome text.
* Clean command output.
* Subtle animations only where appropriate.
* Avoid excessive modern SaaS-style cards.
* Avoid making the interface look like a normal portfolio dashboard.

The terminal itself should be the main visual identity of the portfolio.

---

# 29. Accessibility

Implement:

* Keyboard-first interaction.
* Proper focus management.
* Visible focus state.
* Buttons with accessible labels.
* Tab close buttons must have accessible names.
* Links must be keyboard accessible.
* Do not rely exclusively on color to communicate information.
* Respect reduced-motion preferences where animations are used.

The terminal should remain fully usable without a mouse.

---

# 30. State Management

Terminal state should be cleanly separated from portfolio content.

Required application state:

```text
terminals
activeTerminalId
```

Each terminal:

```text
id
name
history
historyIndex
output
input
currentDirectory
initialized
```

Avoid unnecessary global state libraries if React/local state is sufficient.

Use a state management solution only if it genuinely simplifies the architecture.

---

# 31. Performance

The application should feel instantaneous.

Command execution should not require network requests unless explicitly needed.

Portfolio information should be available locally.

Avoid unnecessary re-renders when:

* Typing commands.
* Switching tabs.
* Updating command history.
* Rendering terminal output.

Do not introduce unnecessary dependencies.

---

# 32. Error Handling

The application must never crash because of:

* Unknown commands.
* Empty commands.
* Invalid command arguments.
* Closing a terminal.
* Rapidly creating multiple terminals.
* Rapidly switching tabs.
* Empty history.
* Arrow keys when no history exists.

Empty Enter:

```text
maythinkyi@portfolio:~$
```

should simply create a new prompt without an error.

---

# 33. Interaction Details

## Clicking a Tab

Clicking a terminal tab activates that terminal.

## Clicking `+`

Creates and activates a new terminal.

## Clicking `x`

Closes the corresponding non-default terminal.

## Typing

Typing should go directly into the terminal input.

## Enter

Executes the command.

## Tab

Performs command completion.

## ArrowUp

Previous command.

## ArrowDown

Next command.

## Ctrl/Cmd + L

Optionally support terminal clear behavior as an enhancement.

If implemented:

```text
Ctrl + L
```

should behave like:

```text
clear
```

without adding unnecessary output.

---

# 34. Initial User Experience

When the application loads:

1. Display terminal window.
2. Display `terminal1`.
3. Activate `terminal1`.
4. Automatically render:

   ```text
   maythinkyi@portfolio:~$ help
   ```
5. Render the complete help/welcome output.
6. Display active prompt.
7. Focus the command input.
8. Show blinking cursor.
9. User can immediately start typing.

---

# 35. Example Interaction

Initial:

```text
terminal1                                      +

maythinkyi@portfolio:~$ help

MAY THIN KYI

Hello, welcome to MTK Terminal. Type one of these commands -

about - View about me
neofetch / fastfetch / github - View about Github profile
experience - View experience
links - View contact info and links
help - View this help section
history - View command history
whoami - View current username
echo - Echo the input
clear - Clear screen

You can use arrow keys to scroll through history.
Click + to open a new tab. Each tab has its own history and working directory.
Visit my website: maythinkyi.vercel.app

maythinkyi@portfolio:~$ _
```

User types:

```text
h
```

Terminal displays completion hints:

```text
help    history
```

User presses Tab:

```text
maythinkyi@portfolio:~$ help
```

User presses Enter:

```text
maythinkyi@portfolio:~$ help

<help output>

maythinkyi@portfolio:~$ _
```

User enters:

```text
echo Hello MTK
```

Output:

```text
maythinkyi@portfolio:~$ echo Hello MTK
Hello MTK

maythinkyi@portfolio:~$ _
```

User enters:

```text
werwrwerer
```

Output:

```text
maythinkyi@portfolio:~$ werwrwerer
Unknown command: werwrwerer

maythinkyi@portfolio:~$ _
```

---

# 36. Important Implementation Constraints

The implementation must prioritize:

1. Terminal-like behavior.
2. Keyboard interaction.
3. Independent terminal sessions.
4. Clean command architecture.
5. Maintainable portfolio data.
6. Responsive design.
7. Visual polish.
8. Simple and understandable code.

Do not over-engineer the project.

Do not implement a real operating-system shell.

Do not attempt to execute real Linux commands.

This is a frontend terminal simulation for portfolio purposes.

---

# 37. Future Extensibility

The architecture should make it easy to add commands later, such as:

```text
pwd
cd
ls
cat
date
contact
resume
theme
sudo
matrix
```

Do not implement these unless explicitly requested.

The initial implementation should contain only the commands defined in this specification.

---

# 38. Definition of Done

The project is considered complete when:

* [ ] Dark blue Linux-style terminal UI is implemented.
* [ ] `terminal1` exists by default.
* [ ] `terminal1` cannot be closed.
* [ ] `+` creates additional terminals.
* [ ] New terminals automatically become active.
* [ ] Additional terminals have close buttons.
* [ ] Closing a terminal activates another valid terminal.
* [ ] Each terminal maintains independent history.
* [ ] Each terminal maintains independent working directory state.
* [ ] New terminals automatically display `help`.
* [ ] Welcome banner displays `MAY THIN KYI`.
* [ ] Help output matches the required content.
* [ ] Command input behaves like a terminal.
* [ ] Blinking cursor is implemented.
* [ ] Command autocomplete hints work.
* [ ] Tab completion works.
* [ ] ArrowUp history works.
* [ ] ArrowDown history works.
* [ ] `help` works.
* [ ] `about` works.
* [ ] `neofetch` works.
* [ ] `fastfetch` works.
* [ ] `github` works.
* [ ] `experience` works.
* [ ] `links` works.
* [ ] `history` works.
* [ ] `whoami` works.
* [ ] `echo` works.
* [ ] `clear` works.
* [ ] Unknown commands display the required error.
* [ ] GitHub/contact links are clickable.
* [ ] Portfolio data is separated from UI components.
* [ ] Terminal command logic is modular.
* [ ] Application is responsive.
* [ ] Keyboard navigation works.
* [ ] No unnecessary page reload occurs during terminal interaction.
* [ ] No console errors occur during normal usage.

---

# 39. Claude Code Implementation Instructions

Before writing implementation code:

1. Inspect the existing repository structure.
2. Identify the existing frontend framework and dependencies.
3. Reuse existing project conventions where appropriate.
4. Do not replace the framework or tooling unnecessarily.
5. Identify whether Tailwind CSS or another styling system already exists.
6. Build the terminal architecture according to this specification.
7. Keep portfolio content in a dedicated data module.
8. Keep terminal command execution modular.
9. Avoid putting the entire application inside one component.
10. Avoid unnecessary dependencies.

After implementation:

1. Run the project's existing linting.
2. Run the project's existing type checking.
3. Run the project's existing build command.
4. Fix all errors.
5. Verify terminal keyboard behavior.
6. Verify tab creation/closing.
7. Verify independent history between terminals.
8. Verify all supported commands.
9. Verify responsive behavior.
10. Do not consider the implementation complete until the project builds successfully.

If the repository does not yet contain an application, initialize the project using the simplest appropriate frontend setup consistent with the requirements.

Do not add features that are not specified here unless they are necessary to make the requested terminal behavior work correctly.
