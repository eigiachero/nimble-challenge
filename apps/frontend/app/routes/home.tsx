import { isEmpty } from 'lodash-es'
import { Link, redirect } from 'react-router'
import { Button } from '~/components/ui/button'
import { getAuthCookie } from '~/cookie.server'
import { Route } from './+types'

export function meta () {
  return [
    { title: 'Connect & Chat - Challenge AQA' },
    { name: 'description', content: 'Join our secure chat platform and start meaningful conversations with people around the world.' }
  ]
}

export async function loader ({ request }: Route.LoaderArgs) {
  const cookie = await getAuthCookie(request)

  if (!isEmpty(cookie)) {
    return redirect('/chat')
  }
}

export default function Home () {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect & Chat
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our secure chat platform and start meaningful conversations with people around the world.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-700 mb-6">
            Ready to start chatting? Join thousands of users already connected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
