import React from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Network, 
  Award, 
  ChevronRight,
  Zap,
  Building2
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface LandingHeroProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenMentorshipMatching: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigate, onOpenMentorshipMatching }) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full filter blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/15 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        
        {/* Banner Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/30 rounded-full px-4 py-1.5 text-xs font-medium text-cyan-300 shadow-xl backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Hackathon Issue: Centralized Alumni Data Management & Engagement</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Connect. Mentor. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Grow. Together.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              One intelligent platform connecting students, alumni and institutions beyond graduation. Maintain updated records, match with top mentors, and unlock career opportunities.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('alumni')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base"
              >
                <Users className="w-5 h-5 text-slate-950" />
                <span>Explore Alumni Directory</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => { onNavigate('mentors'); onOpenMentorshipMatching(); }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/40 px-7 py-3.5 rounded-xl shadow-md transition-all hover:border-cyan-400 text-base"
              >
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span>Find a Mentor (AI Match)</span>
              </button>
            </div>

            {/* Quick Feature Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-400 text-xs font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Institutional Verified Records</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Smart Mentorship Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Alumni Job Referrals</span>
              </div>
            </div>
          </div>

          {/* Right Visually Impressive Alumni Connection Network Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Network className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-sm text-slate-200">ALUMNEX Knowledge Network</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">LIVE GRAPH</span>
              </div>

              {/* Graphic Node Network Illustration */}
              <div className="relative h-72 w-full bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute z-20 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/40 animate-pulse">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  <span className="mt-1.5 text-[11px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded-md border border-cyan-500/40">Institution Hub</span>
                </div>

                <div className="absolute top-4 left-6 flex flex-col items-center group cursor-pointer" onClick={() => onNavigate('alumni')}>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-300 shadow-md group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 mt-1">Students</span>
                </div>

                <div className="absolute top-4 right-6 flex flex-col items-center group cursor-pointer" onClick={() => onNavigate('mentors')}>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md group-hover:scale-110 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 mt-1">Mentors</span>
                </div>

                <div className="absolute bottom-4 left-6 flex flex-col items-center group cursor-pointer" onClick={() => onNavigate('events')}>
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 mt-1">Events</span>
                </div>

                <div className="absolute bottom-4 right-6 flex flex-col items-center group cursor-pointer" onClick={() => onNavigate('opportunities')}>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-md group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 mt-1">Jobs</span>
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/30 opacity-60">
                  <line x1="50%" y1="50%" x2="20%" y2="20%" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="20%" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="20%" y2="80%" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="80%" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-slate-300">Live: Aarav Sharma (Google) accepted a mentorship request</span>
                </div>
                <span className="text-slate-500 text-[10px]">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST / STATISTICS CARDS SECTION */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-md group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Alumni</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">12,450+</div>
            <p className="text-[11px] text-slate-400 mt-1">Verified across 18 batches</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-md group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alumni</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">8,920+</div>
            <p className="text-[11px] text-slate-400 mt-1">71.6% monthly engagement rate</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-md group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Available Mentors</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">450+</div>
            <p className="text-[11px] text-slate-400 mt-1">Tier-1 companies & tech leads</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-md group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Upcoming Events</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">24+</div>
            <p className="text-[11px] text-slate-400 mt-1">Workshops & Alumni meets</p>
          </div>
        </div>

      </div>
    </div>
  );
};
