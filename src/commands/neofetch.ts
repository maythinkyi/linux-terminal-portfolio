import type { Command, OutputBlock } from '../types/terminal'
import { portfolioData } from '../data/portfolio'

export const neofetch: Command = {
  name: 'neofetch',
  description: 'View about Github profile (neofetch style)',
  run: (): OutputBlock[] => {
    const { profile, github: githubData, skills } = portfolioData

    return [
      {
        lines: [
          { kind: 'text', content: '        _' },
          { kind: 'text', content: '       (_)' },
          { kind: 'text', content: '  _ __  _ _ __  __ _' },
          { kind: 'text', content: ' | \'_ \\| | \'_ \\/ _` |' },
          { kind: 'text', content: ' | | | | | | | | (_| |' },
          { kind: 'text', content: ' |_| |_|_|_| |_|\\__, |' },
          { kind: 'text', content: '                |___/' },
        ],
      },
      {
        lines: [
          { kind: 'heading', content: `User: ${profile.name}` },
          {
            kind: 'link',
            content: `GitHub: https://github.com/${githubData.username}`,
            href: githubData.url,
          },
          {
            kind: 'text',
            content: `Languages: ${skills.frontend.join(', ')}`,
          },
          {
            kind: 'text',
            content: `Frameworks: ${skills.backend.join(', ')}`,
          },
        ],
      },
    ]
  },
}
