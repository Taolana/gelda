import z from 'zod'

export const signinFormSchemaValidator = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string()
})

export const signupFormSchemaValidator = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password is required' }),
  confirmPassword: z.string().min(8, { message: 'Confirm Password is required' })
})
