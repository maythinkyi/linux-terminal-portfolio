import { useEffect, useRef } from 'react'
import type { TerminalSession } from '../../types/terminal'
import { TerminalPrompt } from './TerminalPrompt'
import { CommandHints } from './CommandHints'
import { findMatchingCommands, getAllCommandNames } from '../../utils/commandParser'

interface TerminalInputProps {
  session: TerminalSession
  onSubmit: (input: string) => void
  onInputChange: (value: string) => void
  onHistoryNavigate: (direction: 'up' | 'down') => void
  onClear: () => void
}

export function TerminalInput({
  session,
  onSubmit,
  onInputChange,
  onHistoryNavigate,
  onClear,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [session.id])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(session.inputValue)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onHistoryNavigate('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onHistoryNavigate('down')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const trimmed = session.inputValue.trim()
      const matches = findMatchingCommands(
        trimmed,
        getAllCommandNames()
      )

      if (matches.length === 1) {
        onInputChange(matches[0])
      }
      // If multiple matches or no matches, do nothing (no-op behavior)
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      onClear()
      onSubmit('clear')
    }
  }

  return (
    <div>
      <div className="flex gap-2 items-baseline font-mono text-sm">
        <TerminalPrompt session={session} />
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={session.inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 bg-transparent text-transparent outline-none caret-transparent w-full"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="text-white whitespace-pre-wrap break-words">
            {session.inputValue}
            <span
              ref={cursorRef}
              className="cursor-blink inline-block w-2 h-5 bg-white"
              style={{ marginLeft: '2px', marginBottom: '-2px', display: 'inline-block', verticalAlign: 'baseline' }}
            />
          </span>
        </div>
      </div>
      <CommandHints input={session.inputValue} />
    </div>
  )
}
