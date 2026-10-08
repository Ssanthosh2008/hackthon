import React from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  PlusCircle
} from 'lucide-react';
import type { MentorshipRequest, NavigationTab } from '../types';

interface AlumniDashboardProps {
  requests: MentorshipRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const AlumniDashboard: React.FC<AlumniDashboardProps> = ({
  requests,
  onAcceptRequest,
  onDeclineRequest,
  onNavigate
}) => {
  const pendingRequests = requests.filter(r => r.status === 'Pending');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Alumni Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <UserCheck className="w-4 h-4" />
              <span>Verified Alumni & Mentor Portal</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, Aarav Sharma</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Class of 2018 • Senior AI Engineer @ Google DeepMind. Giving back to current students through mentorship & referrals.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('opportunities')}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>Post Opportunity</span>
            </button>

            <button
              onClick={() => onNavigate('network')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Pending Requests</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{pendingRequests.length}</div>
          <span className="text-[11px] text-amber-600 font-semibold">Action required</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Mentees Assisted</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">18</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Active mentorship slots: 3/5</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Opportunities Shared</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">6</div>
          <span className="text-[11px] text-cyan-600 font-semibold">12 student applications</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Network Impact Score</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">94/100</div>
          <span className="text-[11px] text-indigo-600 font-semibold">Top 5% alumni contributor</span>
        </div>
      </div>

      {/* PENDING MENTORSHIP REQUESTS QUEUE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-600" />
            <h3 className="font-extrabold text-base text-slate-900">Pending Student Mentorship Requests</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">{pendingRequests.length} Pending</span>
        </div>

        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 text-center">No pending mentorship requests at this moment.</p>
          ) : (
            pendingRequests.map((req) => (
              <div key={req.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img src={req.studentAvatar} alt={req.studentName} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{req.studentName}</h4>
                      <p className="text-xs text-slate-600">{req.studentDepartment} • {req.studentYear}</p>
                      <p className="text-[11px] text-cyan-700 font-semibold">Career Goal: {req.careerGoal}</p>
                    </div>
                  </div>

                  {/* Accept / Decline Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDeclineRequest(req.id)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200/60 transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="w-4 h-4 text-slate-500" />
                      <span>Decline</span>
                    </button>

                    <button
                      onClick={() => onAcceptRequest(req.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Request</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700">
                  <span className="font-bold block text-slate-900 mb-1">Student Message:</span>
                  <p className="italic">"{req.message}"</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </section>
  );
};
