import type { Command, OutputBlock } from '../types/terminal'
import { portfolioData } from '../data/portfolio'

export const links: Command = {
  name: 'links',
  description: 'View contact info and links',
  run: (): OutputBlock[] => {
    const { links: linksData } = portfolioData

    return [
      {
        lines: [
          {
            kind: 'link',
            content: `GitHub :    ${linksData.github}`,
            href: linksData.github,
          },
          {
            kind: 'link',
            content: `LinkedIn :  ${linksData.linkedin}`,
            href: linksData.linkedin,
          },
          {
            kind: 'link',
            content: `Email :     ${linksData.email.join(', ')}`,
            href: `mailto:${linksData.email[0]}`,
          },
        ],
      },
    ]
  },
}
