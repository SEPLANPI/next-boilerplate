export const parseApiErrors = (errorData: unknown): string => {
  try {
    if (Array.isArray(errorData)) {
      return errorData
        .map((item) => {
          if (typeof item === "object") {
            // null cai no catch, como antes
            return Object.values((item as { error?: object }).error || {})
              .flat()
              .join("\n")
          }
          return String(item)
        })
        .join("\n")
    }

    if (typeof errorData === "object") {
      return Object.values(errorData as object).flat().join("\n")
    }

    return String(errorData)
  } catch {
    return "Erro desconhecido ao processar resposta."
  }
}
