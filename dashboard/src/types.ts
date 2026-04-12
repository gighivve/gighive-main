import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description: string;
}

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'flagged';
  date: string;
  category: string;
}

export interface Withdrawal {
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

export interface UserActivity {
  id: string;
  type: 'payment' | 'gig_completion' | 'dispute' | 'login' | 'scam_report';
  description: string;
  status: 'resolved' | 'pending' | 'critical';
  date: string;
  amount?: number;
}

export interface Gig {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'completed' | 'in_progress' | 'cancelled';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  active: string;
  status: 'verified' | 'flagged' | 'pending';
  timeSpent: string;
  workDone: number;
  hourlyRate: number;
  skills: string[];
  activities: UserActivity[];
  recentGigs: Gig[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  secondary?: number;
}
