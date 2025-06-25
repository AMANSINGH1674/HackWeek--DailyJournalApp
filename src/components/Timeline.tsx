import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, JournalEntry } from '../lib/supabase';
import { Calendar, Sparkles, Search, Clock, BookOpen } from 'lucide-react';

interface TimelineProps {
  user: User;
  refreshTrigger: number;
}

const moodColors = {
  happy: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  sad: 'bg-blue-100 text-blue-800 border-blue-300',
  anxious: 'bg-red-100 text-red-800 border-red-300',
  excited: 'bg-purple-100 text-purple-800 border-purple-300',
  calm: 'bg-green-100 text-green-800 border-green-300',
  frustrated: 'bg-orange-100 text-orange-800 border-orange-300',
  grateful: 'bg-pink-100 text-pink-800 border-pink-300',
  reflective: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  energetic: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  peaceful: 'bg-teal-100 text-teal-800 border-teal-300',
  worried: 'bg-gray-100 text-gray-800 border-gray-300',
  content: 'bg-lime-100 text-lime-800 border-lime-300',
};

export default function Timeline({ user, refreshTrigger }: TimelineProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user.id, refreshTrigger]);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMood = !selectedMood || entry.mood === selectedMood;
    
    return matchesSearch && matchesMood;
  });

  const uniqueMoods = Array.from(new Set(entries.map(entry => entry.mood).filter(Boolean)));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-white/80 text-lg">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">Your Journey</h1>
        <p className="text-white/70 text-xl leading-relaxed">
          Explore the tapestry of your thoughts and emotions. Each entry is a moment in time, 
          a piece of your evolving story enriched with AI insights.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-10 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="search" className="block text-lg font-semibold text-[#153A50] mb-3">
              Search your thoughts
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-[#7198AF]" />
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search through your entries..."
                className="w-full pl-12 pr-4 py-4 border-2 border-[#AAD0E2]/30 rounded-xl focus:ring-2 focus:ring-[#5B8094] focus:border-[#5B8094] transition-all duration-200 bg-white/80 text-[#153A50] placeholder-[#7198AF]/60"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="mood" className="block text-lg font-semibold text-[#153A50] mb-3">
              Filter by emotion
            </label>
            <select
              id="mood"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#AAD0E2]/30 rounded-xl focus:ring-2 focus:ring-[#5B8094] focus:border-[#5B8094] transition-all duration-200 bg-white/80 text-[#153A50]"
            >
              <option value="">All emotions</option>
              {uniqueMoods.map(mood => (
                <option key={mood} value={mood}>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20">
            <BookOpen className="mx-auto h-16 w-16 text-[#7198AF] mb-6" />
            <h3 className="text-2xl font-bold text-[#153A50] mb-4">
              {entries.length === 0 ? 'Your story begins here' : 'No entries match your search'}
            </h3>
            <p className="text-[#5B8094] text-lg">
              {entries.length === 0 
                ? 'Start writing your first journal entry to begin your mindful journey.'
                : 'Try adjusting your search or filter criteria to find what you\'re looking for.'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEntries.map((entry, index) => {
            const date = new Date(entry.created_at);
            const moodColorClass = entry.mood && moodColors[entry.mood as keyof typeof moodColors] 
              ? moodColors[entry.mood as keyof typeof moodColors]
              : 'bg-gray-100 text-gray-800 border-gray-300';

            return (
              <div key={entry.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 hover:transform hover:scale-[1.02]">
                {/* Header */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      {entry.title && (
                        <h3 className="text-2xl font-bold text-[#153A50] mb-3">
                          {entry.title}
                        </h3>
                      )}
                      <div className="flex items-center space-x-6 text-[#7198AF]">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5" />
                          <span className="font-medium">{date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5" />
                          <span className="font-medium">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    
                    {entry.mood && (
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${moodColorClass}`}>
                        {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                      </span>
                    )}
                  </div>

                  {/* AI Summary */}
                  {entry.summary && (
                    <div className="bg-gradient-to-r from-[#AAD0E2]/20 to-[#7198AF]/10 rounded-xl p-6 mb-6 border border-[#AAD0E2]/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <Sparkles className="h-5 w-5 text-[#5B8094]" />
                        <span className="text-lg font-semibold text-[#153A50]">AI Insights</span>
                      </div>
                      <p className="text-[#5B8094] leading-relaxed font-medium">{entry.summary}</p>
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-[#153A50] leading-relaxed whitespace-pre-wrap font-medium">
                      {entry.content.length > 400 
                        ? `${entry.content.substring(0, 400)}...`
                        : entry.content
                      }
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}