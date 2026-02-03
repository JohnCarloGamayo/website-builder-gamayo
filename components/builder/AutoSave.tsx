'use client';

import { useEditorStore } from '@/store/editorStore';
import { useEffect } from 'react';

export default function AutoSave() {
  const { saveHistory } = useEditorStore();

  useEffect(() => {
    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      saveHistory();
      console.log('[AutoSave] Project saved automatically');
    }, 30000);

    // Save on beforeunload
    const handleBeforeUnload = () => {
      saveHistory();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveHistory]);

  return null; // This component doesn't render anything
}
