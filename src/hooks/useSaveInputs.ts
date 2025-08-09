import { GoalInputProps } from '@/types';
import { useState } from 'react';

export default function useSaveInputs() {
  const [saveError, setSaveError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function saveInputs(session: any, input: GoalInputProps) {
    setSaveError(null);
    setSuccess(false);
    try {
      console.log('input:', input);
      const response = await fetch('/api/user_prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(input),
      });
      console.log('response');
      if (!response.ok) {
        const errData: any = await response.json();
        throw new Error(errData.error || 'Failed to save input');
      }
      const data = await response.json();
      return data;
    } catch (err: any) {
      setSaveError(err.message || 'An error occured while saving inputs');
    } finally {
      setSuccess(true);
    }
  }
  return { saveError, success, saveInputs };
}
