import React, { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

type DiaryEntryFormProps = {
  onSuccess: () => void;
  supabase: SupabaseClient;
};

const DiaryEntryForm: React.FC<DiaryEntryFormProps> = ({ onSuccess, supabase }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('diary_entries')
      .insert([{ title, content }]);

    if (error) {
      console.error('Error inserting diary entry:', error);
    } else {
      setTitle('');
      setContent('');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* フォームの内容は以前と同じ */}
    </form>
  );
};

export default DiaryEntryForm;