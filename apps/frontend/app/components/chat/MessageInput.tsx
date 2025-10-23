import { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useFetcher } from 'react-router'
import { isEmpty } from 'lodash-es'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const fetcher = useFetcher()
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedMessage = newMessage.trim()
    if (isEmpty(trimmedMessage) || disabled) return
    onSendMessage(newMessage.trim())
    setNewMessage('')
    fetcher.submit({ message: trimmedMessage }, { method: 'POST' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
      <fetcher.Form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-h-[40px] max-h-32 resize-none"
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <Button
          type="submit"
          disabled={!newMessage.trim() || disabled}
          className="shrink-0"
        >
          <span>Send</span>
        </Button>
      </fetcher.Form>
    </div>
  )
}

export default MessageInput
