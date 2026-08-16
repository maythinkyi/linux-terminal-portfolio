import type { Command, OutputBlock } from '../types/terminal'
import { portfolioData } from '../data/portfolio'

export const about: Command = {
  name: 'about',
  description: 'View about me',
  run: (): OutputBlock[] => {
    const { profile, skills, education } = portfolioData

    const blocks: OutputBlock[] = []

    blocks.push({
      lines: [{ kind: 'heading', content: `Name: ${profile.name}` }],
    })

    blocks.push({
      lines: [{ kind: 'text', content: profile.bio }],
    })

    blocks.push({
      lines: [
        { kind: 'heading', content: 'Skills' },
        {
          kind: 'text',
          content: '────────────────────────────────────────',
        },
      ],
    })

    blocks.push({
      lines: [
        { kind: 'text', content: '' },
        { kind: 'text', content: 'Programming Languages' },
        ...skills.programming.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
        { kind: 'text', content: '' },
        { kind: 'text', content: 'Frontend' },
        ...skills.frontend.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
        { kind: 'text', content: '' },
        { kind: 'text', content: 'Backend' },
        ...skills.backend.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
        { kind: 'text', content: '' },
        { kind: 'text', content: 'Databases' },
        ...skills.database.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
        { kind: 'text', content: '' },
        { kind: 'text', content: 'DevOps / Tools' },
        ...skills.devops.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
         { kind: 'text', content: '' },
        { kind: 'text', content: 'Real-Time and Messaging System' },
        ...skills.others.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
        { kind: 'text', content: '' },
        { kind: 'text', content: 'Operating Systems' },
        ...skills.os.map((skill) => ({
          kind: 'text' as const,
          content: `  ${skill}`,
        })),
      ],
    })

    if (education.length > 0) {
      blocks.push({
        lines: [
          { kind: 'text', content: '' },
          { kind: 'heading', content: 'Education' },
          {
            kind: 'text',
            content: '────────────────────────────────────────',
          },
        ],
      })

      education.forEach((edu) => {
        blocks.push({
          lines: [
            { kind: 'text', content: '' },
            { kind: 'text', content: edu.school },
            { kind: 'text', content: `${edu.degree} in ${edu.field}` },
            { kind: 'text', content: edu.year },
          ],
        })
      })
    }

    return blocks
  },
}
