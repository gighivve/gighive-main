import React from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  MousePointer2, 
  ShoppingBag,
  Clock,
  MapPin,
  Star,
  Zap,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { formatNumber, cn } from '../lib/utils';
import { useTheme } from '../lib/ThemeContext';

const searchTrends = [
  { name: 'Cleaning', searches: 125000, growth: 12 },
  { name: 'Barbering', searches: 98000, growth: 8 },
  { name: 'Drumming', searches: 45000, growth: 24 },
  { name: 'Tutoring', searches: 82000, growth: -5 },
  { name: 'Plumbing', searches: 67000, growth: 15 },
];

const completedGigs = [
  { name: 'Cleaning', value: 45 },
  { name: 'Barbering', value: 25 },
  { name: 'Tutoring', value: 15 },
  { name: 'Delivery', value: 10 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

export default function Marketplace() {
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
          <h2 className="text-2xl font-bold text-foreground">Marketplace Insights</h2>
          <p className="text-muted-foreground text-sm mt-1">Analyze gig trends, search behavior, and service demand.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 sm:flex-none bg-card border border-border text-sm font-semibold px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            Download CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Searched Gigs */}
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 rounded-lg">
                <Search size={20} />
              </div>
              <h3 className="font-bold text-foreground">Most Searched Gigs</h3>
            </div>
            <span className="text-xs font-bold text-muted-foreground">Last 7 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={searchTrends} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={chartColors.grid} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: isDark ? '#1e293b' : '#f8fafc', opacity: 0.1 }}
                  contentStyle={{ 
                    backgroundColor: chartColors.tooltip, 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: isDark ? '#fff' : '#000'
                  }}
                  itemStyle={{ color: isDark ? '#fff' : '#000' }}
                />
                <Bar dataKey="searches" radius={[0, 6, 6, 0]}>
                  {searchTrends.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gig Distribution */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-foreground">Gig Distribution</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completedGigs}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completedGigs.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {completedGigs.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-muted-foreground font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Gigs Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-foreground">Trending Services by Area</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Top Area</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Demand</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg. Payout</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: 'House Cleaning', area: 'London, UK', demand: 'High', payout: '$45/hr', growth: 15 },
                { name: 'Barbering', area: 'Brooklyn, NY', demand: 'Very High', payout: '$60/hr', growth: 22 },
                { name: 'Drumming Lessons', area: 'Austin, TX', demand: 'Medium', payout: '$75/hr', growth: 10 },
                { name: 'Dog Walking', area: 'San Francisco, CA', demand: 'High', payout: '$30/hr', growth: -2 },
                { name: 'Plumbing', area: 'Chicago, IL', demand: 'High', payout: '$120/hr', growth: 18 },
              ].map((gig, i) => (
                <tr key={i} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                        <ShoppingBag size={16} />
                      </div>
                      <span className="text-sm font-bold text-foreground">{gig.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {gig.area}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                      gig.demand === 'Very High' ? "bg-emerald-100 text-emerald-700" :
                      gig.demand === 'High' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {gig.demand}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">
                    {gig.payout}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      gig.growth > 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {gig.growth > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(gig.growth)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
