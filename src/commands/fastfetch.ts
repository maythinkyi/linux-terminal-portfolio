import type { Command, OutputBlock } from '../types/terminal'
import { portfolioData } from '../data/portfolio'

export const fastfetch: Command = {
  name: 'fastfetch',
  description: 'View about Github profile (fastfetch style)',
  run: (): OutputBlock[] => {
    const { profile, github: githubData } = portfolioData

    return [
      {
        lines: [
          { kind: 'text', content: '  ___  _    ___  _____' },
          { kind: 'text', content: ' / _ \\| |  / _ \\|  ___|' },
          { kind: 'text', content: '| |_| | | | (_) | |_' },
          { kind: 'text', content: ' \\__  | |  \\__  |  _|' },
          { kind: 'text', content: '    | | |___   | | |' },
          { kind: 'text', content: '    |_|_____|  |_|_|' },
        ],
      },
      {
        lines: [
          { kind: 'heading', content: `Developer: ${profile.name}` },
          {
            kind: 'link',
            content: `Profile: https://github.com/${githubData.username}`,
            href: githubData.url,
          },
          { kind: 'text', content: `Title: ${profile.title}` },
          { kind: 'text', content: `Website: ${profile.website}` },
        ],
      },
    ]
  },
}
