import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import Sidebar from './Sidebar';
import WriteEntry from './WriteEntry';
import Timeline from './Timeline';
import { Menu, X } from 'lucide-react';

type View = 'write' | 'timeline';

interface JournalAppProps {
  user: User;
}

export default function JournalApp({ user }: JournalAppProps) {
  const [currentView, setCurrentView] = useState<View>('write');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEntryCreated = () => {
    setRefreshTrigger(prev => prev + 1);
    setCurrentView('timeline');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#153A50] via-[#5B8094] to-[#7198AF]">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>
      
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-[#153A50]" />
          ) : (
            <Menu className="h-6 w-6 text-[#153A50]" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="lg:ml-80 min-h-screen relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-8 lg:px-12">
          {currentView === 'write' ? (
            <WriteEntry user={user} onEntryCreated={handleEntryCreated} />
          ) : (
            <Timeline user={user} refreshTrigger={refreshTrigger} />
          )}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}