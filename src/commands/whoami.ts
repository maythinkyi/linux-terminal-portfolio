import type { Command, OutputBlock } from '../types/terminal'

export const whoami: Command = {
  name: 'whoami',
  description: 'View current username',
  run: (): OutputBlock[] => {
    return [
      {
        lines: [{ kind: 'text', content: 'maythinkyi' }],
      },
    ]
  },
}
