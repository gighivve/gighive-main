import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  CreditCard, 
  History,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Wallet,
  Calendar,
  BarChart3,
  ArrowRightLeft,
  PieChart,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  Cell
} from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { Withdrawal } from '../types';
import { useTheme } from '../lib/ThemeContext';

const revenueData = [
  { name: 'Jan', revenue: 450000, volume: 4500000 },
  { name: 'Feb', revenue: 520000, volume: 5200000 },
  { name: 'Mar', revenue: 480000, volume: 4800000 },
  { name: 'Apr', revenue: 610000, volume: 6100000 },
  { name: 'May', revenue: 590000, volume: 5900000 },
  { name: 'Jun', revenue: 720000, volume: 7200000 },
  { name: 'Jul', revenue: 850000, volume: 8500000 },
];

const withdrawalHistory: Withdrawal[] = [
  { id: 'W1', amount: 50000, bankName: 'Chase Bank', accountNumber: '****6789', status: 'completed', date: '2024-03-20' },
  { id: 'W2', amount: 25000, bankName: 'Bank of America', accountNumber: '****1234', status: 'pending', date: '2024-03-25' },
  { id: 'W3', amount: 100000, bankName: 'Wells Fargo', accountNumber: '****9900', status: 'completed', date: '2024-03-10' },
];

