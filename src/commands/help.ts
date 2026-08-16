import type { Command, OutputBlock } from '../types/terminal'

export const help: Command = {
  name: 'help',
  description: 'View this help section',
  run: (): OutputBlock[] => {
    return [
    {
  lines: [
    { kind: 'banner', content: '███      ███   █████  ██    ██     ████████ ██   ██ ██ ███     ██     ██   ██  ██    ██  ██ ' },
    { kind: 'banner', content: '████    ████  ██   ██  ██  ██         ██    ██   ██ ██ ████    ██     ██  ██    ██  ██   ██ ' },
    { kind: 'banner', content: '██  ████  ██  ███████   ████          ██    ███████ ██ ██  ██  ██     █████      ████    ██ ' },
    { kind: 'banner', content: '██   ██   ██  ██   ██    ██           ██    ██   ██ ██ ██   ██ ██     ██  ██      ██     ██ ' },
    { kind: 'banner', content: '██        ██  ██   ██    ██           ██    ██   ██ ██ ██    ████     ██   ██     ██     ██ ' },
    { kind: 'banner', content: '                                                                                     ' },
  ],
},
      {
        lines: [
          {
            kind: 'text',
            content: 'Hello, welcome to MTK Terminal. Type one of these commands -',
          },
        ],
      },
      {
        lines: [
          { kind: 'command-help', content: 'about - View about me' },
          {
            kind: 'command-help',
            content: 'neofetch / fastfetch / github - View about Github profile',
          },
          { kind: 'command-help', content: 'experience - View experience' },
          { kind: 'command-help', content: 'links - View contact info and links' },
          { kind: 'command-help', content: 'help - View this help section' },
          { kind: 'command-help', content: 'history - View command history' },
          { kind: 'command-help', content: 'whoami - View current username' },
          { kind: 'command-help', content: 'echo - Echo the input' },
          { kind: 'command-help', content: 'clear - Clear screen' },
        ],
      },
      {
        lines: [
          {
            kind: 'text',
            content: 'You can use arrow keys to scroll through history.',
          },
          {
            kind: 'text',
            content:
              'Click + to open a new tab. Each tab has its own history and working directory.',
          },
          {
            kind: 'link',
            content: 'Visit my website: maythinkyi.vercel.app',
            href: 'https://maythinkyi.vercel.app',
          },
        ],
      },
    ]
  },
}
