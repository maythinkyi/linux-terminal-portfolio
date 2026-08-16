import type { TerminalSession } from '../../types/terminal'

interface TerminalPromptProps {
  session: TerminalSession
}

export function TerminalPrompt({ session }: TerminalPromptProps) {
  return (
    <span className="text-emerald-400">
      maythinkyi@portfolio:{session.currentDirectory}$
    </span>
  )
}
