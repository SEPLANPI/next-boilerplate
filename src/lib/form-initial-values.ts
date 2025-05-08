import { z } from 'zod'

export type InitialFormValues<T extends z.ZodType> = {
  [K in keyof z.infer<T>]: z.infer<T>[K] extends string | number
    ? string
    : z.infer<T>[K] extends boolean
      ? boolean
      : z.infer<T>[K] extends Array<any>
        ? []
        : z.infer<T>[K] extends File | null
          ? File | null
          : z.infer<T>[K] extends Date | null
            ? Date | null
            : z.infer<T>[K] extends object
              ? InitialFormValues<z.ZodType<z.infer<T>[K]>> | null
              : string | null
}

export function createInitialFormValues<T extends z.ZodType>(
  schema: T
): InitialFormValues<T> {
  // Handle primitive types
  if (
    schema instanceof z.ZodString ||
    schema instanceof z.ZodNumber ||
    schema instanceof z.ZodEnum
  ) {
    return '' as any
  }

  if (schema instanceof z.ZodArray) {
    return [] as any
  }

  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return null as any
  }

  if (schema instanceof z.ZodBoolean) {
    return false as any
  }

  if (schema instanceof z.ZodUnion) {
    const [firstOption] = schema.options
    return createInitialFormValues(firstOption)
  }

  if (schema instanceof z.ZodEffects) {
    return createInitialFormValues(schema.innerType())
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const initial: any = {}

    for (const [key, value] of Object.entries(shape)) {
      initial[key] = createInitialFormValues(value as z.ZodType)
    }

    return initial
  }

  return null as any
}
