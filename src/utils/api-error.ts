export const parseApiErrors = (errorData: any): string => {
  try {
    if (Array.isArray(errorData)) {
      return errorData
        .map((item) => {
          if (typeof item === "object") {
            return Object.values(item.error || {})
              .flat()
              .join("\n")
          }
          return String(item)
        })
        .join("\n")
    }

    if (typeof errorData === "object") {
      return Object.values(errorData).flat().join("\n")
    }

    return String(errorData)
  } catch (err) {
    return "Erro desconhecido ao processar resposta."
  }
}
