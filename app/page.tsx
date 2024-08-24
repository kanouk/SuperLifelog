'use client';

import { useState, useEffect } from 'react';
import DiaryEntryForm from '@/components/DairyEntryForm';
import DiaryEntryList from '@/components/DiaryEntryList';
import UserInfo from '@/components/UserInfo';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEntryCreated = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Super Lifelog</h1>
      
      <UserInfo />
      
      {session && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create New Entry</h2>
            <DiaryEntryForm onSuccess={handleEntryCreated} supabase={supabase} />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Entries</h2>
            <DiaryEntryList key={refreshKey} supabase={supabase} />
          </div>
        </>
      )}
    </div>
  );
}