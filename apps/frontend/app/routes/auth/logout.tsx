import { Form, Link, redirect } from 'react-router'
import { Route } from './+types/logout'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { authService } from '~/api/auth.service'
import { isEmpty } from 'lodash-es'
import { getAuthCookie } from '~/cookie.server'

export async function loader ({ request }: Route.LoaderArgs) {
  const cookie = await getAuthCookie(request)
  if (isEmpty(cookie)) {
    return redirect('/home')
  }
}

export async function action ({
  request
}: Route.ActionArgs) {
  return authService.logout()
}

export default function LogoutRoute () {
  return (
    <div className="max-w-lg w-full mx-auto my-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            <h1>Are you sure you want to log out?</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="space-y-4">
            <div className="flex flex-row justify-center gap-2 w-full">
              <Button type="submit">
                Log out
              </Button>
              <Button type="button" variant="secondary" asChild>
                <Link to="/">Go to home</Link>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
