"use client"

import { SidebarConfig } from "@/types/sidebar"
import { Home, MessageCircleWarning } from "lucide-react"

export const sidebarConfig: SidebarConfig = {
  app: {
    name: "DITI",
    logos: {
      expanded: "",
      collapsed: "",
    },
  },
  sections: [
    {
      title: "Boilerplate",
      items: [
        {
          label: "Página Inicial",
          href: "/",
          icon: Home,
        },
        {
          label: "Sobre",
          href: "/about",
          icon: MessageCircleWarning,
        },
      ],
    },
  ],
} as const
