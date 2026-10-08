import React from 'react';
import { GraduationCap, Heart, ShieldCheck } from 'lucide-react';
import type { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">ALUMN<span className="text-cyan-400">EX</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Smart Alumni Connect & Engagement Platform built for Centralized Alumni Data Management.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Platform Features</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('alumni')} className="hover:text-cyan-400">Smart Alumni Directory</button></li>
              <li><button onClick={() => onNavigate('mentors')} className="hover:text-cyan-400">Find My Mentor Matching</button></li>
              <li><button onClick={() => onNavigate('events')} className="hover:text-cyan-400">Events & WorkShops</button></li>
              <li><button onClick={() => onNavigate('opportunities')} className="hover:text-cyan-400">Job Board & Referrals</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Institutional Roles</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('student-dashboard')} className="hover:text-cyan-400">Student Portal</button></li>
              <li><button onClick={() => onNavigate('alumni-dashboard')} className="hover:text-cyan-400">Alumni Contributor Portal</button></li>
              <li><button onClick={() => onNavigate('admin-dashboard')} className="hover:text-cyan-400">Admin Data Verification</button></li>
              <li><button onClick={() => onNavigate('network')} className="hover:text-cyan-400">Community Networking Feed</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Hackathon Architecture</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              PostgreSQL-ready schema structure, React + TypeScript + Tailwind CSS modular frontend components, ready for backend deployment.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Production-Quality Prototype</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© 2026 ALUMNEX. All rights reserved. Built for National Hackathon.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
            <span>for Student & Alumni Success</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
