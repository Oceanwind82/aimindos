'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

type Row = {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  updated_at: string;
};

type Payload = {
  eventType: string;
  new: Row;
  old?: Row;
};

function updateRows(prev: Row[], payload: Payload): Row[] {
  const next = [...prev];
  const row = payload.new;
  const idx = next.findIndex((r) => r.id === row.id);
  if (payload.eventType === 'DELETE') {
    return next.filter((r) => r.id !== payload.old?.id);
  }
  if (idx >= 0) next[idx] = row;
  else next.unshift(row);
  return next;
}

export function useRealtimeProgress(userId?: string) {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Initial fetch
    supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (Array.isArray(data)) setRows(data as Row[]);
      });

    // Live subscription (Supabase v2+)
    const channel = supabase.channel(`progress:${userId}`);
    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'progress',
          filter: `user_id=eq.${userId}`,
        },
        (payload: Payload) => {
          setRows((prev) => updateRows(prev, payload));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return rows;
}
