import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Layers, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  ShieldCheck,
  Bell,
  ShoppingBag,
  Sun,
  Moon,
  ShieldAlert,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../lib/ThemeContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: ShieldAlert, label: 'Disputes', path: '/disputes' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: TrendingUp, label: 'Revenue', path: '/revenue' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={cn(
      "w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200 dark:shadow-none">
            <span className="text-2xl font-black tracking-tighter">G</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground leading-tight">GigHive</h1>
            <p className="text-xs text-muted-foreground font-medium">Admin Console</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-muted-foreground hover:bg-accent rounded-lg lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
