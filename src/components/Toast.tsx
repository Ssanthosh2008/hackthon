import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-bounce-short">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
        type === 'success'
          ? 'bg-slate-900 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20'
          : 'bg-slate-900 text-cyan-300 border-cyan-500/40 shadow-cyan-500/20'
      }`}>
        {type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-cyan-400" />}
        <span>{message}</span>
        <button onClick={onClose} className="p-1 hover:text-white">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
