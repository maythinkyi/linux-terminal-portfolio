import type { Command } from '../types/terminal'
import { help } from './help'
import { about } from './about'
import { github } from './github'
import { neofetch } from './neofetch'
import { fastfetch } from './fastfetch'
import { experience } from './experience'
import { links } from './links'
import { history } from './history'
import { whoami } from './whoami'
import { echo } from './echo'
import { clear } from './clear'

export const commandRegistry: Record<string, Command> = {
  help,
  about,
  github,
  neofetch,
  fastfetch,
  experience,
  links,
  history,
  whoami,
  echo,
  clear,
}

export function getAllCommandNames(): string[] {
  return Object.keys(commandRegistry)
}

export function getCommand(name: string): Command | undefined {
  return commandRegistry[name.toLowerCase()]
}
