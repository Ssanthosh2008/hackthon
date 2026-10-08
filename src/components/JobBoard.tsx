import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Search, 
  Building2, 
  Send, 
  CheckCircle2, 
  X
} from 'lucide-react';
import type { OpportunityItem } from '../types';

interface JobBoardProps {
  opportunities: OpportunityItem[];
  onApply: (opportunityId: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({
  opportunities,
  onApply,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  const [applyModalItem, setApplyModalItem] = useState<OpportunityItem | null>(null);
  const [resumeNote, setResumeNote] = useState('');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(query);
        const matchesCompany = opp.company.toLowerCase().includes(query);
        const matchesRole = opp.role.toLowerCase().includes(query);
        const matchesSkills = opp.skills.some(s => s.toLowerCase().includes(query));

        if (!matchesTitle && !matchesCompany && !matchesRole && !matchesSkills) {
          return false;
        }
      }

      if (selectedType !== 'All' && opp.type !== selectedType) return false;
      if (selectedWorkType !== 'All' && opp.workType !== selectedWorkType) return false;
      if (selectedExperience !== 'All' && opp.experienceLevel !== selectedExperience) return false;

      return true;
    });
  }, [opportunities, searchTerm, selectedType, selectedWorkType, selectedExperience]);

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalItem) return;
    onApply(applyModalItem.id);
    onShowToast(`Application submitted for "${applyModalItem.title}" at ${applyModalItem.company}!`, 'success');
    setApplyModalItem(null);
    setResumeNote('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Alumni Career Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Job & Opportunity Board</h2>
          <p className="text-sm text-slate-600 mt-1">Exclusive internships, direct alumni referrals, entry-level jobs, and freelance gigs.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredOpportunities.length} Active Opportunities
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roles (e.g. Software Development Intern), companies (e.g. Razorpay), or skills..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Opportunity Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
            >
              <option value="All">All Types (Jobs, Internships, Referrals)</option>
              <option value="Internship">Internships Only</option>
              <option value="Job">Full-time Jobs</option>
              <option value="Referral">Alumni Referrals</option>
              <option value="Freelance">Freelance Opportunities</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Work Mode</label>
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
            >
              <option value="All">All Modes (Remote, On-site, Hybrid)</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Experience Level</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
            >
              <option value="All">All Levels</option>
              <option value="Intern">Internship</option>
              <option value="Entry-Level">Entry-Level (0-2 yrs)</option>
              <option value="Mid-Senior">Mid-Senior</option>
            </select>
          </div>
        </div>
      </div>

      {/* OPPORTUNITY CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={opp.companyLogo}
                    alt={opp.company}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {opp.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.company}</span>
                      <span>•</span>
                      <span className="text-slate-500">{opp.industry}</span>
                    </p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                  opp.type === 'Internship' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                  opp.type === 'Referral' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                  opp.type === 'Freelance' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {opp.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4">
                <span className="flex items-center space-x-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{opp.location} ({opp.workType})</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1 font-bold text-slate-900">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{opp.stipendOrSalary}</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">{opp.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {opp.skills.map(s => (
                  <span key={s} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <img
                    src={opp.postedByAlumniAvatar}
                    alt={opp.postedByAlumniName}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Posted by Alumni</span>
                    <span className="font-bold text-slate-800 text-[11px]">{opp.postedByAlumniName}</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  <span>Deadline: <strong className="text-slate-700">{opp.deadline}</strong></span>
                </div>
              </div>

            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{opp.postedDate}</span>

              {opp.isApplied ? (
                <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center space-x-1 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Application Submitted</span>
                </span>
              ) : (
                <button
                  onClick={() => setApplyModalItem(opp)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Apply Now</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* APPLY MODAL DIALOG */}
      {applyModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Apply for {applyModalItem.title}</h3>
                <p className="text-xs text-slate-500">{applyModalItem.company} • Posted by alumni {applyModalItem.postedByAlumniName}</p>
              </div>
              <button onClick={() => setApplyModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="space-y-4">
              <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 text-xs text-cyan-900">
                <span className="font-bold block mb-1">Attached Profile & Resume</span>
                <p className="text-slate-600 text-[11px]">Your ALUMNEX verified student profile and institutional transcripts will be automatically forwarded to {applyModalItem.postedByAlumniName}.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Optional Note to Alumni Referrer</label>
                <textarea
                  value={resumeNote}
                  onChange={(e) => setResumeNote(e.target.value)}
                  placeholder={`Hi ${applyModalItem.postedByAlumniName}, I have built 2 major projects in ${applyModalItem.skills[0]} and would appreciate your referral...`}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyModalItem(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
