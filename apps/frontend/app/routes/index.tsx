import { redirect } from 'react-router'
import { Route } from '../+types/root'
import { getAuthCookie } from '~/cookie.server'
import { isEmpty } from 'lodash-es'

export async function loader ({ request }: Route.LoaderArgs) {
  const cookie = await getAuthCookie(request)

  if (!isEmpty(cookie)) {
    return redirect('/chat')
  }

  return redirect('/home')
}

export default function IndexRoute () {
  return <></>
}
