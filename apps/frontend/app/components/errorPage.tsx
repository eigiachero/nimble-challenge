import { isEmpty } from 'lodash-es'
import { PackageX } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'
import { Link } from 'react-router'

interface ErrorPageWarningProps {
  title: string
  message: string
  className?: string
  stack?: string
}

export default function ErrorPageWarning ({ title,  message, className, stack }: ErrorPageWarningProps) {
  return (
    <div className={cn('flex flex-col mx-auto my-16 max-w-md lg:max-w-2xl items-center justify-center p-8 bg-white text-center', className)} >
      <PackageX className="w-16 h-16 text-[#DA0000] mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
      {!isEmpty(stack) && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded-md mt-6 max-h-[300px] text-left">
          <code className="text-red-600">{stack}</code>
        </pre>
      )}
      <Button asChild  className='mt-4'>
        <Link to="/">Ir al inicio</Link>
      </Button>
    </div>
  )
}
