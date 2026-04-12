import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Globe, 
  Bell, 
  Shield, 
  CreditCard, 
  Save,
  Camera,
  CheckCircle2,
  DollarSign,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'personal' | 'currency' | 'security'>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('Chukwuemeka');
  const [email, setEmail] = useState('chukwuemekacodev@gmail.com');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'currency', label: 'Currency & Regional', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-black text-foreground tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm mt-1 font-medium">Manage your account preferences and regional settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-200 dark:shadow-none" 
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-3xl flex items-center justify-center text-brand-700 dark:text-brand-400 text-3xl font-black">
                        {name.charAt(0)}
                      </div>
                      <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-card border border-border rounded-xl shadow-lg text-muted-foreground hover:text-brand-600 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Profile Photo</h4>
                      <p className="text-xs text-muted-foreground">Update your avatar and personal details.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-muted border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-muted border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'currency' && (
                <motion.div
                  key="currency"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Display Currency</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <select 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full pl-11 pr-10 py-3 bg-muted border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none appearance-none transition-all"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="NGN">NGN - Nigerian Naira</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">System Language</label>
                      <div className="relative">
                        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full pl-11 pr-10 py-3 bg-muted border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none appearance-none transition-all"
                        >
                          <option value="English">English</option>
                          <option value="French">French</option>
                          <option value="Spanish">Spanish</option>
                          <option value="Yoruba">Yoruba</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-muted/50 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                          <Shield size={18} />
                        </div>
                        <h4 className="font-bold text-foreground">Two-Factor Authentication</h4>
                      </div>
                      <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Secure your account with an extra layer of protection.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8 border-t border-border flex items-center justify-between">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-2 text-emerald-600 text-sm font-bold"
                  >
                    <CheckCircle2 size={18} />
                    Settings saved successfully!
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={isSaving}
                className={cn(
                  "ml-auto flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-all shadow-xl",
                  isSaving ? "bg-slate-400 cursor-not-allowed" : "bg-brand-600 hover:bg-brand-700 shadow-brand-200 dark:shadow-none"
                )}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save size={18} />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
