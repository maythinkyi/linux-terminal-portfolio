import type { Command, OutputBlock } from '../types/terminal'
import { portfolioData } from '../data/portfolio'

export const experience: Command = {
  name: 'experience',
  description: 'View experience',
  run: (): OutputBlock[] => {
    const { experience: expData } = portfolioData

    const blocks: OutputBlock[] = []

    expData.forEach((exp, idx) => {
      if (idx > 0) {
        blocks.push({
          lines: [{ kind: 'text', content: '' }],
        })
      }

      blocks.push({
        lines: [
          {
            kind: 'text',
            content: '────────────────────────────────────────',
          },
          { kind: 'heading', content: exp.position },
          { kind: 'text', content: exp.company },
          { kind: 'text', content: exp.duration },
          { kind: 'text', content: '' },
          { kind: 'text', content: `Description:` },
          { kind: 'text', content: exp.description },
          {
            kind: 'text',
            content: '────────────────────────────────────────',
          },
        ],
      })
    })

    return blocks
  },
}
