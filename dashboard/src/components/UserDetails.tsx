import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  Activity,
  User as UserIcon,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Briefcase,
  Star,
  Zap,
  Tag,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';
import { User, UserActivity, Gig } from '../types';

// Mock data for a specific user
const mockUser: User = {
  id: 'U12345',
  name: 'Damon Salvatore',
  email: 'damon@vamp.net',
  phone: '+1 (555) 123-4567',
  location: 'Mystic Falls, VA',
  tier: 'Pro',
  active: '12 hours ago',
  status: 'flagged',
  timeSpent: '142 hours',
  workDone: 48,
  hourlyRate: 85,
  skills: ['House Cleaning', 'Barbering', 'Lawn Mowing', 'Plumbing'],
  activities: [
    { id: 'A1', type: 'scam_report', description: 'Reported for non-payment after gig completion (House Cleaning)', status: 'critical', date: '2024-03-24 14:20', amount: 150 },
    { id: 'A2', type: 'dispute', description: 'Work not done properly - Client claims poor quality', status: 'pending', date: '2024-03-22 09:15' },
    { id: 'A3', type: 'payment', description: 'Payment received for Barbering gig', status: 'resolved', date: '2024-03-20 18:45', amount: 60 },
    { id: 'A4', type: 'gig_completion', description: 'Completed "Lawn Mowing" gig', status: 'resolved', date: '2024-03-18 11:30' },
    { id: 'A5', type: 'login', description: 'Login from new IP address (192.168.1.45)', status: 'resolved', date: '2024-03-15 22:10' },
  ],
  recentGigs: [
    { id: 'G1', title: 'Deep House Cleaning', client: 'Elena Gilbert', amount: 150, status: 'completed', date: '2024-03-24' },
    { id: 'G2', title: 'Professional Haircut', client: 'Stefan Salvatore', amount: 60, status: 'completed', date: '2024-03-20' },
    { id: 'G3', title: 'Garden Maintenance', client: 'Caroline Forbes', amount: 120, status: 'in_progress', date: '2024-03-26' },
    { id: 'G4', title: 'Emergency Plumbing', client: 'Alaric Saltzman', amount: 200, status: 'completed', date: '2024-03-15' },
  ]
};

