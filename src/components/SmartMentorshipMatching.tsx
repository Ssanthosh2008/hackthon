import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Sliders, 
  Send, 
  X, 
  HelpCircle
} from 'lucide-react';
import type { Mentor, AlumniProfile, MentorshipMatchingFilter } from '../types';
import { calculateMentorMatchScore } from '../services/recommendationEngine';

interface SmartMentorshipMatchingProps {
  mentors: Mentor[];
  onSelectAlumni: (alumni: AlumniProfile) => void;
  onSubmitRequest: (mentorId: string, mentorName: string, careerGoal: string, message: string) => void;
}

export const SmartMentorshipMatching: React.FC<SmartMentorshipMatchingProps> = ({
  mentors,
  onSelectAlumni,
  onSubmitRequest
}) => {
  // Matching form states
  const [careerGoal, setCareerGoal] = useState('AI Engineer / Data Scientist');
  const [interestedDomain, setInterestedDomain] = useState('Artificial Intelligence & ML');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'PyTorch', 'LLMs']);
  const [skillInput, setSkillInput] = useState('');
  const [preferredLocation] = useState('Bengaluru');
  const [experienceLevel, setExperienceLevel] = useState('Senior (7+ yrs)');
  const [preferredType, setPreferredType] = useState('1-on-1 Sessions');

  const [activeRequestMentor, setActiveRequestMentor] = useState<Mentor | null>(null);
  const [requestMessage, setRequestMessage] = useState('');

  const filterState: MentorshipMatchingFilter = {
    careerGoal,
    interestedDomain,
    skills: selectedSkills,
    preferredLocation,
    experienceLevel,
    preferredMentorshipType: preferredType
  };

  // Compute matched mentors dynamically
  const rankedMentors = mentors.map(m => {
    const { score, reasons } = calculateMentorMatchScore(filterState, m);
    return {
      mentor: m,
      score,
      reasons
    };
  }).sort((a, b) => b.score - a.score);

  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills([...selectedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleSendMentorshipModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRequestMentor || !requestMessage.trim()) return;
    onSubmitRequest(
      activeRequestMentor.id,
      activeRequestMentor.alumni.name,
      careerGoal,
      requestMessage
    );
    setActiveRequestMentor(null);
    setRequestMessage('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-600 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <span>Innovation Feature #1: AI Match Algorithm</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Smart Mentorship Matching</h2>
        <p className="text-sm text-slate-600 mt-2">
          Tell us your career goals, domain interest, and skill preferences. Our matching engine will pair you with top verified alumni mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: "Find My Mentor" Interactive Form */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-lg h-fit space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-cyan-600" />
            <h3 className="font-bold text-base text-slate-900">Find My Mentor Engine</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Career Goal</label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. AI Engineer, Product Lead..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Interested Domain</label>
            <select
              value={interestedDomain}
              onChange={(e) => setInterestedDomain(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none font-medium"
            >
              <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
              <option value="Product Management">Product Management</option>
              <option value="Cloud & DevOps Architecture">Cloud & DevOps Architecture</option>
              <option value="Frontend Engineering & UI/UX">Frontend Engineering & UI/UX</option>
              <option value="Data Science & NLP">Data Science & NLP</option>
              <option value="Venture Capital & Startups">Venture Capital & Startups</option>
              <option value="Backend Engineering & Go">Backend Engineering & Go</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Entrepreneurship & IoT">Entrepreneurship & IoT</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Key Skills</label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Add skill (e.g. PyTorch)..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedSkills.map(s => (
                <span key={s} className="px-2.5 py-1 bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-bold rounded-lg flex items-center space-x-1">
                  <span>{s}</span>
                  <button onClick={() => handleRemoveSkill(s)} className="hover:text-cyan-950">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mentorship Format</label>
            <select
              value={preferredType}
              onChange={(e) => setPreferredType(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="1-on-1 Sessions">1-on-1 Sessions</option>
              <option value="Resume Review">Resume Review</option>
              <option value="Mock Interviews">Mock Interviews</option>
              <option value="Career Guidance">Career Guidance</option>
              <option value="Project Feedback">Project Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mentor Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
            >
              <option value="Senior (7+ yrs)">Senior Mentor (7+ yrs)</option>
              <option value="Mid-Level (3-7 yrs)">Mid-Level Mentor (3-7 yrs)</option>
              <option value="Junior Alumni (1-3 yrs)">Junior Alumni (1-3 yrs)</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">Matching algorithm updates recommendations dynamically.</span>
          </div>

        </div>

        {/* Right Side: Recommended Mentors List with Match Scores */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="font-bold text-base text-slate-900">Recommended Alumni Mentors</h3>
              <p className="text-xs text-slate-500">Ranked by smart similarity engine</p>
            </div>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full">
              {rankedMentors.length} Matches Found
            </span>
          </div>

          <div className="space-y-4">
            {rankedMentors.map(({ mentor, score, reasons }) => {
              const alumni = mentor.alumni;

              return (
                <div
                  key={mentor.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all p-6 relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={alumni.avatar}
                        alt={alumni.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 
                            onClick={() => onSelectAlumni(alumni)}
                            className="font-bold text-base text-slate-900 hover:text-cyan-600 cursor-pointer transition-colors"
                          >
                            {alumni.name}
                          </h4>
                          <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{mentor.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{alumni.currentRole} at {alumni.company}</p>
                        <p className="text-[11px] text-slate-500">{alumni.department} • Class of {alumni.gradYear}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-md font-extrabold text-sm">
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>{score}% Match</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">High Compatibility</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80 mb-4">
                    <span className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider flex items-center space-x-1 mb-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Why recommended for you:</span>
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {reasons.map((r, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-4 text-slate-600">
                      <span>Format: <strong className="text-slate-800">{mentor.preferredType}</strong></span>
                      <span>Level: <strong className="text-slate-800">{mentor.experienceLevel}</strong></span>
                      <span>Slots: <strong className="text-emerald-700">{mentor.maxMentees - mentor.activeMentees} open</strong></span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectAlumni(alumni)}
                        className="px-3.5 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={() => setActiveRequestMentor(mentor)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold rounded-xl shadow-md flex items-center space-x-1.5 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Request Mentorship</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* REQUEST MENTORSHIP MODAL */}
      {activeRequestMentor && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-base text-slate-900">Request Mentorship from {activeRequestMentor.alumni.name}</h3>
              </div>
              <button onClick={() => setActiveRequestMentor(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendMentorshipModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Career Goal</label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Personalized Introduction & Goals</label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder={`Respected ${activeRequestMentor.alumni.name}, I am a student at the institute working toward a career in ${interestedDomain}. I would value your guidance on...`}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveRequestMentor(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
