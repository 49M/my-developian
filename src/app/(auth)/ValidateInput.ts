import { z } from 'zod';

export default function validateInput(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9._]+$/, {
        message: 'Username can only contain letters, numbers, dots, and underscores',
      })
      .optional(),
  });

  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username') ?? undefined,
  });

  if (!result.success) {
    return { error: 'Invalid email or password' };
  }

  return result.data;
}
