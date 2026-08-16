import { findMatchingCommands, getAllCommandNames } from '../../utils/commandParser'

interface CommandHintsProps {
  input: string
}

export function CommandHints({ input }: CommandHintsProps) {
  const trimmedInput = input.trim()
  if (!trimmedInput) return null

  const matches = findMatchingCommands(
    trimmedInput,
    getAllCommandNames()
  )

  if (matches.length === 0) return null

  return (
    <div className="mt-1 flex gap-4 font-mono text-sm text-gray-400">
      {matches.map((match: string) => (
        <span key={match}>{match}</span>
      ))}
    </div>
  )
}
