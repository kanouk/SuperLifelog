'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function EntryPage() {
  const params = useParams();
  const id = params.id;
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      fetchEntry();
    }
  }, [id]);

  const fetchEntry = async () => {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching entry:', error);
    } else {
      setEntry(data);
      setTitle(data.title);
      setContent(data.content);
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('diary_entries')
      .update({ title, content })
      .eq('id', id);

    if (error) {
      console.error('Error updating entry:', error);
    } else {
      setIsEditing(false);
      fetchEntry();
    }
  };

  if (!entry) return <div>Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto mt-8">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">{entry.title}</h1>
          <p className="text-gray-600 mb-4">
            {new Date(entry.created_at).toLocaleString()}
          </p>
          <div className="prose">{entry.content}</div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}