export type OutputKind = 'command' | 'text' | 'error' | 'link' | 'heading' | 'banner' | 'command-help'

export interface OutputLine {
  kind: OutputKind
  content: string
  href?: string
}

export interface OutputBlock {
  lines: OutputLine[]
}

export interface TerminalSession {
  id: string
  name: string
  commandHistory: string[]
  historyIndex: number
  currentDirectory: string
  output: OutputBlock[]
  inputValue: string
  initialized: boolean
}

export interface CommandContext {
  session: TerminalSession
  allTerminals?: TerminalSession[]
}

export interface Command {
  name: string
  aliases?: string[]
  description: string
  run: (args: string[], ctx: CommandContext) => OutputBlock[]
}
