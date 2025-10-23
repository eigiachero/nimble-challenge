import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'react-router'
import { ToastContainer } from 'react-toastify'
import { Route } from './+types/root'
import './app.css'
import { isEmpty, isNil } from 'lodash-es'
import ErrorPageWarning from './components/errorPage'
import Footer from './components/footer'
import Navbar from './components/navbar/navbar'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

export function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <ToastContainer />
      </body>
    </html>
  )
}

export default function App () {
  return (
    <Outlet />
  )
}

export function ErrorBoundary ({ error }: Route.ErrorBoundaryProps) {
  let title = '¡Ups! Parece que estamos teniendo problemas'
  let message = 'Estamos teniendo problemas a la hora de cargar la página. Por favor, inténtalo de nuevo más tarde.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`
    message =
      error.status === 404
        ? 'La pagina solicitada no ha sido encontrada.'
        : !isEmpty(error?.statusText)
          ? error.statusText
          : message
  }
  if (!isNil(error) && error instanceof Error) {
    stack = error.stack
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow h-full w-full">
        <ErrorPageWarning title={title} message={message} stack={stack} />
      </main>
      <Footer />
    </div>
  )
}
