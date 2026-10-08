import React from 'react';
import { 
  Bell, 
  X, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  UserPlus, 
  ShieldCheck, 
  CheckCheck 
} from 'lucide-react';
import type { AppNotification } from '../types';

interface NotificationsCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: AppNotification) => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base">Smart Notifications</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark Read</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center pt-8">No notifications right now.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-slate-50 border-slate-100 opacity-75 hover:opacity-100'
                    : 'bg-cyan-50/60 border-cyan-200 shadow-sm hover:border-cyan-300'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {notif.type === 'mentorship_accept' && <Sparkles className="w-4 h-4 text-cyan-600" />}
                    {notif.type === 'event_reminder' && <Calendar className="w-4 h-4 text-amber-600" />}
                    {notif.type === 'opportunity' && <Briefcase className="w-4 h-4 text-emerald-600" />}
                    {notif.type === 'connection_req' && <UserPlus className="w-4 h-4 text-indigo-600" />}
                    {notif.type === 'verification_update' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}

                    <h4 className="font-bold text-xs text-slate-900">{notif.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 leading-snug pl-6">{notif.message}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
