import { ConselheiroLayout } from '@/components/layouts/conselheiro-layout'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <ConselheiroLayout>{children}</ConselheiroLayout>
}
