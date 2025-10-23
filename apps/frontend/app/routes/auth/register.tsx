import { redirect } from 'react-router'
import { isEmpty, isNil } from 'lodash-es'
import { authCookie, getAuthCookie } from '~/cookie.server'
import { Route } from './+types/login'
import Register from '~/components/auth/register'
import { authService } from '~/api/auth.service'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: 'Registrarse' },
    { name: 'Register', content: 'Register to access the chat' }
  ]
}

export async function loader ({
  request
}: Route.LoaderArgs) {
  const cookie = await getAuthCookie(request)

  if (!isEmpty(cookie)) {
    // Redirect to the home page if they are already signed in.
    return redirect('/')
  }
}

export async function action ({
  request
}: Route.ActionArgs) {
  try {
    const form = await request.formData()
    const user = Object.fromEntries(form)

    const result = await authService.register(user)
    if (isNil(result.user.id)) {
      return
    }

    const cookie = await getAuthCookie(request)
    cookie.token = result.token
    cookie.userId = result.user.id
    cookie.userData = result.user

    return redirect('/', {
      headers: {
        'Set-Cookie': await authCookie.serialize(cookie)
      }
    })
  } catch (error: any) {
    return { errorMessage: error?.response?.data?.message as string ?? error?.message as string }
  }
}

export default function RegisterPage () {
  return (
    <div className='max-w-4xl w-full mx-auto my-auto'>
      <Register />
    </div>
  )
}

