import { useReducer, useCallback } from 'react'
import type { TerminalSession, OutputBlock } from '../types/terminal'
import { parseCommand } from '../utils/commandParser'
import { getCommand } from '../commands'
import { help } from '../commands/help'

interface TerminalState {
  terminals: TerminalSession[]
  activeTerminalId: string
}

type Action =
  | { type: 'CREATE_TERMINAL' }
  | { type: 'CLOSE_TERMINAL'; terminalId: string }
  | { type: 'ACTIVATE_TERMINAL'; terminalId: string }
  | { type: 'SET_INPUT'; terminalId: string; value: string }
  | { type: 'NAVIGATE_HISTORY'; terminalId: string; direction: 'up' | 'down' }
  | { type: 'SUBMIT_COMMAND'; terminalId: string; input: string }
  | { type: 'CLEAR_OUTPUT'; terminalId: string }
  | { type: 'INITIALIZE_TERMINAL'; terminalId: string }

function generateTerminalId(): string {
  return `terminal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function getNextTerminalName(
  terminals: TerminalSession[]
): string {
  const numbers = terminals
    .map((t) => {
      const match = t.name.match(/^terminal(\d+)$/)
      return match ? parseInt(match[1]) : 0
    })
    .filter((n) => n > 0)

  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0
  return `terminal${maxNum + 1}`
}

function createEmptySession(name: string): TerminalSession {
  return {
    id: generateTerminalId(),
    name,
    commandHistory: [],
    historyIndex: -1,
    currentDirectory: '~',
    output: [],
    inputValue: '',
    initialized: false,
  }
}

function initialState(): TerminalState {
  const terminal1 = createEmptySession('terminal1')
  return {
    terminals: [terminal1],
    activeTerminalId: terminal1.id,
  }
}

function reducer(state: TerminalState, action: Action): TerminalState {
  switch (action.type) {
    case 'CREATE_TERMINAL': {
      const newName = getNextTerminalName(state.terminals)
      const newTerminal = createEmptySession(newName)
      return {
        terminals: [...state.terminals, newTerminal],
        activeTerminalId: newTerminal.id,
      }
    }

    case 'CLOSE_TERMINAL': {
      // Can't close terminal1
      const terminalToClose = state.terminals.find(
        (t) => t.id === action.terminalId
      )
      if (!terminalToClose || terminalToClose.name === 'terminal1') {
        return state
      }

      const newTerminals = state.terminals.filter(
        (t) => t.id !== action.terminalId
      )

      // If no terminals left, recreate terminal1
      if (newTerminals.length === 0) {
        const terminal1 = createEmptySession('terminal1')
        return {
          terminals: [terminal1],
          activeTerminalId: terminal1.id,
        }
      }

      // Find which terminal to activate
      let nextActiveId = state.activeTerminalId

      if (action.terminalId === state.activeTerminalId) {
        const closedIndex = state.terminals.findIndex(
          (t) => t.id === action.terminalId
        )

        // Try right neighbor
        if (closedIndex < state.terminals.length - 1) {
          nextActiveId = state.terminals[closedIndex + 1].id
        } else {
          // Fall back to left neighbor
          nextActiveId = state.terminals[closedIndex - 1].id
        }
      }

      return {
        terminals: newTerminals,
        activeTerminalId: nextActiveId,
      }
    }

    case 'ACTIVATE_TERMINAL': {
      return {
        ...state,
        activeTerminalId: action.terminalId,
      }
    }

    case 'SET_INPUT': {
      return {
        ...state,
        terminals: state.terminals.map((t) =>
          t.id === action.terminalId
            ? { ...t, inputValue: action.value }
            : t
        ),
      }
    }

    case 'NAVIGATE_HISTORY': {
      const terminal = state.terminals.find((t) => t.id === action.terminalId)
      if (!terminal || terminal.commandHistory.length === 0) {
        return state
      }

      let newIndex = terminal.historyIndex

      if (action.direction === 'up') {
        newIndex = Math.min(
          newIndex + 1,
          terminal.commandHistory.length - 1
        )
      } else {
        newIndex = Math.max(newIndex - 1, -1)
      }

      const newInputValue =
        newIndex === -1 ? '' : terminal.commandHistory[newIndex]

      return {
        ...state,
        terminals: state.terminals.map((t) =>
          t.id === action.terminalId
            ? { ...t, historyIndex: newIndex, inputValue: newInputValue }
            : t
        ),
      }
    }

    case 'SUBMIT_COMMAND': {
      const terminal = state.terminals.find((t) => t.id === action.terminalId)
      if (!terminal) return state

      const input = action.input.trim()

      // Add command to history
      const newHistory = [...terminal.commandHistory, input]
      const newOutput = [...terminal.output]

      // Render command line
      newOutput.push({
        lines: [
          {
            kind: 'command',
            content: `maythinkyi@portfolio:${terminal.currentDirectory}$ ${input}`,
          },
        ],
      })

      // Execute command
      if (input) {
        const { command, args } = parseCommand(input)
        const cmd = getCommand(command)

        if (cmd) {
          if (cmd.name === 'clear') {
            // Special case: clear command
            return {
              ...state,
              terminals: state.terminals.map((t) =>
                t.id === action.terminalId
                  ? {
                      ...t,
                      commandHistory: newHistory,
                      historyIndex: -1,
                      inputValue: '',
                      output: [],
                    }
                  : t
              ),
            }
          }

          const output = cmd.run(args, { session: terminal })
          newOutput.push(...output)
        } else {
          // Unknown command
          newOutput.push({
            lines: [
              {
                kind: 'error',
                content: `Unknown command: ${command}`,
              },
            ],
          })
        }
      }

      return {
        ...state,
        terminals: state.terminals.map((t) =>
          t.id === action.terminalId
            ? {
                ...t,
                commandHistory: newHistory,
                historyIndex: -1,
                inputValue: '',
                output: newOutput,
              }
            : t
        ),
      }
    }

    case 'CLEAR_OUTPUT': {
      return {
        ...state,
        terminals: state.terminals.map((t) =>
          t.id === action.terminalId
            ? { ...t, output: [] }
            : t
        ),
      }
    }

    case 'INITIALIZE_TERMINAL': {
      const terminal = state.terminals.find((t) => t.id === action.terminalId)
      if (!terminal || terminal.initialized) return state

      // Auto-run help
      const helpOutput = help.run([], { session: terminal })
      const newOutput: OutputBlock[] = [
        {
          lines: [
            {
              kind: 'command',
              content: `maythinkyi@portfolio:${terminal.currentDirectory}$ help`,
            },
          ],
        },
        ...helpOutput,
      ]

      return {
        ...state,
        terminals: state.terminals.map((t) =>
          t.id === action.terminalId
            ? {
                ...t,
                initialized: true,
                commandHistory: ['help'],
                output: newOutput,
              }
            : t
        ),
      }
    }

    default:
      return state
  }
}

export function useTerminalSessions() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  const createTerminal = useCallback(() => {
    dispatch({ type: 'CREATE_TERMINAL' })
  }, [])

  const closeTerminal = useCallback((terminalId: string) => {
    dispatch({ type: 'CLOSE_TERMINAL', terminalId })
  }, [])

  const activateTerminal = useCallback((terminalId: string) => {
    dispatch({ type: 'ACTIVATE_TERMINAL', terminalId })
  }, [])

  const setInputValue = useCallback((terminalId: string, value: string) => {
    dispatch({ type: 'SET_INPUT', terminalId, value })
  }, [])

  const navigateHistory = useCallback(
    (terminalId: string, direction: 'up' | 'down') => {
      dispatch({ type: 'NAVIGATE_HISTORY', terminalId, direction })
    },
    []
  )

  const submitCommand = useCallback((terminalId: string, input: string) => {
    dispatch({ type: 'SUBMIT_COMMAND', terminalId, input })
  }, [])

  const clearOutput = useCallback((terminalId: string) => {
    dispatch({ type: 'CLEAR_OUTPUT', terminalId })
  }, [])

  const initializeTerminal = useCallback((terminalId: string) => {
    dispatch({ type: 'INITIALIZE_TERMINAL', terminalId })
  }, [])

  return {
    terminals: state.terminals,
    activeTerminalId: state.activeTerminalId,
    createTerminal,
    closeTerminal,
    activateTerminal,
    setInputValue,
    navigateHistory,
    submitCommand,
    clearOutput,
    initializeTerminal,
  }
}
