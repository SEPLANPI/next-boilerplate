export function OptionalInputLabel({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      {children}
      <span className="font-normal text-content-muted">Opcional</span>
    </div>
  )
}
