import type { Command, OutputBlock } from '../types/terminal'

export const clear: Command = {
  name: 'clear',
  description: 'Clear screen',
  run: (): OutputBlock[] => {
    // Return empty array - the reducer handles clearing output
    return []
  },
}
