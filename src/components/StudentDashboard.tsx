import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  UserCheck, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Users
} from 'lucide-react';
import type { AlumniProfile, EventItem, OpportunityItem, MentorshipRequest, StudentProgress, NavigationTab } from '../types';

interface StudentDashboardProps {
  progress: StudentProgress;
  savedAlumni: AlumniProfile[];
  registeredEvents: EventItem[];
  opportunities: OpportunityItem[];
  mentorshipRequests: MentorshipRequest[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectAlumni: (alumni: AlumniProfile) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  progress,
  savedAlumni,
  registeredEvents,
  opportunities,
  mentorshipRequests,
  onNavigate,
  onSelectAlumni
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Student Career Center</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, Alex Morgan</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Class of 2026 • Computer Science & Engineering. Track your mentorship milestones, registered events, and job referrals.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('mentors')}
              className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/30 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Find Recommended Mentors</span>
            </button>
          </div>
        </div>
      </div>

      {/* CAREER PROGRESS TRACKER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h3 className="font-extrabold text-base text-slate-900">Career Progress Tracker</h3>
          </div>
          <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Profile Strength: {progress.profileCompletion}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.profileCompletion}%` }}
          />
        </div>

        {/* Metric Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Mentorship Sessions</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{progress.mentorshipSessionsCompleted}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Completed this semester</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Networking Connections</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{progress.connectionsCount}</div>
            <span className="text-[11px] text-cyan-600 font-semibold">Alumni & Peer Network</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Events Attended</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{progress.eventsAttended}</div>
            <span className="text-[11px] text-indigo-600 font-semibold">Workshops & Talks</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Applications Submitted</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{progress.applicationsSubmitted}</div>
            <span className="text-[11px] text-amber-600 font-semibold">Internships & Referrals</span>
          </div>
        </div>
      </div>

      {/* DASHBOARD WIDGETS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Mentorship Requests & Saved Alumni */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* My Mentorship Requests */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-base text-slate-900">My Mentorship Requests</h3>
              </div>
              <button 
                onClick={() => onNavigate('mentors')}
                className="text-xs font-semibold text-cyan-600 hover:underline"
              >
                Find Mentors →
              </button>
            </div>

            <div className="space-y-3">
              {mentorshipRequests.map((req) => (
                <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{req.mentorName}</span>
                    <p className="text-slate-600">{req.domain} • Submitted {req.dateSubmitted}</p>
                    <p className="text-slate-500 italic mt-1 text-[11px]">"{req.message.substring(0, 70)}..."</p>
                  </div>
                  <span className={`px-3 py-1 font-bold rounded-full text-[11px] ${
                    req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                    req.status === 'Declined' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Opportunities */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Recommended Opportunities for You</h3>
              </div>
              <button onClick={() => onNavigate('opportunities')} className="text-xs font-semibold text-cyan-600 hover:underline">
                View All Board →
              </button>
            </div>

            <div className="space-y-3">
              {opportunities.slice(0, 3).map((opp) => (
                <div key={opp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={opp.companyLogo} alt={opp.company} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{opp.title}</h4>
                      <p className="text-slate-500">{opp.company} • {opp.stipendOrSalary}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('opportunities')}
                    className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Registered Events & Saved Alumni */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Registered Events */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-slate-900">My Registered Events</h3>
              </div>
              <button onClick={() => onNavigate('events')} className="text-xs font-semibold text-cyan-600 hover:underline">
                Events Hub →
              </button>
            </div>

            <div className="space-y-3">
              {registeredEvents.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No registered upcoming events yet.</p>
              ) : (
                registeredEvents.map((evt) => (
                  <div key={evt.id} className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/60 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">{evt.title}</span>
                    <p className="text-slate-600">📅 {evt.date} • {evt.time}</p>
                    <p className="text-slate-500 font-medium">📍 {evt.venue}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Saved Alumni Network */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Saved Alumni Connections</h3>
              </div>
              <button onClick={() => onNavigate('alumni')} className="text-xs font-semibold text-cyan-600 hover:underline">
                Directory →
              </button>
            </div>

            <div className="space-y-3">
              {savedAlumni.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{a.name}</h4>
                      <p className="text-slate-500">{a.currentRole} @ {a.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectAlumni(a)}
                    className="text-xs font-semibold text-cyan-600 hover:underline"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
