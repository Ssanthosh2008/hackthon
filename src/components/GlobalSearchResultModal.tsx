import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Users, 
  UserCheck, 
  Calendar, 
  Briefcase, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import type { AlumniProfile, Mentor, EventItem, OpportunityItem, NetworkingPost, NavigationTab } from '../types';

interface GlobalSearchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumniList: AlumniProfile[];
  mentors: Mentor[];
  events: EventItem[];
  opportunities: OpportunityItem[];
  posts: NetworkingPost[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectAlumni: (alumni: AlumniProfile) => void;
}

export const GlobalSearchResultModal: React.FC<GlobalSearchResultModalProps> = ({
  isOpen,
  onClose,
  alumniList,
  mentors,
  events,
  opportunities,
  posts,
  onNavigate,
  onSelectAlumni
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;

    const q = query.toLowerCase();

    const matchedAlumni = alumniList.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.currentRole.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q) ||
      a.skills.some(s => s.toLowerCase().includes(query))
    ).slice(0, 4);

    const matchedMentors = mentors.filter(m =>
      m.domain.toLowerCase().includes(q) ||
      m.alumni.name.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedEvents = events.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.speaker.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedOpportunities = opportunities.filter(o =>
      o.title.toLowerCase().includes(q) ||
      o.company.toLowerCase().includes(q) ||
      o.skills.some(s => s.toLowerCase().includes(q))
    ).slice(0, 3);

    const matchedPosts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      alumni: matchedAlumni,
      mentors: matchedMentors,
      events: matchedEvents,
      opportunities: matchedOpportunities,
      posts: matchedPosts
    };
  }, [query, alumniList, mentors, events, opportunities, posts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3 bg-slate-900 text-white">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across Alumni, Mentors, Events, Opportunities, Posts..."
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          {!query.trim() ? (
            <div className="text-center py-8 text-slate-400">
              <Sparkles className="w-8 h-8 text-cyan-500 mx-auto mb-2 animate-bounce" />
              <p className="font-semibold text-slate-700">Type to search across the entire ALUMNEX platform</p>
              <p className="text-[11px] mt-1">Try keywords like: "AI", "Google", "Priya", "Razorpay", "React"</p>
            </div>
          ) : !searchResults || (
            searchResults.alumni.length === 0 &&
            searchResults.mentors.length === 0 &&
            searchResults.events.length === 0 &&
            searchResults.opportunities.length === 0 &&
            searchResults.posts.length === 0
          ) ? (
            <p className="text-center py-8 text-slate-500 font-medium">No results found for "{query}"</p>
          ) : (
            <div className="space-y-5">
              
              {/* Alumni Results */}
              {searchResults.alumni.length > 0 && (
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    <span className="flex items-center space-x-1"><Users className="w-3.5 h-3.5 text-cyan-600" /> <span>Alumni Profiles</span></span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.alumni.map(a => (
                      <div
                        key={a.id}
                        onClick={() => { onClose(); onSelectAlumni(a); }}
                        className="p-3 bg-slate-50 hover:bg-cyan-50 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-xl object-cover" />
                          <div>
                            <span className="font-bold text-slate-900">{a.name}</span>
                            <span className="block text-[11px] text-slate-500">{a.currentRole} @ {a.company}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors Results */}
              {searchResults.mentors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    <span className="flex items-center space-x-1"><UserCheck className="w-3.5 h-3.5 text-cyan-600" /> <span>Mentors</span></span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.mentors.map(m => (
                      <div
                        key={m.id}
                        onClick={() => { onClose(); onNavigate('mentors'); }}
                        className="p-3 bg-slate-50 hover:bg-cyan-50 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{m.alumni.name}</span>
                          <span className="block text-[11px] text-cyan-700">{m.domain}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Results */}
              {searchResults.events.length > 0 && (
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5 text-amber-600" /> <span>Events</span></span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.events.map(e => (
                      <div
                        key={e.id}
                        onClick={() => { onClose(); onNavigate('events'); }}
                        className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{e.title}</span>
                          <span className="block text-[11px] text-slate-500">{e.date} • {e.category}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opportunities Results */}
              {searchResults.opportunities.length > 0 && (
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    <span className="flex items-center space-x-1"><Briefcase className="w-3.5 h-3.5 text-emerald-600" /> <span>Jobs & Opportunities</span></span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.opportunities.map(o => (
                      <div
                        key={o.id}
                        onClick={() => { onClose(); onNavigate('opportunities'); }}
                        className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{o.title}</span>
                          <span className="block text-[11px] text-slate-500">{o.company} • {o.stipendOrSalary}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
