import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  CreditCard,
  TrendingUp,
  MoreVertical,
  Shield,
  Server,
  Globe,
  Zap,
  Search,
  Filter,
  Download,
  UserPlus,
  Lock,
  RefreshCw,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'motion/react';
import { formatCurrency, formatNumber, cn } from '../lib/utils';
import { StatCardProps, Transaction } from '../types';
import { useTheme } from '../lib/ThemeContext';

const revenueData = [
  { name: 'Jan', value: 450000 },
  { name: 'Feb', value: 520000 },
  { name: 'Mar', value: 480000 },
  { name: 'Apr', value: 610000 },
  { name: 'May', value: 550000 },
  { name: 'Jun', value: 670000 },
  { name: 'Jul', value: 720000 },
];

const activeUsersData = [
  { name: '00:00', value: 12000 },
  { name: '04:00', value: 8000 },
  { name: '08:00', value: 25000 },
  { name: '12:00', value: 45000 },
  { name: '16:00', value: 38000 },
  { name: '20:00', value: 52000 },
  { name: '23:59', value: 15000 },
];

const recentTransactions: Transaction[] = [
  { id: '1', user: 'Emma Wilson', amount: 1250, status: 'completed', date: '2024-03-15', category: 'Enterprise' },
  { id: '2', user: 'James Miller', amount: 450, status: 'pending', date: '2024-03-14', category: 'Pro Plan' },
  { id: '3', user: 'Sophia Chen', amount: 2800, status: 'completed', date: '2024-03-14', category: 'Enterprise' },
  { id: '4', user: 'Lucas Brown', amount: 95, status: 'failed', date: '2024-03-13', category: 'Starter' },
  { id: '5', user: 'Olivia Davis', amount: 620, status: 'completed', date: '2024-03-12', category: 'Pro Plan' },
];

const systemHealth = [
  { name: 'API Gateway', status: 'online', latency: '24ms', load: '12%' },
  { name: 'Auth Service', status: 'online', latency: '12ms', load: '8%' },
  { name: 'Primary DB', status: 'online', latency: '5ms', load: '45%' },
  { name: 'Search Engine', status: 'degraded', latency: '450ms', load: '89%' },
];

function StatCard({ title, value, change, trend, icon, description }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="p-2.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-xl">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          trend === 'up' 
            ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20" 
            : "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20"
        )}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartColors = {
    grid: isDark ? '#1e293b' : '#f1f5f9',
    text: isDark ? '#94a3b8' : '#64748b',
    tooltip: isDark ? '#0f172a' : '#ffffff',
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Command Center</h2>
          <p className="text-muted-foreground text-sm mt-1">Global infrastructure monitoring and user data management.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-800">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            System Status: Optimal
          </div>
          <button className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Global Users" 
          value={formatNumber(4250000)} 
          change={18.4} 
          trend="up" 
          icon={<Users size={20} />}
          description="Total registered accounts"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={formatCurrency(2450000)} 
          change={12.2} 
          trend="up" 
          icon={<DollarSign size={20} />}
          description="Net platform revenue"
        />
        <StatCard 
          title="Active Sessions" 
          value={formatNumber(85400)} 
          change={5.1} 
          trend="up" 
          icon={<Zap size={20} />}
          description="Real-time concurrent users"
        />
        <StatCard 
          title="Security Events" 
          value="0" 
          change={100} 
          trend="up" 
          icon={<Shield size={20} />}
          description="Critical threats blocked"
        />
      </div>

      {/* Gig Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 rounded-lg">
              <Search size={18} />
            </div>
            <h4 className="font-bold text-foreground text-sm">Most Searched</h4>
          </div>
          <div className="space-y-3">
            {[
              { name: 'House Cleaning', count: '125k' },
              { name: 'Barbering', count: '98k' },
              { name: 'Drumming', count: '45k' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
                <span className="text-xs font-bold text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
              <CheckCircle2 size={18} />
            </div>
            <h4 className="font-bold text-foreground text-sm">Most Completed</h4>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Cleaning', count: '42k' },
              { name: 'Delivery', count: '38k' },
              { name: 'Handyman', count: '25k' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
                <span className="text-xs font-bold text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg">
              <TrendingUp size={18} />
            </div>
            <h4 className="font-bold text-foreground text-sm">Trending Now</h4>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Pet Grooming', growth: '+45%' },
              { name: 'Tutoring', growth: '+32%' },
              { name: 'Gardening', growth: '+28%' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
                <span className="text-xs font-bold text-emerald-600">{item.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground">Platform Growth</h3>
              <p className="text-xs text-muted-foreground">Revenue and user acquisition trends</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-bold bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400 rounded-lg">Revenue</button>
              <button className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-accent rounded-lg">Users</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: chartColors.tooltip, 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: isDark ? '#fff' : '#000'
                  }}
                  itemStyle={{ color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground">Infrastructure Health</h3>
            <Server size={18} className="text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-4">
            {systemHealth.map((service) => (
              <div key={service.name} className="p-4 bg-muted/50 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">{service.name}</span>
                  <span className={cn(
                    "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                    service.status === 'online' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  )}>
                    {service.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Activity size={12} />
                    Latency: {service.latency}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    Load: {service.load}
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full bg-accent rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: service.load }}
                    className={cn(
                      "h-full rounded-full",
                      parseInt(service.load) > 80 ? "bg-rose-500" : "bg-brand-500"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2.5 text-sm font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors">
            View Full Diagnostics
          </button>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-foreground">Global User Registry</h3>
            <p className="text-xs text-muted-foreground mt-1">Manage and audit user accounts across all regions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search by UID, Email..." 
                className="pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none w-full md:w-64"
              />
            </div>
            <button className="p-2 text-muted-foreground hover:bg-accent border border-border rounded-lg">
              <Filter size={18} />
            </button>
            <button className="bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap">
              <UserPlus size={18} />
              <span className="hidden sm:inline">Add User</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account Tier</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Security Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: 'U1', name: 'Marcus Aurelius', email: 'marcus@rome.gov', tier: 'Enterprise', active: '2 mins ago', status: 'verified' },
                { id: 'U2', name: 'Elena Gilbert', email: 'elena@mystic.com', tier: 'Pro', active: '1 hour ago', status: 'verified' },
                { id: 'U3', name: 'Damon Salvatore', email: 'damon@vamp.net', tier: 'Free', active: '12 hours ago', status: 'flagged' },
                { id: 'U4', name: 'Stefan Salvatore', email: 'stefan@vamp.net', tier: 'Enterprise', active: 'Just now', status: 'verified' },
                { id: 'U5', name: 'Bonnie Bennett', email: 'bonnie@witch.org', tier: 'Pro', active: '3 days ago', status: 'pending' },
              ].map((user, i) => (
                <tr 
                  key={i} 
                  onClick={() => navigate(`/users/${user.id}`)}
                  className="hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-700 dark:text-brand-400 text-sm font-bold group-hover:scale-110 transition-transform">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-bold px-2 py-1 rounded-lg",
                      user.tier === 'Enterprise' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" :
                      user.tier === 'Pro' ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {user.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-medium">
                    {user.active}
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
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors" 
                        title="Lock Account"
                      >
                        <Lock size={16} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors" 
                        title="More Options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-muted/50 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">Showing 5 of 4,250,000 users</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-bold text-muted-foreground bg-card border border-border rounded-lg hover:bg-accent">Previous</button>
            <button className="px-3 py-1 text-xs font-bold text-brand-600 bg-card border border-brand-200 dark:border-brand-800 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
