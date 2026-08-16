import type { TerminalSession } from '../../types/terminal'
import { TerminalOutput } from './TerminalOutput'
import { TerminalInput } from './TerminalInput'

interface TerminalWindowProps {
  session: TerminalSession
  onSubmitCommand: (input: string) => void
  onInputChange: (value: string) => void
  onHistoryNavigate: (direction: 'up' | 'down') => void
  onClear: () => void
}

export function TerminalWindow({
  session,
  onSubmitCommand,
  onInputChange,
  onHistoryNavigate,
  onClear,
}: TerminalWindowProps) {
  return (
    <div
      className="flex flex-col h-full bg-[#1a1b26] text-gray-300 p-4 font-mono"
      onClick={() => document.querySelector('input')?.focus()}
    >
      <TerminalOutput output={session.output} />
      <TerminalInput
        session={session}
        onSubmit={onSubmitCommand}
        onInputChange={onInputChange}
        onHistoryNavigate={onHistoryNavigate}
        onClear={onClear}
      />
    </div>
  )
}
