import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Bell, 
  Users, 
  UserCheck, 
  Calendar, 
  Briefcase, 
  MessageSquare, 
  LayoutDashboard, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import type { NavigationTab, AppNotification } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  notifications: AppNotification[];
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onStartDemoTour: () => void;
  userRole: 'student' | 'alumni' | 'admin';
  setUserRole: (role: 'student' | 'alumni' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  notifications,
  onOpenSearch,
  onOpenNotifications,
  onStartDemoTour,
  userRole,
  setUserRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'alumni', label: 'Alumni Directory', icon: <Users className="w-4 h-4" /> },
    { id: 'mentors', label: 'Mentorship', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'network', label: 'Network Hub', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const dashboardTab: NavigationTab = 
    userRole === 'student' ? 'student-dashboard' :
    userRole === 'alumni' ? 'alumni-dashboard' : 'admin-dashboard';

  const handleTabClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-wider text-white">ALUMN<span className="text-cyan-400">EX</span></span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md uppercase tracking-wider">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Smart Alumni & Mentorship Platform</p>
            </div>
          </div>

          {/* Search Trigger Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <button
              onClick={onOpenSearch}
              className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 rounded-xl py-1.5 px-3.5 flex items-center justify-between text-xs transition-all shadow-inner group"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Global Search (Alumni, Jobs...)</span>
              </span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-slate-700 text-slate-300 rounded font-mono border border-slate-600">Ctrl K</kbd>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center space-x-3">

            {/* Guided Interactive Demo Button */}
            <button
              onClick={onStartDemoTour}
              className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md shadow-cyan-500/20 transition-all transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Demo Tour</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Smart Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role / Dashboard Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                  {userRole === 'student' ? 'S' : userRole === 'alumni' ? 'A' : 'AD'}
                </div>
                <span className="capitalize font-medium hidden sm:inline">{userRole} View</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Switch Active Persona
                  </div>
                  
                  <button
                    onClick={() => { setUserRole('student'); setActiveTab('student-dashboard'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 ${userRole === 'student' ? 'text-cyan-400 font-semibold' : 'text-slate-300'}`}
                  >
                    <span className="flex items-center space-x-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Student Dashboard</span>
                    </span>
                    {userRole === 'student' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>

                  <button
                    onClick={() => { setUserRole('alumni'); setActiveTab('alumni-dashboard'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 ${userRole === 'alumni' ? 'text-cyan-400 font-semibold' : 'text-slate-300'}`}
                  >
                    <span className="flex items-center space-x-2">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Alumni Dashboard</span>
                    </span>
                    {userRole === 'alumni' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>

                  <button
                    onClick={() => { setUserRole('admin'); setActiveTab('admin-dashboard'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 ${userRole === 'admin' ? 'text-cyan-400 font-semibold' : 'text-slate-300'}`}
                  >
                    <span className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Admin Portal</span>
                    </span>
                    {userRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Dashboard Quick Access */}
            <button
              onClick={() => handleTabClick(dashboardTab)}
              className={`p-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
                activeTab.includes('dashboard')
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
              title="Go to Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden xl:inline">Dashboard</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <div className="mb-3">
            <button
              onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
              className="w-full bg-slate-800 text-slate-400 border border-slate-700 rounded-lg py-2 px-3 flex items-center space-x-2 text-xs"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Global Search across platform...</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-2 p-2.5 rounded-lg text-xs font-medium text-left ${
                  activeTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/60 text-slate-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onStartDemoTour}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 rounded-lg text-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch Hackathon Demo Tour</span>
          </button>
        </div>
      )}
    </header>
  );
};
