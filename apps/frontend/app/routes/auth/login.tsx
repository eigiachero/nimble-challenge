import { redirect } from 'react-router'
import { isEmpty, isNil } from 'lodash-es'
import { authCookie, getAuthCookie } from '~/cookie.server'
import { Route } from './+types/login'
import Login from '~/components/auth/login'
import { authService } from '~/api/auth.service'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: 'Login' },
    { name: 'Login', content: 'Log in to your account to access the chat' }
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
    const username = form.get('username') as string
    const password = form.get('password') as string

    const result = await authService.login(
      username,
      password
    )

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

export default function LoginPage () {
  return (
    <div className='max-w-lg w-full mx-auto my-auto'>
      <Login />
    </div>
  )
}

