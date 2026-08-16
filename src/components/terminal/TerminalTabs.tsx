import type { TerminalSession } from '../../types/terminal'

interface TerminalTabsProps {
  terminals: TerminalSession[]
  activeTerminalId: string
  onTabClick: (terminalId: string) => void
  onTabClose: (terminalId: string) => void
  onCreateTab: () => void
}

export function TerminalTabs({
  terminals,
  activeTerminalId,
  onTabClick,
  onTabClose,
  onCreateTab,
}: TerminalTabsProps) {
  return (
    <div className="border-b border-blue-900 bg-[#1a1b26] flex items-center sticky top-0 inset-x-0">
      {terminals.map((terminal) => {
        const isActive = terminal.id === activeTerminalId
        const canClose = terminal.name !== 'terminal1'

        return (
          <div
            key={terminal.id}
            className={`flex items-center gap-3 px-4 py-3 border-r border-blue-900 cursor-pointer whitespace-nowrap font-mono text-sm transition-colors ${
              isActive
                ? 'bg-blue-900 text-white'
                : 'bg-[#1a1b26] text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => onTabClick(terminal.id)}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
          >
            <span>{terminal.name}</span>
            {canClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onTabClose(terminal.id)
                }}
                className="text-gray-400 hover:text-red-400 font-bold transition-colors"
                aria-label={`Close ${terminal.name}`}
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        )
      })}
      <button
        onClick={onCreateTab}
        className="px-3 py-3 text-gray-400 hover:text-white font-mono text-sm transition-colors"
        aria-label="New terminal"
        type="button"
      >
        +
      </button>
    </div>
  )
}
