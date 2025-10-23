import { cn } from '~/lib/utils'

export function FieldError ({ message, className }: { message?: string, className?: string }) {
  if (!message) return null

  return <p className={cn('text-red-500 text-sm', className)}>{message}</p>
}

