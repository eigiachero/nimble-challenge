import { Outlet } from 'react-router'
import Navbar from '~/components/navbar/navbar'
import { getAuthCookie } from '~/cookie.server'

export async function loader ({ request }: Route.LoaderArgs) {
  const cookie = await getAuthCookie(request)
  const userName = `${cookie?.userData?.name ?? ''} ${cookie?.userData?.lastname ?? ''}`

  return { loggedIn: Boolean(cookie?.userId), userName }
}

export default function Layout () {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex bg-linear-to-br from-blue-50 to-indigo-100 grow h-full w-full">
        <Outlet />
      </main>
    </div>
  )
}
