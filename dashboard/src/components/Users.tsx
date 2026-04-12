import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Eye, 
  Lock, 
  ShieldCheck,
  Mail,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockUsers = [
  { id: 'U1', name: 'Marcus Aurelius', email: 'marcus@rome.gov', phone: '+1 (555) 001-0001', location: 'Rome, Italy', tier: 'Enterprise', active: '2 mins ago', status: 'verified', joinDate: '2024-01-15', timeSpent: '250 hours', workDone: 120, hourlyRate: 150, skills: ['Leadership', 'Philosophy'], activities: [], recentGigs: [] },
  { id: 'U2', name: 'Elena Gilbert', email: 'elena@mystic.com', phone: '+1 (555) 002-0002', location: 'Mystic Falls, VA', tier: 'Pro', active: '1 hour ago', status: 'verified', joinDate: '2024-02-10', timeSpent: '85 hours', workDone: 32, hourlyRate: 45, skills: ['Writing', 'Nursing'], activities: [], recentGigs: [] },
  { id: 'U3', name: 'Damon Salvatore', email: 'damon@vamp.net', phone: '+1 (555) 003-0003', location: 'Mystic Falls, VA', tier: 'Free', active: '12 hours ago', status: 'flagged', joinDate: '2024-02-12', timeSpent: '142 hours', workDone: 48, hourlyRate: 85, skills: ['Barbering', 'Plumbing'], activities: [], recentGigs: [] },
  { id: 'U4', name: 'Stefan Salvatore', email: 'stefan@vamp.net', phone: '+1 (555) 004-0004', location: 'Mystic Falls, VA', tier: 'Enterprise', active: 'Just now', status: 'verified', joinDate: '2024-01-20', timeSpent: '310 hours', workDone: 156, hourlyRate: 120, skills: ['Counseling', 'Animal Care'], activities: [], recentGigs: [] },
  { id: 'U5', name: 'Bonnie Bennett', email: 'bonnie@witch.org', phone: '+1 (555) 005-0005', location: 'Mystic Falls, VA', tier: 'Pro', active: '3 days ago', status: 'pending', joinDate: '2024-03-05', timeSpent: '45 hours', workDone: 12, hourlyRate: 95, skills: ['Event Planning'], activities: [], recentGigs: [] },
  { id: 'U6', name: 'Caroline Forbes', email: 'caroline@cheer.com', phone: '+1 (555) 006-0006', location: 'Mystic Falls, VA', tier: 'Pro', active: '5 mins ago', status: 'verified', joinDate: '2024-02-28', timeSpent: '110 hours', workDone: 54, hourlyRate: 65, skills: ['Marketing', 'Public Relations'], activities: [], recentGigs: [] },
  { id: 'U7', name: 'Alaric Saltzman', email: 'alaric@history.edu', phone: '+1 (555) 007-0007', location: 'Mystic Falls, VA', tier: 'Free', active: '1 week ago', status: 'verified', joinDate: '2024-01-05', timeSpent: '20 hours', workDone: 5, hourlyRate: 55, skills: ['Teaching', 'Research'], activities: [], recentGigs: [] },
  { id: 'U8', name: 'Tyler Lockwood', email: 'tyler@wolf.com', phone: '+1 (555) 008-0008', location: 'Mystic Falls, VA', tier: 'Free', active: '2 days ago', status: 'flagged', joinDate: '2024-03-15', timeSpent: '15 hours', workDone: 3, hourlyRate: 40, skills: ['Fitness Coaching'], activities: [], recentGigs: [] },
];

export default function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Registry</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage, monitor and verify platform users.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-full sm:w-auto bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 dark:shadow-none">
            <UserPlus size={18} />
            Add New User
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or UID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:flex-none px-4 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="flagged">Flagged</option>
            <option value="pending">Pending</option>
          </select>
          <button className="p-2.5 bg-muted border border-border rounded-xl text-muted-foreground hover:text-brand-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account Tier</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Security Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="hover:bg-accent/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-700 dark:text-brand-400 text-sm font-bold group-hover:scale-110 transition-transform">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{user.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-black uppercase px-2 py-1 rounded-lg",
                        user.tier === 'Enterprise' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" :
                        user.tier === 'Pro' ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {user.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground font-medium">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === 'verified' ? "bg-emerald-500" :
                          user.status === 'flagged' ? "bg-rose-500" : "bg-amber-500"
                        )}></div>
                        <span className="text-xs font-bold text-foreground capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/users/${user.id}`); }}
                          className="p-2 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors" 
                          title="View Activities"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors" 
                          title="Lock Account"
                        >
                          <Lock size={18} />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors" 
                          title="More Options"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <AlertCircle size={40} />
                      <p className="text-sm font-medium">No users found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-muted/50 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            Showing {filteredUsers.length} of {mockUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:bg-card border border-transparent hover:border-border rounded-lg transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 text-xs font-bold bg-brand-600 text-white rounded-lg">1</button>
              <button className="w-8 h-8 text-xs font-bold text-muted-foreground hover:bg-card rounded-lg">2</button>
              <button className="w-8 h-8 text-xs font-bold text-muted-foreground hover:bg-card rounded-lg">3</button>
            </div>
            <button className="p-2 text-muted-foreground hover:bg-card border border-transparent hover:border-border rounded-lg transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <UserCheck size={20} />
            <h4 className="font-bold text-sm">Verified Users</h4>
          </div>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">85.4%</p>
          <p className="text-xs text-emerald-600/70 mt-1">+2.1% from last month</p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-800">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <UserX size={20} />
            <h4 className="font-bold text-sm">Flagged Accounts</h4>
          </div>
          <p className="text-2xl font-black text-rose-700 dark:text-rose-400">1.2%</p>
          <p className="text-xs text-rose-600/70 mt-1">-0.4% from last month</p>
        </div>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-6 rounded-2xl border border-brand-100 dark:border-brand-800">
          <div className="flex items-center gap-3 text-brand-600 mb-2">
            <ShieldCheck size={20} />
            <h4 className="font-bold text-sm">Security Audits</h4>
          </div>
          <p className="text-2xl font-black text-brand-700 dark:text-brand-400">100%</p>
          <p className="text-xs text-brand-600/70 mt-1">All accounts verified today</p>
        </div>
      </div>
    </div>
  );
}
