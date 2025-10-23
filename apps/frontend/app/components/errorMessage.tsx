import { isEmpty } from 'lodash-es'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

function ErrorMessage ({ message = '', onClose }: { message?: string; onClose?: () => void }) {
  const [show, setShow] = useState(true)

  if (!show || isEmpty(message)) {
    return null
  }

  return (
    <div className="flex flex-row mx-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded min-w-xs items-center" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline p-2 whitespace-pre-wrap font-arial">{message}</span>
      <div className="ml-auto">
        <Button onClick={() => {setShow(false); onClose?.()}} variant={'ghost'} size={'icon'} className="hover:bg-red-300">
          <X />
        </Button>
      </div>
    </div>
  )
}

export default ErrorMessage