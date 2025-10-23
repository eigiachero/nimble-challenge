import { redirect } from 'react-router'
import { Route } from '../+types/root'

export async function loader ({ request }: Route.LoaderArgs) {
  return redirect('/home')
}

export default function IndexRoute () {
  return redirect('/home')
}