export default function Revenue() {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [chartType, setChartType] = useState<'revenue' | 'volume'>('revenue');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartColors = {
    grid: isDark ? '#1e293b' : '#f1f5f9',
    text: isDark ? '#94a3b8' : '#64748b',
    tooltip: isDark ? '#0f172a' : '#ffffff',
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setAmount('');
      setBank('');
      setAccount('');
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const stats = [
    { 
      period: 'Daily', 
      volume: 425000, 
      revenue: 42500, 
      vTrend: '+5.4%', 
      rTrend: '+6.2%',
      icon: Clock,
      color: 'blue'
    },
    { 
      period: 'Monthly', 
      volume: 12450000, 
      revenue: 1245000, 
      vTrend: '+12.5%', 
      rTrend: '+14.1%',
      icon: Calendar,
      color: 'emerald'
    },
    { 
      period: 'Yearly', 
      volume: 158000000, 
      revenue: 15800000, 
      vTrend: '+24.1%', 
      rTrend: '+22.8%',
      icon: TrendingUp,
      color: 'brand'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Financial Intelligence</h2>
          <p className="text-muted-foreground text-sm mt-1 font-medium">Comprehensive tracking of money flow and company earnings.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-card border border-border rounded-xl shadow-sm flex items-center gap-2">
            <Activity size={16} className="text-emerald-500" />
            <span className="text-sm font-bold text-foreground">Live Processing</span>
          </div>
        </div>
      </div>

      {/* Financial Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.period}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card p-8 rounded-[2rem] border border-border shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={cn(
                  "p-4 rounded-2xl shadow-inner",
                  stat.color === 'blue' ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" :
                  stat.color === 'emerald' ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" :
                  "bg-brand-50 dark:bg-brand-900/20 text-brand-600"
                )}>
                  <stat.icon size={28} />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest">{stat.period} Report</h4>
                  <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center justify-end gap-1">
                    <ArrowUpRight size={12} />
                    {stat.rTrend}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Money Flow Volume</p>
                  <h3 className="text-3xl font-black text-foreground tracking-tight">{formatCurrency(stat.volume)}</h3>
                </div>

                <div className="pt-6 border-t border-border flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">Net Revenue</p>
                    <h3 className="text-3xl font-black text-brand-600 dark:text-brand-400 tracking-tight">{formatCurrency(stat.revenue)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                    <ArrowRightLeft size={20} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-muted/20 rounded-full blur-3xl group-hover:bg-brand-500/5 transition-colors duration-500"></div>
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-muted/20 rounded-full blur-3xl group-hover:bg-brand-500/5 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 rounded-lg">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Growth Performance</h3>
                  <p className="text-xs text-muted-foreground">Comparing revenue vs total volume</p>
                </div>
              </div>
              <div className="flex items-center p-1 bg-muted rounded-xl">
                <button 
                  onClick={() => setChartType('revenue')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                    chartType === 'revenue' ? "bg-card text-brand-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Revenue
                </button>
                <button 
                  onClick={() => setChartType('volume')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                    chartType === 'volume' ? "bg-card text-brand-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Volume
                </button>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartType === 'revenue' ? "#6366f1" : "#3b82f6"} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={chartType === 'revenue' ? "#6366f1" : "#3b82f6"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: chartColors.text, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: chartColors.text, fontWeight: 600 }}
                    tickFormatter={(value) => `$${value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : (value/1000).toFixed(0) + 'k'}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: chartColors.tooltip, 
                      border: 'none', 
                      borderRadius: '16px',
                      color: isDark ? '#fff' : '#000',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ color: isDark ? '#fff' : '#000' }}
                    cursor={{ stroke: chartType === 'revenue' ? '#6366f1' : '#3b82f6', strokeWidth: 2 }}
                    formatter={(value: number) => [formatCurrency(value), chartType === 'revenue' ? 'Net Revenue' : 'Total Volume']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={chartType} 
                    stroke={chartType === 'revenue' ? "#6366f1" : "#3b82f6"} 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorChart)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Withdrawal History */}
          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted text-muted-foreground rounded-lg">
                  <History size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Withdrawal History</h3>
                  <p className="text-xs text-muted-foreground">Recent profit transfers</p>
                </div>
              </div>
              <button className="text-xs font-bold text-brand-600 hover:underline">View All Transactions</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Transaction ID</th>
                    <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Bank Details</th>
                    <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {withdrawalHistory.map((w) => (
                    <tr key={w.id} className="hover:bg-accent/50 transition-colors">
                      <td className="px-8 py-5 text-sm font-mono font-bold text-muted-foreground">#{w.id}</td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-foreground">{w.bankName}</p>
                        <p className="text-xs text-muted-foreground font-medium">{w.accountNumber}</p>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-foreground">
                        {formatCurrency(w.amount)}
                      </td>
                      <td className="px-8 py-5 text-sm text-muted-foreground font-medium">
                        {w.date}
                      </td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "text-[10px] font-black uppercase px-3 py-1 rounded-full",
                          w.status === 'completed' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          w.status === 'pending' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                          "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        )}>
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Available Balance Card */}
          <div className="bg-brand-600 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-brand-200 dark:shadow-none">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <Wallet size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-lg backdrop-blur-md">
                  Ready to Withdraw
                </span>
              </div>
              <p className="text-brand-100 text-xs font-bold uppercase tracking-widest mb-1">Available Profit</p>
              <h3 className="text-4xl font-black mb-6 tracking-tight">{formatCurrency(842000)}</h3>
              <div className="flex items-center gap-2 text-brand-100 text-xs font-bold">
                <ArrowUpRight size={14} className="text-emerald-400" />
                <span>+12.5% from last period</span>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 rounded-lg">
                <Send size={20} />
              </div>
              <h3 className="font-bold text-foreground">Withdraw Funds</h3>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground font-bold focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Destination Bank</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <select 
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-muted border border-border rounded-xl text-sm text-foreground font-bold focus:ring-2 focus:ring-brand-500/20 outline-none appearance-none transition-all"
                    required
                  >
                    <option value="">Select Bank</option>
                    <option value="Chase">Chase Bank</option>
                    <option value="BoA">Bank of America</option>
                    <option value="WellsFargo">Wells Fargo</option>
                    <option value="Citibank">Citibank</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Account Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="text" 
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="**** **** ****"
                    className="w-full pl-11 pr-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground font-bold focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className={cn(
                  "w-full py-4 rounded-2xl text-sm font-black text-white transition-all flex items-center justify-center gap-2 shadow-xl",
                  isProcessing ? "bg-slate-400 cursor-not-allowed" : "bg-brand-600 hover:bg-brand-700 shadow-brand-200 dark:shadow-none"
                )}
              >
                {isProcessing ? (
                  <>
                    <Clock className="animate-spin" size={18} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Initiate Transfer
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-xs font-bold"
                >
                  <div className="p-1.5 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                    <CheckCircle2 size={14} />
                  </div>
                  Transfer initiated successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Info */}
          <div className="bg-muted/50 p-6 rounded-3xl border border-border">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Security Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle size={14} className="text-amber-500" />
                <span>Next payout: Tomorrow, 9 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
