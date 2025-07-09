// components/DesignTokenTable.tsx
import React from 'react'

interface TokenData {
  name: string
  value: string
  description?: string
  example?: React.ReactNode
}

interface DesignTokenTableProps {
  title: string
  tokens: TokenData[]
  showExample?: boolean
}

export const DesignTokenTable: React.FC<DesignTokenTableProps> = ({
  tokens,
  showExample = false
}) => {
  return (
    <table className="!m-0 min-w-full">
      <thead>
        <tr>
          <th className="text-left">Token</th>
          <th className="text-left">Value</th>
          {showExample && <th className="text-left">Example</th>}
          <th className="text-left">Description</th>
        </tr>
      </thead>
      <tbody className="">
        {tokens.map((token) => (
          <tr key={token.name}>
            <td className="whitespace-nowrap">
              <code className="rounded bg-pink-50 px-2 py-1 font-mono text-sm text-pink-600">
                {token.name}
              </code>
            </td>
            <td className="whitespace-nowrap">
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-900">
                {token.value}
              </code>
            </td>
            {showExample && (
              <td className="whitespace-nowrap">{token.example}</td>
            )}
            <td className="px-6 py-4 text-sm text-gray-700">
              {token.description || '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
