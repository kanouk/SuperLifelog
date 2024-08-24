'use client';

import { useState } from 'react';
import DiaryEntryForm from '@/components/DairyEntryForm';
import DiaryEntryList from '@/components/DiaryEntryList';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEntryCreated = () => {
    // エントリーが作成されたらリストを更新
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Super Lifelog</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Entry</h2>
        <DiaryEntryForm onSuccess={handleEntryCreated} supabase={supabase} />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Entries</h2>
        <DiaryEntryList key={refreshKey} supabase={supabase} />
      </div>
    </div>
  );
}