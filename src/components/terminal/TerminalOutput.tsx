import { useEffect, useRef } from 'react'
import type { OutputBlock } from '../../types/terminal'

interface TerminalOutputProps {
  output: OutputBlock[]
}

export function TerminalOutput({ output }: TerminalOutputProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [output])

  const getLineColor = (kind: string) => {
    switch (kind) {
      case 'command':
        return 'text-white'
      case 'error':
        return 'text-red-400'
      case 'link':
        return 'text-cyan-400 hover:underline cursor-pointer'
      case 'heading':
        return 'text-yellow-300 font-bold'
      case 'banner':
        return 'text-cyan-300'
      case 'command-help':
        return 'text-gray-300'
      case 'text':
      default:
        return 'text-gray-300'
    }
  }

  return (
    <div className="flex-1 pb-4 font-mono text-sm leading-relaxed">
      {output.map((block, blockIdx) => {
  const isBanner = block.lines.every((line) => line.kind === 'banner')

  return (
    <div
      key={blockIdx}
      className={isBanner ? 'overflow-x-auto' : ''}
    >
      {block.lines.map((line, lineIdx) => (
        <div
          key={`${blockIdx}-${lineIdx}`}
          className={`${
            line.kind === 'banner'
              ? 'whitespace-pre'
              : 'whitespace-pre-wrap break-words'
          } ${getLineColor(line.kind)}`}
        >
          {line.content}
        </div>
      ))}
    </div>
  )
})}
      <div ref={endRef} />
    </div>
  )
}
