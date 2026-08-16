import type { Command, OutputBlock } from '../types/terminal'
import { portfolioData } from '../data/portfolio'

export const github: Command = {
  name: 'github',
  description: 'View about Github profile',
  run: (): OutputBlock[] => {
    const { github: githubData } = portfolioData

    return [
      {
        lines: [
          { kind: 'heading', content: 'GitHub' },
          {
            kind: 'link',
            content: `https://github.com/${githubData.username}`,
            href: githubData.url,
          },
        ],
      },
    ]
  },
}
