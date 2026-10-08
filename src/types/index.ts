export type NavigationTab = 
  | 'home'
  | 'alumni'
  | 'mentors'
  | 'events'
  | 'opportunities'
  | 'network'
  | 'student-dashboard'
  | 'alumni-dashboard'
  | 'admin-dashboard'
  | 'notifications';

export type VerificationStatus = 'verified' | 'pending' | 'rejected';

export interface AlumniProfile {
  id: string;
  name: string;
  avatar: string;
  gradYear: number;
  department: string;
  currentRole: string;
  company: string;
  companyLogo?: string;
  location: string;
  industry: string;
  bio: string;
  skills: string[];
  mentorshipAvailable: boolean;
  mentorshipDomains?: string[];
  verificationStatus: VerificationStatus;
  email: string;
  linkedin: string;
  github?: string;
  phone?: string;
  stats: {
    connections: number;
    menteesAssisted: number;
    endorsements: number;
  };
  careerJourney: {
    period: string;
    role: string;
    company: string;
    description: string;
  }[];
  education: {
    degree: string;
    department: string;
    year: string;
    cgpa?: string;
  }[];
  projects: {
    title: string;
    description: string;
    link?: string;
  }[];
  achievements: string[];
}

export interface Mentor {
  id: string;
  alumniId: string;
  alumni: AlumniProfile;
  domain: string;
  experienceLevel: 'Senior (7+ yrs)' | 'Mid-Level (3-7 yrs)' | 'Junior Alumni (1-3 yrs)';
  maxMentees: number;
  activeMentees: number;
  rating: number;
  preferredType: '1-on-1 Sessions' | 'Resume Review' | 'Mock Interviews' | 'Career Guidance' | 'Project Feedback';
  matchScore?: number;
  matchReasons?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  banner: string;
  date: string;
  time: string;
  venue: string;
  category: 'Alumni Meet' | 'Career Talk' | 'Workshop' | 'Networking' | 'Webinar' | 'College Event';
  speaker: string;
  speakerRole: string;
  speakerCompany: string;
  speakerAvatar: string;
  attendeesCount: number;
  maxAttendees: number;
  isRegistered: boolean;
  isPast: boolean;
  locationType: 'Online' | 'In-Person';
  meetingLink?: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  timestamp: string;
  content: string;
}

export interface NetworkingPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  authorCompany?: string;
  authorBadge: 'Alumni' | 'Student' | 'Faculty' | 'Mentor';
  timestamp: string;
  category: 'Career' | 'Jobs' | 'Internships' | 'Projects' | 'Achievements' | 'Community';
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  comments: PostComment[];
  isSaved: boolean;
}

export interface OpportunityItem {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  role: string;
  industry: string;
  location: string;
  workType: 'Remote' | 'On-site' | 'Hybrid';
  type: 'Job' | 'Internship' | 'Referral' | 'Freelance';
  experienceLevel: 'Entry-Level' | 'Mid-Senior' | 'Intern';
  stipendOrSalary: string;
  skills: string[];
  postedByAlumniId: string;
  postedByAlumniName: string;
  postedByAlumniAvatar: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  isApplied: boolean;
}

export interface MentorshipRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentDepartment: string;
  studentYear: string;
  mentorId: string;
  mentorName: string;
  careerGoal: string;
  domain: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  dateSubmitted: string;
}

export interface AppNotification {
  id: string;
  type: 'mentorship_req' | 'mentorship_accept' | 'event_reminder' | 'opportunity' | 'connection_req' | 'verification_update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetTab?: NavigationTab;
}

export interface StudentProgress {
  profileCompletion: number;
  mentorshipSessionsCompleted: number;
  connectionsCount: number;
  eventsAttended: number;
  applicationsSubmitted: number;
}

export interface MentorshipMatchingFilter {
  careerGoal: string;
  interestedDomain: string;
  skills: string[];
  preferredLocation: string;
  experienceLevel: string;
  preferredMentorshipType: string;
}
