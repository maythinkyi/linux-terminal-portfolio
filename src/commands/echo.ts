import type { Command, OutputBlock } from '../types/terminal'

export const echo: Command = {
  name: 'echo',
  description: 'Echo the input',
  run: (args): OutputBlock[] => {
    const output = args.join(' ')
    return [
      {
        lines: [{ kind: 'text', content: output }],
      },
    ]
  },
}
