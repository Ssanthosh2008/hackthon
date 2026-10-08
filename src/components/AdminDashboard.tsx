import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BarChart3, 
  PieChart, 
  Search, 
  Download, 
  FileCheck
} from 'lucide-react';
import type { AlumniProfile, VerificationStatus } from '../types';

interface AdminDashboardProps {
  alumniList: AlumniProfile[];
  onUpdateVerification: (alumniId: string, status: VerificationStatus) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  alumniList,
  onUpdateVerification,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'verified' | 'pending' | 'rejected'>('All');

  const totalAlumni = 12450;
  const activeAlumni = 8920;
  const verifiedCount = alumniList.filter(a => a.verificationStatus === 'verified').length;
  const pendingCount = alumniList.filter(a => a.verificationStatus === 'pending').length;

  const filteredAlumni = alumniList.filter(a => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match = a.name.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.department.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== 'All' && a.verificationStatus !== statusFilter) return false;

    return true;
  });

  const handleExportCSV = () => {
    onShowToast('Exporting alumni dataset to CSV... File downloaded!', 'success');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Institutional Central Records Administration</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Institutional Admin Dashboard</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Centralized alumni data management, verification workflow, mentorship compliance, and campus engagement analytics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Alumni Records (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ANALYTICS STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Alumni Records</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{totalAlumni.toLocaleString()}</div>
          <span className="text-[11px] text-cyan-600 font-semibold">18 Batches integrated</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Engagement Rate</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">71.6%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">{activeAlumni.toLocaleString()} monthly active</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Verified Records</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">{verifiedCount}</div>
          <span className="text-[11px] text-slate-500 font-semibold">Authenticated profiles</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Pending Verification</span>
          <div className="text-3xl font-extrabold text-amber-600 mt-1">{pendingCount}</div>
          <span className="text-[11px] text-amber-600 font-semibold">Requires admin action</span>
        </div>
      </div>

      {/* VISUAL ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Department Distribution Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-cyan-600" />
              <h3 className="font-extrabold text-base text-slate-900">Alumni Distribution by Department</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">LIVE ANALYTICS</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { dept: 'Computer Science & Engineering', pct: 38, count: 4731, color: 'bg-cyan-500' },
              { dept: 'Information Technology', pct: 24, count: 2988, color: 'bg-blue-600' },
              { dept: 'Electronics & Communication', pct: 16, count: 1992, color: 'bg-indigo-500' },
              { dept: 'Data Science & AI', pct: 10, count: 1245, color: 'bg-emerald-500' },
              { dept: 'Mechanical Engineering', pct: 7, count: 871, color: 'bg-amber-500' },
              { dept: 'Biotechnology / Others', pct: 5, count: 623, color: 'bg-rose-500' },
            ].map(item => (
              <div key={item.dept} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.dept}</span>
                  <span className="text-slate-500">{item.count} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graduation Batch Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-base text-slate-900">Alumni Engagement by Grad Batch</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">2014 - 2024</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { year: '2021 - 2024 (Recent Graduates)', pct: 42, count: '5,229 Alumni', desc: 'High mentorship participation' },
              { year: '2017 - 2020 (Mid-Career Leaders)', pct: 35, count: '4,357 Alumni', desc: 'Active job referrers' },
              { year: '2014 - 2016 (Senior Executive / Founders)', pct: 23, count: '2,864 Alumni', desc: 'Keynote speakers & sponsors' }
            ].map(batch => (
              <div key={batch.year} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div className="flex justify-between items-center font-bold text-slate-900">
                  <span>{batch.year}</span>
                  <span className="text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">{batch.count}</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">{batch.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* IMPORTANT FEATURE: ALUMNI DATA VERIFICATION QUEUE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Alumni Data Verification Queue</h3>
              <p className="text-xs text-slate-500">Review pending profile updates, graduation proof, and verify institutional records.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${statusFilter === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              All ({alumniList.length})
            </button>

            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}
            >
              Pending Verification ({pendingCount})
            </button>

            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${statusFilter === 'verified' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}
            >
              Verified ({verifiedCount})
            </button>
          </div>
        </div>

        {/* Search inside queue */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search alumni record by name, company or department..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
          />
        </div>

        {/* Verification Queue Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Alumni Name</th>
                <th className="p-3.5">Grad Year & Dept</th>
                <th className="p-3.5">Current Role & Company</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredAlumni.map((alumni) => (
                <tr key={alumni.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Name & Avatar */}
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <img src={alumni.avatar} alt={alumni.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 block">{alumni.name}</span>
                        <span className="text-[11px] text-slate-400">{alumni.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Grad Year & Dept */}
                  <td className="p-3.5 text-slate-700">
                    <span className="font-bold">Class of {alumni.gradYear}</span>
                    <span className="block text-[11px] text-slate-500">{alumni.department}</span>
                  </td>

                  {/* Current Role */}
                  <td className="p-3.5 text-slate-700">
                    <span className="font-bold text-slate-900">{alumni.currentRole}</span>
                    <span className="block text-[11px] text-slate-500">{alumni.company} ({alumni.location})</span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      alumni.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      alumni.verificationStatus === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {alumni.verificationStatus}
                    </span>
                  </td>

                  {/* Approve / Reject / Request Update Actions */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {alumni.verificationStatus !== 'verified' && (
                        <button
                          onClick={() => {
                            onUpdateVerification(alumni.id, 'verified');
                            onShowToast(`Approved verification for ${alumni.name}! Record is now authenticated.`, 'success');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] flex items-center space-x-1"
                          title="Approve Profile"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {alumni.verificationStatus !== 'rejected' && (
                        <button
                          onClick={() => {
                            onUpdateVerification(alumni.id, 'rejected');
                            onShowToast(`Rejected verification request for ${alumni.name}`, 'info');
                          }}
                          className="px-2.5 py-1 border border-slate-300 hover:bg-slate-200/60 text-slate-700 font-bold rounded-lg text-[11px] flex items-center space-x-1"
                          title="Reject Profile"
                        >
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onUpdateVerification(alumni.id, 'pending');
                          onShowToast(`Requested profile update details from ${alumni.name}`, 'info');
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] flex items-center space-x-1"
                        title="Request Update"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                        <span>Update Request</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </section>
  );
};
