import { PropsWithChildren } from "react";

export function Label({ children }:  PropsWithChildren) {
  return (
    <label className="text-sm font-medium text-content">
      {children}
    </label>
  )
}