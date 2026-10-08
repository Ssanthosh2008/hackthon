import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Briefcase, 
  Award, 
  FolderGit2, 
  UserPlus, 
  MessageSquare, 
  Send,
  Check,
  Globe,
  Code
} from 'lucide-react';
import type { AlumniProfile } from '../types';

interface AlumniProfileModalProps {
  alumni: AlumniProfile | null;
  onClose: () => void;
  onRequestMentorship: (alumni: AlumniProfile) => void;
  onConnect: (alumni: AlumniProfile) => void;
  isConnected: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AlumniProfileModal: React.FC<AlumniProfileModalProps> = ({
  alumni,
  onClose,
  onRequestMentorship,
  onConnect,
  isConnected,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'journey' | 'projects' | 'mentorship'>('overview');
  const [messageText, setMessageText] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);

  if (!alumni) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    onShowToast(`Message sent to ${alumni.name}! They will receive an email & platform alert.`, 'success');
    setMessageText('');
    setShowMessageBox(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Cover Header Banner */}
        <div className="h-36 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Info Header */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-4 gap-4">
            
            {/* Avatar & Badges */}
            <div className="relative inline-block">
              <img
                src={alumni.avatar}
                alt={alumni.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              {alumni.verificationStatus === 'verified' && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white" title="Institutional Verified Record">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center space-x-2 pt-2 sm:pt-0">
              <button
                onClick={() => onConnect(alumni)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  isConnected
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isConnected ? <Check className="w-4 h-4 text-emerald-600" /> : <UserPlus className="w-4 h-4" />}
                <span>{isConnected ? 'Connected' : 'Connect'}</span>
              </button>

              {alumni.mentorshipAvailable && (
                <button
                  onClick={() => onRequestMentorship(alumni)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 flex items-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Mentorship</span>
                </button>
              )}

              <button
                onClick={() => setShowMessageBox(!showMessageBox)}
                className="p-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                title="Send Direct Message"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Name & Basic Info */}
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900">{alumni.name}</h2>
              {alumni.mentorshipAvailable && (
                <span className="px-2.5 py-0.5 bg-cyan-100 text-cyan-800 text-[10px] font-bold rounded-full">
                  Available Mentor
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-cyan-700 mt-1 flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4" />
              <span>{alumni.currentRole} at <strong className="text-slate-900">{alumni.company}</strong></span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{alumni.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
                <span>Class of {alumni.gradYear} • {alumni.department}</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {alumni.bio}
            </p>
          </div>

          {/* Direct Message Slide-Down */}
          {showMessageBox && (
            <form onSubmit={handleSendMessage} className="mt-4 p-4 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">Send Direct Message to {alumni.name}</span>
                <button type="button" onClick={() => setShowMessageBox(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Hi ${alumni.name}, I am a student at the institute interested in your work at ${alumni.company}...`}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}

          {/* Social Links */}
          <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <a href={alumni.linkedin} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-cyan-600">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>LinkedIn Profile</span>
            </a>
            {alumni.github && (
              <a href={alumni.github} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-slate-900">
                <Code className="w-4 h-4 text-slate-800" />
                <span>GitHub</span>
              </a>
            )}
            <a href={`mailto:${alumni.email}`} className="flex items-center space-x-1 hover:text-cyan-600">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>{alumni.email}</span>
            </a>
          </div>

          {/* PROFILE TABS */}
          <div className="flex border-b border-slate-200 mt-6 space-x-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-cyan-600 text-cyan-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Overview & Skills
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`pb-3 border-b-2 transition-colors ${activeTab === 'journey' ? 'border-cyan-600 text-cyan-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Career Journey
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-3 border-b-2 transition-colors ${activeTab === 'projects' ? 'border-cyan-600 text-cyan-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Projects & Achievements
            </button>
            {alumni.mentorshipAvailable && (
              <button
                onClick={() => setActiveTab('mentorship')}
                className={`pb-3 border-b-2 transition-colors ${activeTab === 'mentorship' ? 'border-cyan-600 text-cyan-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Mentorship Offerings
              </button>
            )}
          </div>

          {/* TAB CONTENTS */}
          <div className="mt-5 space-y-4">
            
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Core Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {alumni.skills.map(s => (
                      <span key={s} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Academic Background</h4>
                  {alumni.education.map((edu, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{edu.degree}</span>
                        <p className="text-slate-500">{edu.department} • {edu.year}</p>
                      </div>
                      {edu.cgpa && <span className="font-mono bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded text-[11px]">CGPA: {edu.cgpa}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'journey' && (
              <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-4 my-2">
                {alumni.careerJourney.map((j, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white" />
                    <span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">{j.period}</span>
                    <h5 className="font-bold text-sm text-slate-900 mt-1">{j.role} • <span className="text-slate-700">{j.company}</span></h5>
                    <p className="text-xs text-slate-600 mt-0.5">{j.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-3">
                {alumni.projects.map((p, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <FolderGit2 className="w-4 h-4 text-cyan-600" />
                      <h5 className="font-bold text-xs text-slate-900">{p.title}</h5>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{p.description}</p>
                  </div>
                ))}

                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Honors & Achievements</h4>
                  <ul className="space-y-1.5">
                    {alumni.achievements.map((ach, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'mentorship' && alumni.mentorshipAvailable && (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-2xl border border-cyan-200 text-xs space-y-3">
                <div className="flex items-center space-x-2 text-cyan-900 font-bold">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span>Mentorship Domains</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {alumni.mentorshipDomains?.map(d => (
                    <span key={d} className="px-2.5 py-1 bg-white text-cyan-800 font-bold rounded-lg border border-cyan-300 text-xs">
                      {d}
                    </span>
                  ))}
                </div>
                <p className="text-slate-600 text-xs">
                  {alumni.name} accepts 1-on-1 mentorship requests for career advice, portfolio review, and research guidance.
                </p>
                <button
                  onClick={() => { onClose(); onRequestMentorship(alumni); }}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
                >
                  Send Mentorship Request
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
