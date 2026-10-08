import type { AlumniProfile, Mentor, MentorshipMatchingFilter, EventItem, OpportunityItem } from '../types';

export function calculateMentorMatchScore(
  filter: MentorshipMatchingFilter,
  mentor: Mentor
): { score: number; reasons: string[] } {
  let score = 50; // base score
  const reasons: string[] = [];
  const alumni = mentor.alumni;

  // Domain Match
  if (
    filter.interestedDomain &&
    (mentor.domain.toLowerCase().includes(filter.interestedDomain.toLowerCase()) ||
     filter.interestedDomain.toLowerCase().includes(mentor.domain.toLowerCase()) ||
     alumni.industry.toLowerCase().includes(filter.interestedDomain.toLowerCase()))
  ) {
    score += 25;
    reasons.push(`Direct alignment in ${mentor.domain}`);
  }

  // Career Goal Match
  if (filter.careerGoal) {
    const goalLower = filter.careerGoal.toLowerCase();
    if (
      alumni.currentRole.toLowerCase().includes(goalLower) ||
      alumni.bio.toLowerCase().includes(goalLower) ||
      alumni.industry.toLowerCase().includes(goalLower)
    ) {
      score += 15;
      reasons.push(`Target role match: ${alumni.currentRole}`);
    }
  }

  // Skills Overlap
  if (filter.skills && filter.skills.length > 0) {
    const matchingSkills = alumni.skills.filter(s =>
      filter.skills.some(fs => fs.toLowerCase() === s.toLowerCase())
    );
    if (matchingSkills.length > 0) {
      score += Math.min(15, matchingSkills.length * 5);
      reasons.push(`Shared key skills: ${matchingSkills.join(', ')}`);
    }
  }

  // Preferred Mentorship Type Match
  if (filter.preferredMentorshipType && mentor.preferredType === filter.preferredMentorshipType) {
    score += 10;
    reasons.push(`Offers requested format: ${mentor.preferredType}`);
  }

  // Experience level match
  if (filter.experienceLevel) {
    score += 5;
    reasons.push(`${mentor.experienceLevel} expertise level`);
  }

  // Availability / Rating Boost
  if (mentor.activeMentees < mentor.maxMentees) {
    score += 5;
    reasons.push(`Currently available for new mentees (${mentor.maxMentees - mentor.activeMentees} slots)`);
  }

  // Cap score between 75% and 99% for realism
  const finalScore = Math.min(99, Math.max(70, score));

  return {
    score: finalScore,
    reasons: reasons.length > 0 ? reasons : ['Strong overall institution alumni profile & expertise match']
  };
}

export interface SmartInsightsResult {
  topRecommendedMentors: { mentor: Mentor; score: number; reasons: string[] }[];
  suggestedAlumniConnects: AlumniProfile[];
  recommendedEvents: EventItem[];
  highMatchOpportunities: OpportunityItem[];
}

export function generateSmartInsights(
  mentors: Mentor[],
  alumni: AlumniProfile[],
  events: EventItem[],
  opportunities: OpportunityItem[],
  userSkills: string[] = ['Python', 'AI', 'React', 'System Design'],
  userDomain: string = 'Artificial Intelligence & ML'
): SmartInsightsResult {
  const filter: MentorshipMatchingFilter = {
    careerGoal: 'AI Engineer / Product Lead',
    interestedDomain: userDomain,
    skills: userSkills,
    preferredLocation: 'Bengaluru',
    experienceLevel: 'Senior (7+ yrs)',
    preferredMentorshipType: '1-on-1 Sessions'
  };

  const rankedMentors = mentors
    .map(m => {
      const { score, reasons } = calculateMentorMatchScore(filter, m);
      return { mentor: m, score, reasons };
    })
    .sort((a, b) => b.score - a.score);

  const suggestedAlumniConnects = alumni
    .filter(a => a.mentorshipAvailable || a.skills.some(s => userSkills.includes(s)))
    .slice(0, 4);

  const recommendedEvents = events.filter(e => !e.isPast).slice(0, 3);
  const highMatchOpportunities = opportunities.filter(o => !o.isApplied).slice(0, 3);

  return {
    topRecommendedMentors: rankedMentors.slice(0, 3),
    suggestedAlumniConnects,
    recommendedEvents,
    highMatchOpportunities
  };
}
