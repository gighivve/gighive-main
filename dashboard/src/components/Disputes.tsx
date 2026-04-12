import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  CheckCircle2,
  XCircle,
  User,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

interface Dispute {
  id: string;
  userId: string;
  userName: string;
  type: 'scam_report' | 'dispute' | 'payment_issue';
  description: string;
  status: 'critical' | 'pending' | 'resolved';
  date: string;
  amount?: number;
}

const mockDisputes: Dispute[] = [
  { id: 'D1', userId: 'U3', userName: 'Damon Salvatore', type: 'scam_report', description: 'Reported for non-payment after gig completion (House Cleaning)', status: 'critical', date: '2024-03-24 14:20', amount: 150 },
  { id: 'D2', userId: 'U3', userName: 'Damon Salvatore', type: 'dispute', description: 'Work not done properly - Client claims poor quality', status: 'pending', date: '2024-03-22 09:15' },
  { id: 'D3', userId: 'U8', userName: 'Tyler Lockwood', type: 'scam_report', description: 'Multiple reports of fraudulent gig listings', status: 'critical', date: '2024-03-25 10:30' },
  { id: 'D4', userId: 'U5', userName: 'Bonnie Bennett', type: 'payment_issue', description: 'Payment not received after 48 hours of completion', status: 'pending', date: '2024-03-23 16:45', amount: 300 },
  { id: 'D5', userId: 'U2', userName: 'Elena Gilbert', type: 'dispute', description: 'Disagreement over final gig scope', status: 'resolved', date: '2024-03-20 12:00', amount: 50 },
];

export default function Disputes() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'critical' | 'pending' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDisputes = mockDisputes.filter(d => {
    const matchesFilter = filter === 'all' || d.status === filter;
    const matchesSearch = d.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         d.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Dispute Resolution</h2>
          <p className="text-muted-foreground text-sm mt-1 font-medium">Monitor and verify platform issues, scams, and payment disputes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-xl shadow-sm flex items-center gap-2">
            <ShieldAlert size={16} className="text-rose-500" />
            <span className="text-sm font-bold text-rose-700 dark:text-rose-400">
              {mockDisputes.filter(d => d.status === 'critical').length} Critical Issues
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by user, description or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {(['all', 'critical', 'pending', 'resolved'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "flex-1 md:flex-none px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold capitalize transition-all",
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

      {/* Disputes List */}
      <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {filteredDisputes.length > 0 ? (
            filteredDisputes.map((dispute, i) => (
              <motion.div 
                key={dispute.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 hover:bg-accent/50 transition-colors group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className={cn(
                    "p-4 rounded-2xl h-fit w-fit",
                    dispute.status === 'critical' ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600" :
                    dispute.status === 'pending' ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600" :
                    "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600"
                  )}>
                    {dispute.type === 'scam_report' ? <ShieldAlert size={28} /> :
                     dispute.type === 'dispute' ? <AlertTriangle size={28} /> :
                     <DollarSign size={28} />}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase px-2 py-1 bg-muted text-muted-foreground rounded-lg">
                          #{dispute.id}
                        </span>
                        <h4 className="font-black text-foreground capitalize text-lg">
                          {dispute.type.replace('_', ' ')}
                        </h4>
                      </div>
                      <span className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                        <Clock size={14} />
                        {dispute.date}
                      </span>
                    </div>

                    <p className="text-muted-foreground font-medium">
                      {dispute.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-700 dark:text-brand-400 text-xs font-bold">
                          {dispute.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Involved User</p>
                          <button 
                            onClick={() => navigate(`/users/${dispute.userId}`)}
                            className="text-sm font-bold text-foreground hover:text-brand-600 transition-colors flex items-center gap-1"
                          >
                            {dispute.userName}
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>

                      {dispute.amount && (
                        <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Disputed Amount</p>
                          <p className="text-sm font-black text-rose-600 dark:text-rose-400">{formatCurrency(dispute.amount)}</p>
                        </div>
                      )}

                      <div className="ml-auto flex items-center gap-3">
                        <button className="px-4 py-2 bg-card border border-border rounded-xl text-xs font-bold text-muted-foreground hover:bg-accent transition-all flex items-center gap-2">
                          <MessageSquare size={14} />
                          Contact
                        </button>
                        <button className="px-4 py-2 bg-card border border-border rounded-xl text-xs font-bold text-muted-foreground hover:bg-accent transition-all">
                          View Proof
                        </button>
                        {dispute.status !== 'resolved' && (
                          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none">
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-20 text-center">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <CheckCircle2 size={64} className="text-emerald-500/20" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">All clear!</h3>
                  <p className="text-sm font-medium">No disputes found matching your criteria.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
