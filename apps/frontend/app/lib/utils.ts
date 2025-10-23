import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodObject } from 'zod'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateWithSchema<T extends Record<string, any>> (
  schema: ZodObject<any>,
  values: T
): Record<string, string> {
  const parseResult = schema.safeParse(values)

  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {}
    parseResult.error.issues.forEach((err) => {
      const field = err.path[0]?.toString() || 'form'
      fieldErrors[field] = err.message
    })

    return fieldErrors
  }

  return {}
}
