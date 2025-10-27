import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useActionData } from 'react-router'
import { action } from '~/routes/auth/login'
import ErrorMessage from '../errorMessage'

const Login = () => {
  const actionData = useActionData<typeof action>()

  return (
    <Card className="shadow-xl">
      <ErrorMessage message={actionData?.errorMessage} />
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 text-center">
          <h1 id='login-title'>Login</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form method="POST" className="space-y-4">
          <div className='space-y-2'>
            <Label htmlFor="login-username">Username</Label>
            <Input
              id="login-username"
              type="text"
              name="username"
              placeholder="username"
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="********"
              name="password"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white py-3 "
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
