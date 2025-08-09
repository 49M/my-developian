import { useState } from 'react';
import { GoalInputProps } from '@/types';

export default function useRoadmap() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);

  async function generateRoadmap(session: any, input: GoalInputProps) {
    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        const errData: any = await response.json();
        throw new Error(errData.error || 'Failed to generate roadmap');
      } else {
        const data: { roadmap: string } = await response.json();
        if (!data.roadmap) data.roadmap = '';
        setRoadmap(data.roadmap);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the roadmap.');
      return { roadmap: 'Failed to generate roadmap :(' };
    } finally {
      setLoading(false);
    }
  }
  return { error, loading, roadmap, generateRoadmap };
}
