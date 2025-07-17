export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface EmailMetric {
  date: string;
  marketing: number;
  other: number;
  shipping: number;
  transactions: number;
}

export interface CollaborationData {
  date: string;
  value: number;
}

export interface ActivityData {
  date: string;
  profitMargin: number;
  cost: number;
  revenue: number;
}

export interface ActionableItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  previousValue: string;
}