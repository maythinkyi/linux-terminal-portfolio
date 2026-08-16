import { commandRegistry } from '../commands'

export interface ParsedCommand {
  command: string
  args: string[]
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim()
  const parts = trimmed.split(/\s+/)
  const [command, ...args] = parts

  return {
    command: command.toLowerCase(),
    args,
  }
}

export function getAllCommandNames(): string[] {
  return Object.keys(commandRegistry)
}

export function findMatchingCommands(
  input: string,
  registryKeys: string[]
): string[] {
  const prefix = input.toLowerCase().trim()
  if (!prefix) return registryKeys

  return registryKeys.filter((key) => key.startsWith(prefix))
}
