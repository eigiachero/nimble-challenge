import { isEmpty } from 'lodash-es'
import { redirect } from 'react-router'
import MessageInput from '~/components/chat/MessageInput'
import MessageList from '~/components/chat/MessageList'
import UserPanel from '~/components/chat/UserPanel'
import { getAuthCookie } from '~/cookie.server'
import { Route } from './+types'
import { messageService } from '~/api/message.service'

export async function loader ({ request }: Route.LoaderArgs) {
  const cookie = await getAuthCookie(request)

  if (isEmpty(cookie)) {
    return redirect('/home')
  }

  const userId = Number(cookie.userId)
  const messages = await messageService.getMessages(cookie)
  const initialMessages = messages.map(message => ({
    ...message,
    isOwn: message.userId === userId
  }))

  return { initialMessages, userId }
}

export async function action ({ request }: Route.ActionArgs) {
  const cookie = await getAuthCookie(request)
  const form = await request.formData()
  const message = form.get('message') as string

  return await messageService.sendMessage(message, cookie)
}

const fakeUsers = [
  { id: 1, username: 'You', isOnline: true },
  { id: 2, username: 'Alice', isOnline: true },
  { id: 3, username: 'Bob', isOnline: false, lastSeen: new Date(Date.now() - 300000) },
  { id: 4, username: 'Charlie', isOnline: true }
]

const ChatPage = ({ loaderData }: Route.ComponentProps) => {
  const { initialMessages, userId } = loaderData ?? {}

  return (
    <div className="flex w-full bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">General Chat</h1>
              <p className="text-sm text-gray-500">{fakeUsers.filter(u => u.isOnline).length} users online</p>
            </div>
            <div className="lg:hidden">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{fakeUsers.filter(u => u.isOnline).length} online</span>
              </div>
            </div>
          </div>
        </div>
        <MessageList initialMessages={initialMessages} userId={userId} />
        <MessageInput />
      </div>
      <UserPanel users={fakeUsers} />
    </div>
  )
}

export default ChatPage