export default function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState<'activity' | 'gigs'>('activity');
  const [filter, setFilter] = useState<'all' | 'critical' | 'pending' | 'resolved'>('all');

  const filteredActivities = user.activities.filter(a => 
    filter === 'all' ? true : a.status === filter
  );

  const handleStatusChange = (newStatus: 'verified' | 'flagged') => {
    setUser(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="p-2 bg-card border border-border rounded-xl group-hover:border-brand-500 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="font-black text-sm uppercase tracking-widest">Back to Registry</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => handleStatusChange('verified')}
            className={cn(
              "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg",
              user.status === 'verified' 
                ? "bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none" 
                : "bg-card border border-border text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            )}
          >
            <ShieldCheck size={18} />
            <span className="hidden xs:inline">Verify</span>
            <span className="xs:hidden">Verify</span>
          </button>
          <button 
            onClick={() => handleStatusChange('flagged')}
            className={cn(
              "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg",
              user.status === 'flagged' 
                ? "bg-rose-600 text-white shadow-rose-200 dark:shadow-none" 
                : "bg-card border border-border text-muted-foreground hover:bg-rose-50 dark:hover:bg-rose-900/20"
            )}
          >
            <ShieldAlert size={18} />
            <span className="hidden xs:inline">Flag</span>
            <span className="xs:hidden">Flag</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User Profile & Stats */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-card p-8 rounded-[2rem] border border-border shadow-sm text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-28 h-28 bg-brand-100 dark:bg-brand-900/30 rounded-[2rem] flex items-center justify-center text-brand-700 dark:text-brand-400 text-4xl font-black mx-auto mb-6 shadow-inner">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">{user.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{user.email}</p>
              
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className={cn(
                  "text-[10px] font-black uppercase px-3 py-1 rounded-full",
                  user.status === 'verified' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                  user.status === 'flagged' ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" :
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                )}>
                  {user.status}
                </span>
                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                  {user.tier} Tier
                </span>
              </div>

              <div className="mt-10 pt-8 border-t border-border space-y-5 text-left">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email</p>
                    <p className="text-sm font-bold text-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Phone</p>
                    <p className="text-sm font-bold text-foreground">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-foreground">{user.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Joined</p>
                    <p className="text-sm font-bold text-foreground">January 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-muted/50 rounded-full blur-3xl"></div>
          </div>

          {/* Skill & Rates Card */}
          <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2rem] text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Zap size={18} className="text-brand-400" />
                  Skills & Rates
                </h4>
                <div className="bg-brand-600 px-3 py-1 rounded-lg text-xs font-black">
                  {formatCurrency(user.hourlyRate)}/hr
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Work Done</p>
                  <p className="text-xl font-black text-white">{user.workDone} Gigs</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Spent</p>
                  <p className="text-xl font-black text-white">{user.timeSpent}</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-brand-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Right Column: Activity & Gigs */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden">
            {/* Tabs Header */}
            <div className="p-2 bg-muted/50 flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('activity')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black transition-all",
                  activeTab === 'activity' ? "bg-card text-brand-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Activity size={18} />
                Activity Monitoring
              </button>
              <button 
                onClick={() => setActiveTab('gigs')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black transition-all",
                  activeTab === 'gigs' ? "bg-card text-brand-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Briefcase size={18} />
                Recent Gigs
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'activity' ? (
                  <motion.div 
                    key="activity"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-foreground uppercase tracking-widest text-xs">Security Logs</h4>
                      <div className="flex items-center gap-2">
                        {(['all', 'critical', 'pending', 'resolved'] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cn(
                              "px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all",
                              filter === s 
                                ? "bg-brand-600 text-white shadow-lg shadow-brand-200 dark:shadow-none" 
                                : "bg-muted text-muted-foreground hover:bg-accent"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredActivities.map((activity, i) => (
                        <div 
                          key={activity.id}
                          className="p-6 bg-muted/30 rounded-2xl border border-border hover:border-brand-500/30 transition-all group"
                        >
                          <div className="flex gap-5">
                            <div className={cn(
                              "p-3 rounded-xl h-fit shadow-inner",
                              activity.status === 'critical' ? "bg-rose-100 dark:bg-rose-900/40 text-rose-600" :
                              activity.status === 'pending' ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600" :
                              "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                            )}>
                              {activity.type === 'scam_report' ? <ShieldAlert size={20} /> :
                               activity.type === 'dispute' ? <AlertTriangle size={20} /> :
                               activity.type === 'payment' ? <DollarSign size={20} /> :
                               <CheckCircle2 size={20} />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-black text-foreground capitalize tracking-tight">
                                  {activity.type.replace('_', ' ')}
                                </h4>
                                <span className="text-[10px] font-black text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
                                  <Clock size={12} />
                                  {activity.date}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 font-medium leading-relaxed">
                                {activity.description}
                              </p>
                              <div className="mt-6 flex items-center gap-4">
                                <button className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                                  <MessageSquare size={14} />
                                  Contact
                                </button>
                                <button className="text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:text-foreground">
                                  View Proof
                                </button>
                                {activity.status !== 'resolved' && (
                                  <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline ml-auto">
                                    Resolve
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="gigs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-foreground uppercase tracking-widest text-xs">Gig History</h4>
                      <p className="text-xs font-bold text-muted-foreground">{user.recentGigs.length} Total Gigs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.recentGigs.map((gig) => (
                        <div 
                          key={gig.id}
                          className="p-6 bg-card rounded-2xl border border-border hover:border-brand-500/30 transition-all group shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-muted rounded-lg text-brand-600">
                              <Tag size={16} />
                            </div>
                            <span className={cn(
                              "text-[10px] font-black uppercase px-2 py-0.5 rounded-lg",
                              gig.status === 'completed' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                              gig.status === 'in_progress' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                              "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                            )}>
                              {gig.status.replace('_', ' ')}
                            </span>
                          </div>
                          <h4 className="font-black text-foreground mb-1">{gig.title}</h4>
                          <p className="text-xs text-muted-foreground font-medium mb-4 flex items-center gap-1">
                            Client: <span className="text-foreground font-bold">{gig.client}</span>
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <p className="text-sm font-black text-brand-600">{formatCurrency(gig.amount)}</p>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{gig.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
