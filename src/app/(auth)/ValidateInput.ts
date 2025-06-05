import { z } from 'zod';

export default function validateInput(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!result.success) {
    return { error: 'Invalid email or password' };
  }

  return result.data;
}
