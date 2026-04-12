import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock,
  UserPlus,
  DollarSign,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const notifications = [
  {
    id: '1',
    title: 'New Enterprise Signup',
    message: 'Global Logistics Inc. has joined the platform as an Enterprise Hirer.',
    type: 'success',
    time: '2 mins ago',
    icon: UserPlus,
    unread: true
  },
  {
    id: '2',
    title: 'System Alert: Database Latency',
    message: 'Primary DB is experiencing higher than normal latency (450ms).',
    type: 'warning',
    time: '15 mins ago',
    icon: ShieldAlert,
    unread: true
  },
  {
    id: '3',
    title: 'Payout Processed',
    message: 'Monthly payouts for 12,450 users have been successfully processed.',
    type: 'info',
    time: '1 hour ago',
    icon: DollarSign,
    unread: false
  },
  {
    id: '4',
    title: 'New Gig Category Requested',
    message: 'Users in the London area are requesting "Pet Grooming" services.',
    type: 'info',
    time: '3 hours ago',
    icon: Info,
    unread: false
  },
  {
    id: '5',
    title: 'Security Audit Complete',
    message: 'Weekly automated security scan found 0 vulnerabilities.',
    type: 'success',
    time: '5 hours ago',
    icon: CheckCircle2,
    unread: false
  }
];

export default function Notifications() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground text-sm mt-1">Stay updated with platform events and system alerts.</p>
        </div>
        <button className="text-sm font-bold text-brand-600 hover:underline w-fit">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-4 rounded-2xl border transition-all relative group",
              notif.unread 
                ? "bg-card border-brand-100 dark:border-brand-900/30 shadow-sm" 
                : "bg-muted/50 border-border"
            )}
          >
            {notif.unread && (
              <div className="absolute top-4 right-4 w-2 h-2 bg-brand-500 rounded-full"></div>
            )}
            <div className="flex gap-4">
              <div className={cn(
                "p-3 rounded-xl h-fit",
                notif.type === 'success' ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" :
                notif.type === 'warning' ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600" :
                "bg-brand-50 dark:bg-brand-900/20 text-brand-600"
              )}>
                <notif.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "font-bold text-sm",
                    notif.unread ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {notif.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {notif.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <div className="mt-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-bold text-brand-600 hover:underline">View Details</button>
                  <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Dismiss</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
