import React, { useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';

type DiaryEntry = {
  id: number;
  title: string;
  created_at: string;
};

type DiaryEntryListProps = {
  supabase: SupabaseClient;
};

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({ supabase }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching diary entries:', error);
      } else {
        setEntries(data || []);
      }
    };

    fetchEntries();
  }, [supabase]);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border p-4 rounded-md">
          <Link href={`/entry/${entry.id}`}>
            <a className="text-lg font-semibold hover:text-indigo-600">{entry.title}</a>
          </Link>
          <p className="text-sm text-gray-500">
            {new Date(entry.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntryList;