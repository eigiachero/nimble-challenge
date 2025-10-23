import { Link, useLoaderData } from 'react-router'
import { loader } from '~/layout'
import { Button } from '../ui/button'

const Navbar = () => {
  const { loggedIn, userName } = useLoaderData<typeof loader>() ?? {}

  return (
    <header className="bg-slate-800 shadow-xl sticky top-0 left-0 right-0 z-10">
      <nav className="px-6 py-4 flex flex-row items-center justify-between">
        <span className="text-white text-2xl font-bold">AQA Challenge</span>
        {loggedIn ? (
          <div className="flex flex-row items-center gap-4">
            <span className="text-white text-sm">Welcome, {userName}</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/logout">Logout</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
