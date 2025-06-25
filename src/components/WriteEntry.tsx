import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { analyzeJournalEntry } from '../lib/gemini';
import { Save, Sparkles, Calendar, Feather } from 'lucide-react';

interface WriteEntryProps {
  user: User;
  onEntryCreated: () => void;
}

export default function WriteEntry({ user, onEntryCreated }: WriteEntryProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    setIsSaving(true);
    setIsAnalyzing(true);

    try {
      // Analyze the entry with AI
      const { mood, summary } = await analyzeJournalEntry(content);
      setIsAnalyzing(false);

      // Save to database
      const { error } = await supabase
        .from('journal_entries')
        .insert([
          {
            user_id: user.id,
            title: title.trim() || null,
            content: content.trim(),
            mood,
            summary,
          },
        ]);

      if (error) throw error;

      // Reset form
      setTitle('');
      setContent('');
      setWordCount(0);
      
      onEntryCreated();
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setIsSaving(false);
      setIsAnalyzing(false);
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 text-white/80 mb-4">
          <Calendar className="h-6 w-6" />
          <span className="text-lg font-medium">{today}</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">Write Your Story</h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Pour your thoughts onto the page. Let your mind wander, reflect, and discover. 
          Our AI will help you understand the deeper patterns in your journey.
        </p>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Title input */}
        <div className="p-8 border-b border-[#AAD0E2]/20">
          <div className="flex items-center space-x-4">
            <Feather className="h-6 w-6 text-[#7198AF]" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your thoughts a title..."
              className="flex-1 text-2xl font-semibold text-[#153A50] placeholder-[#7198AF]/60 border-none outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Content textarea */}
        <div className="p-8">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="What's on your mind today? Let your thoughts flow freely..."
            rows={18}
            className="w-full text-[#153A50] placeholder-[#7198AF]/60 border-none outline-none resize-none bg-transparent leading-relaxed text-lg font-medium"
          />
        </div>

        {/* Footer */}
        <div className="p-8 bg-gradient-to-r from-[#AAD0E2]/10 to-[#7198AF]/10 border-t border-[#AAD0E2]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-[#5B8094]">
              <span className="font-medium">{wordCount} words</span>
              {isAnalyzing && (
                <div className="flex items-center space-x-3 text-[#7198AF]">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="font-medium">AI is analyzing your thoughts...</span>
                </div>
              )}
            </div>
            
            <button
              onClick={handleSave}
              disabled={!content.trim() || isSaving}
              className="flex items-center space-x-3 bg-gradient-to-r from-[#5B8094] to-[#7198AF] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#153A50] hover:to-[#5B8094] focus:outline-none focus:ring-2 focus:ring-[#5B8094] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving your thoughts...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Entry</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Writing inspiration */}
      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
        <h3 className="font-bold text-[#153A50] text-xl mb-6 flex items-center space-x-3">
          <Sparkles className="h-6 w-6 text-[#7198AF]" />
          <span>Writing Inspiration</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#5B8094]">
          <div>
            <h4 className="font-semibold text-[#153A50] mb-3">Reflect on today</h4>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li>• What moment made you smile today?</li>
              <li>• What challenged you and how did you respond?</li>
              <li>• What are you grateful for right now?</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#153A50] mb-3">Express freely</h4>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li>• Write without editing or judgment</li>
              <li>• Include emotions and physical sensations</li>
              <li>• Let your authentic voice emerge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}