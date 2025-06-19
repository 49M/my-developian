import { createClient } from '@/utils/supabase/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ session });
}
