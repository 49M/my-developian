import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient({ req, res });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ user });
}
