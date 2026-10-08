import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Video, 
  CheckCircle2, 
  Share2, 
  Sparkles
} from 'lucide-react';
import type { EventItem } from '../types';

interface EventsEngagementProps {
  events: EventItem[];
  onToggleRegister: (eventId: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const EventsEngagement: React.FC<EventsEngagementProps> = ({
  events,
  onToggleRegister,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'registered' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Alumni Meet', 'Career Talk', 'Workshop', 'Networking', 'Webinar', 'College Event'];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (activeTab === 'upcoming' && evt.isPast) return false;
      if (activeTab === 'past' && !evt.isPast) return false;
      if (activeTab === 'registered' && !evt.isRegistered) return false;

      if (selectedCategory !== 'All' && evt.category !== selectedCategory) return false;

      return true;
    });
  }, [events, activeTab, selectedCategory]);

  const handleShareEvent = (eventTitle: string) => {
    onShowToast(`Event link for "${eventTitle}" copied to clipboard!`, 'info');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Calendar className="w-4 h-4" />
            <span>Alumni & Campus Events Discovery</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Events & Engagement Hub</h2>
          <p className="text-sm text-slate-600 mt-1">Connect in real-time through alumni talks, workshops, annual reunions, and mock interview clinics.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'upcoming'
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming Events
          </button>

          <button
            onClick={() => setActiveTab('registered')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'registered'
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Registered</span>
            <span className="px-1.5 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full">
              {events.filter(e => e.isRegistered).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'past'
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EVENTS GRID */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Events Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">There are currently no events under this category or tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={evt.banner}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md rounded-full text-[11px] font-bold">
                    {evt.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                    evt.locationType === 'Online' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {evt.locationType === 'Online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    <span>{evt.locationType}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center space-x-1 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{evt.date}</span>
                  </span>
                  <span className="flex items-center space-x-1 font-mono text-[11px] text-slate-300">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{evt.time}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{evt.description}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
                  <img
                    src={evt.speakerAvatar}
                    alt={evt.speaker}
                    className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm"
                  />
                  <div className="truncate">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Featured Speaker</span>
                    <span className="block text-xs font-bold text-slate-900 truncate">{evt.speaker}</span>
                    <span className="block text-[11px] text-slate-500 truncate">{evt.speakerRole} ({evt.speakerCompany})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span className="truncate max-w-[180px] font-medium" title={evt.venue}>
                    📍 {evt.venue}
                  </span>
                  <span className="flex items-center space-x-1 font-semibold text-slate-700">
                    <Users className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{evt.attendeesCount} / {evt.maxAttendees}</span>
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleShareEvent(evt.title)}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-200/60 transition-colors"
                  title="Share event link"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {evt.isPast ? (
                  <span className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-bold rounded-xl">
                    Event Completed
                  </span>
                ) : (
                  <button
                    onClick={() => onToggleRegister(evt.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md ${
                      evt.isRegistered
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 shadow-slate-900/20'
                    }`}
                  >
                    {evt.isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Registered (Click to cancel)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Register Now</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};
