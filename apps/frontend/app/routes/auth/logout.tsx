import { Form, Link } from 'react-router'
import { Route } from './+types/logout'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { authService } from '~/api/auth.service'

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
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">¿Está seguro que desea cerrar sesión?</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="space-y-4">
            <div className="flex flex-row justify-center gap-2 w-full">
              <Button type="submit">
                Cerrar sesión
              </Button>
              <Button type="button" variant="secondary" asChild>
                <Link to="/">Volver</Link>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
