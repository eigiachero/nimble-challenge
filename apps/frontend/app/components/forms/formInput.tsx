import { ClassValue } from 'clsx'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'

interface FormInputProps extends React.ComponentProps<'input'> {
  label: string
  name: string
  direction?: 'row' | 'col'
  required?: boolean
  labelClassName?: ClassValue
  containerClassName?: ClassValue
}

export function FormInput ({ label, name, className, direction = 'row', required = false, labelClassName, containerClassName, ...params }: FormInputProps) {
  return (
    <div className={cn('w-full', direction === 'row' ? 'grid grid-cols-4 items-center' : 'flex flex-col gap-1', containerClassName)}>
      <Label htmlFor={name} className={cn('text-right', labelClassName)} hidden={params?.hidden}>
        {label}
        {required && <span className="text-sm -ml-1.5 text-red-500">*</span>}
      </Label>
      <Input id={name} name={name} className={cn(direction === 'row' && 'col-span-3', className)} required={required} {...params} />
    </div>
  )
}
