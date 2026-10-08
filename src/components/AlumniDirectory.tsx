import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  UserPlus, 
  Sparkles, 
  Briefcase, 
  X, 
  Check
} from 'lucide-react';
import type { AlumniProfile } from '../types';

interface AlumniDirectoryProps {
  alumniList: AlumniProfile[];
  onSelectAlumni: (alumni: AlumniProfile) => void;
  onRequestMentorship: (alumni: AlumniProfile) => void;
  onConnect: (alumni: AlumniProfile) => void;
  connectedIds: string[];
}

export const AlumniDirectory: React.FC<AlumniDirectoryProps> = ({
  alumniList,
  onSelectAlumni,
  onRequestMentorship,
  onConnect,
  connectedIds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedGradYear, setSelectedGradYear] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [mentorshipOnly, setMentorshipOnly] = useState(false);

  const departments = useMemo(() => {
    const set = new Set(alumniList.map(a => a.department));
    return ['All', ...Array.from(set)];
  }, [alumniList]);

  const gradYears = useMemo(() => {
    const set = new Set(alumniList.map(a => a.gradYear.toString()));
    return ['All', ...Array.from(set).sort().reverse()];
  }, [alumniList]);

  const locations = useMemo(() => {
    const set = new Set(alumniList.map(a => a.location));
    return ['All', ...Array.from(set)];
  }, [alumniList]);

  const industries = useMemo(() => {
    const set = new Set(alumniList.map(a => a.industry));
    return ['All', ...Array.from(set)];
  }, [alumniList]);

  const filteredAlumni = useMemo(() => {
    return alumniList.filter(alumni => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = alumni.name.toLowerCase().includes(query);
        const matchesRole = alumni.currentRole.toLowerCase().includes(query);
        const matchesCompany = alumni.company.toLowerCase().includes(query);
        const matchesSkills = alumni.skills.some(s => s.toLowerCase().includes(query));
        const matchesBio = alumni.bio.toLowerCase().includes(query);

        if (!matchesName && !matchesRole && !matchesCompany && !matchesSkills && !matchesBio) {
          return false;
        }
      }

      if (selectedDepartment !== 'All' && alumni.department !== selectedDepartment) return false;
      if (selectedGradYear !== 'All' && alumni.gradYear.toString() !== selectedGradYear) return false;
      if (selectedLocation !== 'All' && alumni.location !== selectedLocation) return false;
      if (selectedIndustry !== 'All' && alumni.industry !== selectedIndustry) return false;
      if (mentorshipOnly && !alumni.mentorshipAvailable) return false;

      return true;
    });
  }, [alumniList, searchTerm, selectedDepartment, selectedGradYear, selectedLocation, selectedIndustry, mentorshipOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All');
    setSelectedGradYear('All');
    setSelectedLocation('All');
    setSelectedIndustry('All');
    setMentorshipOnly(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Centralized Alumni Database</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Smart Alumni Directory</h2>
          <p className="text-sm text-slate-600 mt-1">Search, connect and engage with verified institute graduates across global tech and industry hubs.</p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Showing <strong className="text-slate-900">{filteredAlumni.length}</strong> of {alumniList.length} alumni
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
        
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, role (e.g. AI Engineer), company (e.g. Google), or skills (e.g. PyTorch)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Graduation Batch</label>
            <select
              value={selectedGradYear}
              onChange={(e) => setSelectedGradYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500"
            >
              {gradYears.map((yr) => (
                <option key={yr} value={yr}>{yr === 'All' ? 'All Batches' : `Class of ${yr}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={() => setMentorshipOnly(!mentorshipOnly)}
              className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 border transition-all ${
                mentorshipOnly
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available Mentors Only</span>
            </button>
          </div>
        </div>

        {(searchTerm || selectedDepartment !== 'All' || selectedGradYear !== 'All' || selectedLocation !== 'All' || selectedIndustry !== 'All' || mentorshipOnly) && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Active filters applied</span>
            <button
              onClick={resetFilters}
              className="text-cyan-600 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Clear all filters</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ALUMNI CARDS GRID */}
      {filteredAlumni.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Alumni Profiles Match Your Filters</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">Try searching with a broader keyword, clearing department filters, or turning off mentorship-only restrictions.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Reset All Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => {
            const isConnected = connectedIds.includes(alumni.id);

            return (
              <div
                key={alumni.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <img
                        src={alumni.avatar}
                        alt={alumni.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-md group-hover:scale-105 transition-transform"
                      />
                      {alumni.verificationStatus === 'verified' && (
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white" title="Institutional Verified Alumni">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {alumni.mentorshipAvailable ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full text-[11px] font-semibold">
                        <Sparkles className="w-3 h-3 text-cyan-600" />
                        <span>Mentor</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Alumni</span>
                    )}
                  </div>

                  <h3 
                    onClick={() => onSelectAlumni(alumni)}
                    className="text-lg font-bold text-slate-900 hover:text-cyan-600 cursor-pointer transition-colors"
                  >
                    {alumni.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-700 mt-0.5 flex items-center space-x-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{alumni.currentRole}</span>
                  </p>

                  <p className="text-xs text-slate-500 flex items-center space-x-1 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800">{alumni.company}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{alumni.location}</span>
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center space-x-1">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Class of {alumni.gradYear}</span>
                    </span>
                    <span className="truncate max-w-[150px]" title={alumni.department}>
                      {alumni.department}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {alumni.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded-md border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {alumni.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded font-mono">
                        +{alumni.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectAlumni(alumni)}
                    className="text-xs font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    View Profile
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onConnect(alumni)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                        isConnected
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isConnected ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <UserPlus className="w-3.5 h-3.5" />}
                      <span>{isConnected ? 'Connected' : 'Connect'}</span>
                    </button>

                    {alumni.mentorshipAvailable && (
                      <button
                        onClick={() => onRequestMentorship(alumni)}
                        className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-xs font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-sm flex items-center space-x-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Request</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
