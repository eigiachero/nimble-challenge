import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Form, useActionData, useSubmit } from 'react-router'
import { action } from '~/routes/auth/register'
import ErrorMessage from '../errorMessage'
import { useState } from 'react'
import { validateWithSchema } from '~/lib/utils'
import z from 'zod'
import { FieldError } from '../forms/fieldError'
import { FormInput } from '../forms/formInput'

const userSchema = z.object({
  username: z.string().regex(/^[^\s]+$/, 'Usuario no debe tener espacios').min(3, 'Usuario es obligatorio y debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'Contraseña es obligatoria y debe tener al menos 6 caracteres'),
  name: z.string().min(1, 'Nombre es obligatorio'),
  lastname: z.string().min(1, 'Apellido es obligatorio')
})

const Register = () => {
  const submit = useSubmit()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const actionData = useActionData<typeof action>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const errors = validateWithSchema(userSchema, Object.fromEntries(formData.entries()))
    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      e.preventDefault()

      return
    }

    submit(formData, { method: 'POST' })
  }

  return (
    <Card className="shadow-xl">
      <ErrorMessage message={actionData?.errorMessage} />
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="POST" className="space-y-4" onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3'>
            <div>
              <FormInput direction='col' type='username' label="Username" name="username" required />
              <FieldError message={errors.username} />
            </div>
            <div>
              <FormInput direction='col' type='password' label="Password" name="password" required />
              <FieldError message={errors.password} />
            </div>
            <Separator />
            <div>
              <FormInput direction='col' type='name' label="Name" name="name" required />
              <FieldError message={errors.name} />
            </div>
            <div>
              <FormInput direction='col' type='lastname' label="Lastname" name="lastname" />
              <FieldError message={errors.lastname} />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-white py-3 "
          >
            Register
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Register
