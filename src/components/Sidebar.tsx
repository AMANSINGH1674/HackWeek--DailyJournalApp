import React from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { BookOpen, PenTool, Baseline as Timeline, LogOut, Sparkles } from 'lucide-react';

interface SidebarProps {
  user: User;
  currentView: 'write' | 'timeline';
  onViewChange: (view: 'write' | 'timeline') => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ user, currentView, onViewChange, isOpen, onClose }: SidebarProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const menuItems = [
    { id: 'write', label: 'Write Entry', icon: PenTool },
    { id: 'timeline', label: 'Timeline', icon: Timeline },
  ] as const;

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-white/20
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-8 border-b border-[#AAD0E2]/20">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 bg-gradient-to-br from-[#5B8094] to-[#7198AF] rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#153A50] to-[#5B8094] bg-clip-text text-transparent">
                Mindful Journal
              </h1>
              <p className="text-[#7198AF] text-sm font-medium">AI-powered insights</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-8">
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#5B8094] to-[#7198AF] text-white shadow-lg transform scale-105' 
                      : 'text-[#153A50] hover:bg-[#AAD0E2]/20 hover:transform hover:scale-105'
                    }
                  `}
                >
                  <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-[#7198AF] group-hover:text-[#5B8094]'}`} />
                  <span className="font-semibold text-lg">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI Features highlight */}
          <div className="mt-12 p-6 bg-gradient-to-br from-[#AAD0E2]/20 to-[#7198AF]/10 rounded-2xl border border-[#AAD0E2]/30 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="h-6 w-6 text-[#5B8094]" />
              <span className="font-bold text-[#153A50] text-lg">AI Features</span>
            </div>
            <ul className="text-[#5B8094] space-y-2 font-medium">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#7198AF] rounded-full"></div>
                <span>Mood detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#7198AF] rounded-full"></div>
                <span>Smart summaries</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#7198AF] rounded-full"></div>
                <span>Writing insights</span>
              </li>
            </ul>
          </div>
        </nav>

        {/* User info and sign out */}
        <div className="p-8 border-t border-[#AAD0E2]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-[#7198AF] to-[#AAD0E2] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">
                  {user.email?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[#153A50] font-semibold truncate">
                  {user.email}
                </p>
                <p className="text-[#7198AF] text-sm">Welcome back</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-3 text-[#7198AF] hover:text-[#153A50] hover:bg-[#AAD0E2]/20 rounded-xl transition-all duration-200"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}