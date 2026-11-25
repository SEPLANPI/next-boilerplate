"use client"

import Link from "next/link"

/**
 * O `Link` do Next como componente de cliente, para usar em `component={…}`
 * do Mantine dentro de Server Components (`<Button component={LinkCliente}>`).
 *
 * No Next 16, `next/link` importado num Server Component é uma função do
 * servidor e não pode ser passado como propriedade para um componente de
 * cliente ("Functions cannot be passed directly to Client Components").
 * Em componentes `"use client"`, continue usando `next/link`.
 */
export const LinkCliente = Link
