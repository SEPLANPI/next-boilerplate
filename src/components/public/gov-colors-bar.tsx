import React from 'react'

export type GovColor = 'yellow' | 'green' | 'red' | 'blue'

export interface GovColorsBarProps {
  colors?: GovColor[]
}

const colorToBgClass: Record<GovColor, string> = {
  yellow: 'bg-govYellow',
  red: 'bg-govRed',
  green: 'bg-govGreen',
  blue: 'bg-govBlue'
}

export function GovColorsBar({
  colors = ['yellow', 'red', 'green']
}: GovColorsBarProps) {
  return (
    <div className="flex h-5 items-stretch *:flex-grow">
      {colors.map((color) => (
        <span key={color} className={colorToBgClass[color]} />
      ))}
    </div>
  )
}
