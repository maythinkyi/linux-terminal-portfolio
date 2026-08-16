import type { Command, OutputBlock } from '../types/terminal'

export const history: Command = {
  name: 'history',
  description: 'View command history',
  run: (_, ctx): OutputBlock[] => {
    const { session } = ctx
    const historyLines = session.commandHistory.map((cmd, idx) => ({
      kind: 'text' as const,
      content: `${idx + 1} ${cmd}`,
    }))

    if (historyLines.length === 0) {
      return [
        {
          lines: [{ kind: 'text', content: 'No commands in history' }],
        },
      ]
    }

    return [
      {
        lines: historyLines,
      },
    ]
  },
}
