import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Globe, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  MousePointer2
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, formatNumber, cn } from '../lib/utils';
import { useTheme } from '../lib/ThemeContext';

const acquisitionData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Email', value: 100 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

const conversionData = [
  { name: 'Mon', visits: 4000, conversions: 2400 },
  { name: 'Tue', visits: 3000, conversions: 1398 },
  { name: 'Wed', visits: 2000, conversions: 9800 },
  { name: 'Thu', visits: 2780, conversions: 3908 },
  { name: 'Fri', visits: 1890, conversions: 4800 },
  { name: 'Sat', visits: 2390, conversions: 3800 },
  { name: 'Sun', visits: 3490, conversions: 4300 },
];

const regionData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 15 },
  { name: 'South America', value: 5 },
  { name: 'Africa', value: 5 },
];

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartColors = {
    grid: isDark ? '#1e293b' : '#f1f5f9',
    text: isDark ? '#94a3b8' : '#64748b',
    tooltip: isDark ? '#0f172a' : '#ffffff',
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Analytics</h2>
          <p className="text-muted-foreground text-sm mt-1">Deep dive into user behavior and market performance.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none bg-card border border-border text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-accent transition-colors whitespace-nowrap">
            Export Data
          </button>
          <button className="flex-1 sm:flex-none bg-brand-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm whitespace-nowrap">
            Generate Insights
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
              <Target size={20} />
            </div>
            <h3 className="font-bold text-foreground">Acquisition Channels</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={acquisitionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {acquisitionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: chartColors.tooltip, 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: isDark ? '#fff' : '#000'
                  }}
                  itemStyle={{ color: isDark ? '#fff' : '#000' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {acquisitionData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-muted-foreground font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                <MousePointer2 size={20} />
              </div>
              <h3 className="font-bold text-foreground">Conversion Funnel</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              +14.2%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
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
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold text-foreground mb-6">Regional Distribution</h3>
          <div className="space-y-6">
            {regionData.map((region) => (
              <div key={region.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{region.name}</span>
                  <span className="font-bold text-foreground">{region.value}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-brand-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-900 p-8 rounded-2xl border border-brand-800 shadow-xl relative overflow-hidden text-white">
          <div className="relative z-10">
            <div className="p-3 bg-brand-800/50 backdrop-blur-sm rounded-xl w-fit mb-6">
              <Zap size={24} className="text-brand-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">GigHive AI Insights</h3>
            <p className="text-brand-200 text-sm leading-relaxed mb-8">
              Based on your current growth rate, you're on track to hit $1M ARR by October. 
              Consider increasing your marketing spend in Europe to capitalize on high conversion rates.
            </p>
            <button className="bg-white text-brand-900 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors shadow-lg">
              View Full Analysis
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
