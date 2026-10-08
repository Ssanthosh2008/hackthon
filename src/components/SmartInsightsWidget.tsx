import React from 'react';
import { Sparkles, UserCheck, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import type { Mentor, AlumniProfile, EventItem, OpportunityItem, NavigationTab } from '../types';
import { generateSmartInsights } from '../services/recommendationEngine';

interface SmartInsightsWidgetProps {
  mentors: Mentor[];
  alumni: AlumniProfile[];
  events: EventItem[];
  opportunities: OpportunityItem[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectAlumni: (alumni: AlumniProfile) => void;
}

export const SmartInsightsWidget: React.FC<SmartInsightsWidgetProps> = ({
  mentors,
  alumni,
  events,
  opportunities,
  onNavigate
}) => {
  const insights = generateSmartInsights(mentors, alumni, events, opportunities);

  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden my-12">
      <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>ALUMNEX SMART INSIGHTS ENGINE</span>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">Intelligent Career Recommendations</h3>
          <p className="text-xs text-slate-300 mt-1">Real-time matching powered by AI frontend recommendation logic.</p>
        </div>

        <button
          onClick={() => onNavigate('mentors')}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center space-x-1"
        >
          <span>Explore All Insights</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-xs">
        
        {/* Recommended Mentors */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
            <UserCheck className="w-4 h-4" />
            <span>Best Mentor Match</span>
          </span>
          {insights.topRecommendedMentors.slice(0, 1).map(({ mentor, score }) => (
            <div key={mentor.id} className="space-y-2">
              <div className="flex items-center space-x-3">
                <img src={mentor.alumni.avatar} alt={mentor.alumni.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-white text-sm">{mentor.alumni.name}</h4>
                  <p className="text-slate-400">{mentor.alumni.currentRole} @ {mentor.alumni.company}</p>
                </div>
              </div>
              <span className="inline-block px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-bold">
                {score}% Compatibility Score
              </span>
            </div>
          ))}
        </div>

        {/* Relevant Events */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Calendar className="w-4 h-4" />
            <span>Event Recommended</span>
          </span>
          {insights.recommendedEvents.slice(0, 1).map(evt => (
            <div key={evt.id} className="space-y-1">
              <h4 className="font-bold text-white line-clamp-1">{evt.title}</h4>
              <p className="text-slate-400">📅 {evt.date} • {evt.category}</p>
              <button onClick={() => onNavigate('events')} className="text-cyan-400 hover:underline font-bold mt-1 inline-block">
                Register for Event →
              </button>
            </div>
          ))}
        </div>

        {/* High Match Opportunity */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Briefcase className="w-4 h-4" />
            <span>Top Matching Opportunity</span>
          </span>
          {insights.highMatchOpportunities.slice(0, 1).map(opp => (
            <div key={opp.id} className="space-y-1">
              <h4 className="font-bold text-white">{opp.title}</h4>
              <p className="text-slate-400">{opp.company} • {opp.stipendOrSalary}</p>
              <button onClick={() => onNavigate('opportunities')} className="text-emerald-400 hover:underline font-bold mt-1 inline-block">
                Apply Direct Referral →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
