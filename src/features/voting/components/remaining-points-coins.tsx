'use client'

import Image from 'next/image'

interface RemainingPointsCoinsProps {
  remainingPoints: number
}

export function RemainingPointsCoins({
  remainingPoints
}: RemainingPointsCoinsProps) {
  const getCoinVisibility = (points: number, remainingPoints: number) => {
    if (remainingPoints > 75) return points === 100 ? 'block' : 'hidden'
    if (remainingPoints > 50) return points === 75 ? 'block' : 'hidden'
    if (remainingPoints > 25) return points === 50 ? 'block' : 'hidden'
    if (remainingPoints > 0) return points === 25 ? 'block' : 'hidden'
    return points === 0 ? 'block' : 'hidden'
  }

  return (
    <div className="flex flex-col items-center space-y-1">
      <div>
        {[100, 75, 50, 25, 0].map((points) => (
          <Image
            key={points}
            src={`/votacao/moedas-${points}.png`}
            width={464}
            height={180}
            alt={`${points} moedas`}
            className={`w-[232px] ${getCoinVisibility(points, remainingPoints)}`}
            priority
          />
        ))}
      </div>
      <div>
        <span className="text-sm">Pontos restantes: </span>
        <span className="font-bold text-green-700">{remainingPoints}</span>
      </div>
    </div>
  )
}
