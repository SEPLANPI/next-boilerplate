"use client"

import { SidebarConfig } from "@/types/sidebar"
import {
  Home,
} from "lucide-react"

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
      ],
    }
  ]
} as const
