import React from 'react';
import { Sparkles, CheckCircle2, ChevronRight, X, RefreshCw } from 'lucide-react';
import type { NavigationTab } from '../types';

interface DemoStep {
  stepIndex: number;
  title: string;
  description: string;
  targetTab: NavigationTab;
  actionText: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    stepIndex: 1,
    title: '1. Platform Launch',
    description: 'Explore the ALUMNEX home page hero, stats cards, and alumni connection graph.',
    targetTab: 'home',
    actionText: 'Next: Search AI/ML Alumni'
  },
  {
    stepIndex: 2,
    title: '2. Search AI/ML Alumni',
    description: 'Go to Alumni Directory and filter by AI/ML department or Machine Learning skills.',
    targetTab: 'alumni',
    actionText: 'Next: Filter Mentors'
  },
  {
    stepIndex: 3,
    title: '3. Smart Mentorship Matching',
    description: 'Navigate to "Mentorship" tab and launch the "Find My Mentor" matching engine.',
    targetTab: 'mentors',
    actionText: 'Next: View Match %'
  },
  {
    stepIndex: 4,
    title: '4. View Recommendation Match %',
    description: 'System displays "96% Match" recommendation with explanation breakdown.',
    targetTab: 'mentors',
    actionText: 'Next: Open Mentor Profile'
  },
  {
    stepIndex: 5,
    title: '5. Open Mentor Profile',
    description: 'View detailed alumni profile modal with career journey, education & achievements.',
    targetTab: 'alumni',
    actionText: 'Next: Send Mentorship Request'
  },
  {
    stepIndex: 6,
    title: '6. Send Mentorship Request',
    description: 'Click "Request Mentorship" button with instant modal confirmation feedback.',
    targetTab: 'mentors',
    actionText: 'Next: Discover AI Event'
  },
  {
    stepIndex: 7,
    title: '7. Discover AI Career Event',
    description: 'Explore "Generative AI Summit 2026" workshop in the Events & Engagement Hub.',
    targetTab: 'events',
    actionText: 'Next: Register for Event'
  },
  {
    stepIndex: 8,
    title: '8. Register for Event',
    description: 'Click "Register Now" to update event registration state & receive instant notification.',
    targetTab: 'events',
    actionText: 'Next: Browse Opportunities'
  },
  {
    stepIndex: 9,
    title: '9. Find Alumni-Posted Opportunity',
    description: 'Discover "Software Development Intern" posted by alumni Priya Sundaram at Razorpay.',
    targetTab: 'opportunities',
    actionText: 'Next: Connect with Alumnus'
  },
  {
    stepIndex: 10,
    title: '10. Connect & Network',
    description: 'Participate in the Networking Hub community feed to interact with alumni.',
    targetTab: 'network',
    actionText: 'Next: Admin Analytics & Verification'
  },
  {
    stepIndex: 11,
    title: '11. Admin Institutional Dashboard',
    description: 'Review total alumni analytics, department distribution, & Alumni Data Verification queue.',
    targetTab: 'admin-dashboard',
    actionText: 'Finish Demo Tour 🎉'
  }
];

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setActiveTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  isOpen,
  onClose,
  currentStep,
  setCurrentStep,
  setActiveTab,
  onShowToast
}) => {
  if (!isOpen) return null;

  const activeStepObj = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];

  const handleNextStep = () => {
    if (currentStep < DEMO_STEPS.length) {
      const next = currentStep + 1;
      setCurrentStep(next);
      const nextStepObj = DEMO_STEPS[next - 1];
      setActiveTab(nextStepObj.targetTab);
      onShowToast(`Step ${next}: Navigated to ${nextStepObj.targetTab.toUpperCase()}`, 'info');
    } else {
      onShowToast('Demo Journey Complete! All 11 hackathon requirements validated.', 'success');
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      const prevStepObj = DEMO_STEPS[prev - 1];
      setActiveTab(prevStepObj.targetTab);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-slate-900 border-2 border-cyan-500/80 rounded-2xl shadow-2xl p-5 text-white animate-fade-in backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-cyan-300">Hackathon Guided Demo Flow</h3>
            <p className="text-[11px] text-slate-400">Step {currentStep} of {DEMO_STEPS.length}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / DEMO_STEPS.length) * 100}%` }}
        />
      </div>

      <div className="bg-slate-800/60 rounded-xl p-3.5 mb-4 border border-slate-700/60">
        <h4 className="font-semibold text-xs text-white mb-1 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{activeStepObj.title}</span>
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">{activeStepObj.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => { setCurrentStep(1); setActiveTab('home'); }}
            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg"
            title="Restart Demo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={handleNextStep}
            className="flex items-center space-x-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-cyan-500/30 transition-transform active:scale-95"
          >
            <span>{activeStepObj.actionText}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
