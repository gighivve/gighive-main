import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  Briefcase,
  Code,
  Palette,
  Megaphone,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category } from '../types';
import { formatNumber, cn } from '../lib/utils';

const initialCategories: Category[] = [
  { id: '1', name: 'Cleaning Services', description: 'Residential and commercial cleaning, deep cleaning, and organization.', count: 12450, color: 'bg-blue-500' },
  { id: '2', name: 'Barbering & Grooming', description: 'Professional haircuts, shaves, and styling at home or in-shop.', count: 8620, color: 'bg-purple-500' },
  { id: '3', name: 'Music & Entertainment', description: 'Drumming, guitar lessons, and live performance gigs.', count: 5210, color: 'bg-orange-500' },
  { id: '4', name: 'Tutoring & Education', description: 'Academic support, language learning, and skill development.', count: 3140, color: 'bg-emerald-500' },
  { id: '5', name: 'Handyman & Repairs', description: 'Plumbing, electrical work, and general home maintenance.', count: 4890, color: 'bg-rose-500' },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) return;

    const category: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCategory.name,
      description: newCategory.description,
      count: 0,
      color: 'bg-slate-500'
    };

    setCategories([category, ...categories]);
    setNewCategory({ name: '', description: '' });
    setIsAdding(false);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gig Categories</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage and organize your startup's service offerings.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full sm:w-auto bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card p-6 rounded-2xl border-2 border-dashed border-brand-200 dark:border-brand-900/30 flex flex-col justify-center"
            >
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Category Name</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={newCategory.name}
                    onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g. Data Science"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Description</label>
                  <textarea 
                    value={newCategory.description}
                    onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Describe this category..."
                    rows={3}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-brand-500/20 outline-none resize-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-brand-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    Create Category
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 bg-muted text-muted-foreground text-xs font-bold py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {categories.map((category) => (
            <motion.div 
              layout
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-xl text-white shadow-lg", category.color)}>
                  <Briefcase size={20} />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteCategory(category.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-muted-foreground hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-lg">{category.name}</h3>
                  <span className="text-xs font-black text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded-lg">
                    {formatNumber(category.count)} Users
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      U{i}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    +{(category.count / 100).toFixed(0)}
                  </div>
                </div>
                <button className="text-xs font-bold text-brand-600 hover:underline">Manage Users</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
