import { useState } from 'react';

export default function useSaveResponse() {
  const [saveResError, setSaveResError] = useState<string | null>(null);
  const [resSuccess, setResSuccess] = useState<boolean>(false);

  async function saveResponse(session: any, message: string, prompt_id: number) {
    setSaveResError(null);
    setResSuccess(false);
    try {
      const response = await fetch('/api/ai_responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ prompt_id: prompt_id, message: message }),
      });
      if (!response.ok) {
        const errData: any = await response.json();
        throw new Error(errData.error || 'Failed to save input');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred while saving response';
      setSaveResError(message);
    } finally {
      setResSuccess(true);
    }
  }
  return { saveResError, resSuccess, saveResponse };
}
