import React from 'react'

interface AxisCardProps {
  children: React.ReactNode
  className?: string
}

function AxisCard({ children, className = '' }: AxisCardProps) {
  return (
    <div className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  linkUrl?: string
  onLinkClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function CardHeader({
  children,
  className = '',
  linkUrl = '',
  onLinkClick
}: CardHeaderProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onLinkClick) {
      onLinkClick(e)
    }

    if (linkUrl && !e.defaultPrevented) {
      window.open(linkUrl, '_blank')
    }
  }

  return (
    <header className={`mb-6 flex items-center gap-2 ${className}`}>
      {children}
      {(linkUrl || onLinkClick) && (
        <button
          onClick={handleClick}
          className="ml-auto rounded-full p-2 hover:bg-gray-100"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M7 7h10v10"></path>
          </svg>
        </button>
      )}
    </header>
  )
}
AxisCard.Header = CardHeader

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3
      className={`text-md font-semibold text-secondary-foreground ${className}`}
    >
      {children}
    </h3>
  )
}
AxisCard.Title = CardTitle

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`flex justify-between space-x-2 ${className}`}>
      {children}
    </div>
  )
}
AxisCard.Body = CardBody

interface CardMetricProps {
  label: string
  value: string | number
  className?: string
}

function CardMetric({ label, value, className = '' }: CardMetricProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xs text-secondary-foreground">{label}</span>
      <span className="font-montserrat text-3xl font-semibold">{value}</span>
    </div>
  )
}
AxisCard.Metric = CardMetric

interface CardBadgeGroupProps {
  label?: string
  children: React.ReactNode
  className?: string
}

function CardBadgeGroup({
  label,
  children,
  className = ''
}: CardBadgeGroupProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <span className="text-xs text-secondary-foreground">{label}</span>
      )}
      {children}
    </div>
  )
}
AxisCard.BadgeGroup = CardBadgeGroup

export { AxisCard }
