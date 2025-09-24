"use client"

import { getUserUgs } from "@/api/get-user-ugs"
import { API } from "@/constants/messages"
import { asQuery } from "@/lib/api"
import {
  Alert,
  Combobox,
  Input,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function UoSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const { uoCode } = useParams<{ uoCode: string }>()
  const [value, setValue] = useState<string | null>(uoCode)

  useEffect(() => {
    setValue(uoCode)
  }, [uoCode])

  const {
    data: ugs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-ugs"],
    queryFn: asQuery(getUserUgs),
    staleTime: 30 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  if (error) {
    return (
      <Alert
        color="red"
        classNames={{
          title: "text-xs",
        }}
        title={error.message || API.UNEXPECTED_FETCH_ERROR}
      />
    )
  }

  const options =
    ugs?.map((ug) => (
      <Combobox.Option
        value={ug.codigo_unidade_orcamentaria.toString()}
        key={ug.codigo_unidade_orcamentaria}
      >
        <span className="flex min-w-0 flex-col  text-xs">
          <span className="text-content-emphasis font-semibold">
            {ug.sigla} -{" "}
            <span className="font-normal text-content">
              {ug.codigo_unidade_orcamentaria}
            </span>
          </span>
          <span className="min-w-0 truncate font-medium text-content">
            {ug.nome}
          </span>
        </span>
      </Combobox.Option>
    )) ?? []

  function getOptionLabel(value: string) {
    const ug = ugs?.find(
      (ug) => ug.codigo_unidade_orcamentaria.toString() === value,
    )
    if (!ug) return null
    return `${ug.sigla} - ${ug.codigo_unidade_orcamentaria}`
  }

  const handleOptionSubmit = (val: string) => {
    setValue(val)
    combobox.closeDropdown()

    const newPath = pathname.replace(new RegExp(`/${uoCode}(?=/|$)`), `/${val}`)
    router.push(newPath)
  }

  return (
    <Combobox
      position="bottom-start"
      width={280}
      store={combobox}
      onOptionSubmit={handleOptionSubmit}
    >
      <Combobox.Target>
        <InputBase
          size="md"
          component="button"
          type="button"
          pointer
          classNames={{
            input: "shadow-3",
          }}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          disabled={isLoading}
        >
          {value ? (
            <p className="truncate">{getOptionLabel(value)}</p>
          ) : (
            <Input.Placeholder>Selecionar UG</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <ScrollArea.Autosize type="scroll" mah={200}>
          <Combobox.Options>{options}</Combobox.Options>
        </ScrollArea.Autosize>
      </Combobox.Dropdown>
    </Combobox>
  )
}
