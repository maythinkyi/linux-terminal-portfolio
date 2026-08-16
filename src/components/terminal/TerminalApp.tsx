import { useEffect } from 'react'
import { useTerminalSessions } from '../../hooks/useTerminalSessions'
import { TerminalTabs } from './TerminalTabs'
import { TerminalWindow } from './TerminalWindow'

export function TerminalApp() {
  const {
    terminals,
    activeTerminalId,
    createTerminal,
    closeTerminal,
    activateTerminal,
    setInputValue,
    navigateHistory,
    submitCommand,
    clearOutput,
    initializeTerminal,
  } = useTerminalSessions()

  const activeTerminal = terminals.find((t) => t.id === activeTerminalId)

  // Initialize terminal on first render or when activating
  useEffect(() => {
    if (activeTerminal && !activeTerminal.initialized) {
      initializeTerminal(activeTerminal.id)
    }
  }, [activeTerminal, initializeTerminal])

  const handleSubmitCommand = (input: string) => {
    if (activeTerminal) {
      submitCommand(activeTerminal.id, input)
    }
  }

  const handleInputChange = (value: string) => {
    if (activeTerminal) {
      setInputValue(activeTerminal.id, value)
    }
  }

  const handleHistoryNavigate = (direction: 'up' | 'down') => {
    if (activeTerminal) {
      navigateHistory(activeTerminal.id, direction)
    }
  }

  const handleClear = () => {
    if (activeTerminal) {
      clearOutput(activeTerminal.id)
    }
  }

  return (
    <div className="min-h-screen max-h-max bg-[#1a1b26] flex flex-col text-gray-300 font-mono">
      <TerminalTabs
        terminals={terminals}
        activeTerminalId={activeTerminalId}
        onTabClick={activateTerminal}
        onTabClose={closeTerminal}
        onCreateTab={createTerminal}
      />
      {activeTerminal && (
        <TerminalWindow
          session={activeTerminal}
          onSubmitCommand={handleSubmitCommand}
          onInputChange={handleInputChange}
          onHistoryNavigate={handleHistoryNavigate}
          onClear={handleClear}
        />
      )}
    </div>
  )
}
