import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingHero } from './components/LandingHero';
import { AlumniDirectory } from './components/AlumniDirectory';
import { AlumniProfileModal } from './components/AlumniProfileModal';
import { SmartMentorshipMatching } from './components/SmartMentorshipMatching';
import { EventsEngagement } from './components/EventsEngagement';
import { NetworkingHub } from './components/NetworkingHub';
import { JobBoard } from './components/JobBoard';
import { StudentDashboard } from './components/StudentDashboard';
import { AlumniDashboard } from './components/AlumniDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { NotificationsCenter } from './components/NotificationsCenter';
import { GlobalSearchResultModal } from './components/GlobalSearchResultModal';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';
import { SmartInsightsWidget } from './components/SmartInsightsWidget';
import { Toast } from './components/Toast';

import type { 
  NavigationTab, 
  AlumniProfile, 
  Mentor, 
  EventItem, 
  OpportunityItem, 
  NetworkingPost, 
  AppNotification, 
  MentorshipRequest, 
  VerificationStatus 
} from './types';

import { 
  INITIAL_ALUMNI, 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_POSTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_MENTORSHIP_REQUESTS, 
  INITIAL_STUDENT_PROGRESS 
} from './data/mockData';

export function App() {
  // Global Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [userRole, setUserRole] = useState<'student' | 'alumni' | 'admin'>('student');

  // Application Data States (Interactive Frontend Mutations)
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>(INITIAL_ALUMNI);
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(INITIAL_OPPORTUNITIES);
  const [posts, setPosts] = useState<NetworkingPost[]>(INITIAL_POSTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>(INITIAL_MENTORSHIP_REQUESTS);
  const [connectedAlumniIds, setConnectedAlumniIds] = useState<string[]>(['alm-1', 'alm-2']);

  // Modal States
  const [selectedAlumniModal, setSelectedAlumniModal] = useState<AlumniProfile | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Guided Demo Tour State
  const [demoTourOpen, setDemoTourOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // HANDLERS FOR USER ACTIONS
  const handleConnectAlumni = (alumni: AlumniProfile) => {
    if (connectedAlumniIds.includes(alumni.id)) {
      setConnectedAlumniIds(connectedAlumniIds.filter(id => id !== alumni.id));
      showToast(`Disconnected from ${alumni.name}`, 'info');
    } else {
      setConnectedAlumniIds([...connectedAlumniIds, alumni.id]);
      showToast(`Connection request sent to ${alumni.name}!`, 'success');
      
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'connection_req',
        title: 'Connection Request Sent',
        message: `You requested to connect with ${alumni.name} (${alumni.company}).`,
        timestamp: 'Just now',
        read: false,
        targetTab: 'alumni'
      };
      setNotifications([newNotif, ...notifications]);
    }
  };

  const handleRequestMentorshipSubmit = (mentorId: string, mentorName: string, careerGoal: string, message: string) => {
    const newReq: MentorshipRequest = {
      id: `req-${Date.now()}`,
      studentName: 'Alex Morgan',
      studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      studentDepartment: 'Computer Science & Engineering',
      studentYear: 'Final Year B.Tech',
      mentorId,
      mentorName,
      careerGoal,
      domain: 'AI & Data Science',
      message,
      status: 'Pending',
      dateSubmitted: 'Oct 08, 2026'
    };

    setMentorshipRequests([newReq, ...mentorshipRequests]);
    showToast(`Mentorship request successfully sent to ${mentorName}!`, 'success');

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'mentorship_req',
      title: 'Mentorship Request Submitted',
      message: `Your request was delivered to ${mentorName}. Expect a response within 24 hours.`,
      timestamp: 'Just now',
      read: false,
      targetTab: 'student-dashboard'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleToggleEventRegister = (eventId: string) => {
    setEvents(events.map(e => {
      if (e.id === eventId) {
        const nextState = !e.isRegistered;
        showToast(
          nextState ? `Successfully registered for "${e.title}"!` : `Cancelled registration for "${e.title}"`,
          nextState ? 'success' : 'info'
        );
        return {
          ...e,
          isRegistered: nextState,
          attendeesCount: nextState ? e.attendeesCount + 1 : e.attendeesCount - 1
        };
      }
      return e;
    }));
  };

  const handleTogglePostLike = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const nextState = !p.isLiked;
        return {
          ...p,
          isLiked: nextState,
          likesCount: nextState ? p.likesCount + 1 : p.likesCount - 1
        };
      }
      return p;
    }));
  };

  const handleTogglePostSave = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const nextState = !p.isSaved;
        showToast(nextState ? 'Post saved to your bookmarks!' : 'Removed post from bookmarks', 'info');
        return { ...p, isSaved: nextState };
      }
      return p;
    }));
  };

  const handleAddPostComment = (postId: string, commentText: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `c-${Date.now()}`,
          authorName: 'Alex Morgan (Student)',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          authorRole: 'Student',
          timestamp: 'Just now',
          content: commentText
        };
        showToast('Comment posted!', 'success');
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (newPost: Partial<NetworkingPost>) => {
    const postObj: NetworkingPost = {
      id: `post-${Date.now()}`,
      authorId: 'user-student',
      authorName: newPost.authorName || 'Alex Morgan',
      authorAvatar: newPost.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      authorRole: newPost.authorRole || 'Student',
      authorBadge: 'Student',
      timestamp: 'Just now',
      category: newPost.category || 'Career',
      title: newPost.title || 'Untitled Post',
      content: newPost.content || '',
      tags: newPost.tags || ['Campus'],
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      comments: [],
      isSaved: false
    };

    setPosts([postObj, ...posts]);
  };

  const handleApplyOpportunity = (opportunityId: string) => {
    setOpportunities(opportunities.map(o => {
      if (o.id === opportunityId) {
        return { ...o, isApplied: true };
      }
      return o;
    }));
  };

  const handleAcceptMentorshipRequest = (requestId: string) => {
    setMentorshipRequests(mentorshipRequests.map(r => {
      if (r.id === requestId) {
        showToast(`Accepted mentorship request from ${r.studentName}!`, 'success');
        return { ...r, status: 'Accepted' };
      }
      return r;
    }));
  };

  const handleDeclineMentorshipRequest = (requestId: string) => {
    setMentorshipRequests(mentorshipRequests.map(r => {
      if (r.id === requestId) {
        showToast(`Declined request from ${r.studentName}`, 'info');
        return { ...r, status: 'Declined' };
      }
      return r;
    }));
  };

  const handleUpdateVerification = (alumniId: string, status: VerificationStatus) => {
    setAlumniList(alumniList.map(a => {
      if (a.id === alumniId) {
        return { ...a, verificationStatus: status };
      }
      return a;
    }));
  };

  const handleSelectNotification = (notif: AppNotification) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    setNotificationsOpen(false);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onStartDemoTour={() => { setDemoTourOpen(true); setDemoStep(1); setActiveTab('home'); }}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* LANDING PAGE (HOME) */}
        {activeTab === 'home' && (
          <>
            <LandingHero
              onNavigate={setActiveTab}
              onOpenMentorshipMatching={() => setActiveTab('mentors')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SmartInsightsWidget
                mentors={mentors}
                alumni={alumniList}
                events={events}
                opportunities={opportunities}
                onNavigate={setActiveTab}
                onSelectAlumni={setSelectedAlumniModal}
              />
            </div>

            {/* Quick Teaser Sections */}
            <div className="bg-white border-t border-slate-200 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AlumniDirectory
                  alumniList={alumniList.slice(0, 6)}
                  onSelectAlumni={setSelectedAlumniModal}
                  onRequestMentorship={() => { setActiveTab('mentors'); }}
                  onConnect={handleConnectAlumni}
                  connectedIds={connectedAlumniIds}
                />
              </div>
            </div>
          </>
        )}

        {/* SECTION 1 — SMART ALUMNI DIRECTORY */}
        {activeTab === 'alumni' && (
          <AlumniDirectory
            alumniList={alumniList}
            onSelectAlumni={setSelectedAlumniModal}
            onRequestMentorship={() => { setActiveTab('mentors'); }}
            onConnect={handleConnectAlumni}
            connectedIds={connectedAlumniIds}
          />
        )}

        {/* SECTION 3 — SMART MENTORSHIP MATCHING */}
        {activeTab === 'mentors' && (
          <SmartMentorshipMatching
            mentors={mentors}
            onSelectAlumni={setSelectedAlumniModal}
            onSubmitRequest={handleRequestMentorshipSubmit}
          />
        )}

        {/* SECTION 4 — EVENTS & ENGAGEMENT */}
        {activeTab === 'events' && (
          <EventsEngagement
            events={events}
            onToggleRegister={handleToggleEventRegister}
            onShowToast={showToast}
          />
        )}

        {/* SECTION 5 — NETWORKING HUB */}
        {activeTab === 'network' && (
          <NetworkingHub
            posts={posts}
            onToggleLike={handleTogglePostLike}
            onToggleSave={handleTogglePostSave}
            onAddComment={handleAddPostComment}
            onCreatePost={handleCreatePost}
            onShowToast={showToast}
          />
        )}

        {/* SECTION 6 — JOB & OPPORTUNITY BOARD */}
        {activeTab === 'opportunities' && (
          <JobBoard
            opportunities={opportunities}
            onApply={handleApplyOpportunity}
            onShowToast={showToast}
          />
        )}

        {/* SECTION 7 — STUDENT DASHBOARD */}
        {activeTab === 'student-dashboard' && (
          <StudentDashboard
            progress={INITIAL_STUDENT_PROGRESS}
            savedAlumni={alumniList.filter(a => connectedAlumniIds.includes(a.id))}
            registeredEvents={events.filter(e => e.isRegistered)}
            opportunities={opportunities}
            mentorshipRequests={mentorshipRequests}
            onNavigate={setActiveTab}
            onSelectAlumni={setSelectedAlumniModal}
          />
        )}

        {/* SECTION 8 — ALUMNI DASHBOARD */}
        {activeTab === 'alumni-dashboard' && (
          <AlumniDashboard
            requests={mentorshipRequests}
            onAcceptRequest={handleAcceptMentorshipRequest}
            onDeclineRequest={handleDeclineMentorshipRequest}
            onNavigate={setActiveTab}
          />
        )}

        {/* SECTION 9 — ADMIN / INSTITUTION DASHBOARD */}
        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            alumniList={alumniList}
            onUpdateVerification={handleUpdateVerification}
            onShowToast={showToast}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* MODALS & OVERLAYS */}
      <AlumniProfileModal
        alumni={selectedAlumniModal}
        onClose={() => setSelectedAlumniModal(null)}
        onRequestMentorship={() => { setSelectedAlumniModal(null); setActiveTab('mentors'); }}
        onConnect={handleConnectAlumni}
        isConnected={selectedAlumniModal ? connectedAlumniIds.includes(selectedAlumniModal.id) : false}
        onShowToast={showToast}
      />

      <GlobalSearchResultModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        alumniList={alumniList}
        mentors={mentors}
        events={events}
        opportunities={opportunities}
        posts={posts}
        onNavigate={setActiveTab}
        onSelectAlumni={setSelectedAlumniModal}
      />

      <NotificationsCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
      />

      <InteractiveDemoModal
        isOpen={demoTourOpen}
        onClose={() => setDemoTourOpen(false)}
        currentStep={demoStep}
        setCurrentStep={setDemoStep}
        setActiveTab={setActiveTab}
        onShowToast={showToast}
      />

      {/* Global Toast Alert */}
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />

    </div>
  );
}
