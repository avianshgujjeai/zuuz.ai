import { EmailMetric, CollaborationData, ActivityData, ActionableItem, MetricCard } from '../types';

export const emailHeatmapData: EmailMetric[] = [
  { date: '2024-01', marketing: 45, other: 25, shipping: 15, transactions: 20 },
  { date: '2024-02', marketing: 40, other: 30, shipping: 18, transactions: 22 },
  { date: '2024-03', marketing: 50, other: 28, shipping: 20, transactions: 25 },
  { date: '2024-04', marketing: 35, other: 35, shipping: 22, transactions: 18 },
  { date: '2025-01', marketing: 55, other: 20, shipping: 25, transactions: 30 },
  { date: '2025-02', marketing: 48, other: 32, shipping: 20, transactions: 28 },
];

export const collaborationData: CollaborationData[] = [
  { date: 'Jan 25', value: 30 },
  { date: 'Feb 25', value: 40 },
  { date: 'Mar 25', value: 15 },
  { date: 'Apr 25', value: 50 },
  { date: 'May 25', value: 60 },
  { date: 'Jun 25', value: 20 },
];

export const activityData: ActivityData[] = [
  { date: '2024/01', profitMargin: 75, cost: 45, revenue: 60 },
  { date: '2024/02', profitMargin: 60, cost: 55, revenue: 70 },
  { date: '2024/03', profitMargin: 80, cost: 40, revenue: 65 },
  { date: '2024/04', profitMargin: 45, cost: 65, revenue: 55 },
  { date: '2025/01', profitMargin: 70, cost: 50, revenue: 75 },
  { date: '2025/02', profitMargin: 85, cost: 35, revenue: 80 },
];

export const actionableItems: ActionableItem[] = [
  {
    id: '1',
    title: 'Emails Unanswered > 48 Hours',
    description: '23 emails require immediate attention',
    priority: 'high',
    category: 'Communication'
  },
  {
    id: '2',
    title: 'Stale Documents (No update in 90 days)',
    description: '156 documents need review',
    priority: 'medium',
    category: 'Documentation'
  },
  {
    id: '3',
    title: 'Large File Transfers or Unusual Access from File Servers',
    description: '8 suspicious activities detected',
    priority: 'high',
    category: 'Security'
  },
  {
    id: '4',
    title: 'High Meeting Load (Employees with >5 hours of meetings per day)',
    description: '12 employees affected',
    priority: 'medium',
    category: 'Productivity'
  }
];

export const metricCards: MetricCard[] = [
  {
    title: 'Total Emails Sent / Received Today',
    value: '1200',
    change: '10%',
    changeType: 'positive',
    previousValue: '200'
  },
  {
    title: 'Teams Messages Exchanged Today',
    value: '15,247',
    change: '10%',
    changeType: 'positive',
    previousValue: '14,350'
  },
  {
    title: 'Active SharePoint Documents',
    value: '2,847',
    change: '-10%',
    changeType: 'negative',
    previousValue: '3,145'
  },
  {
    title: 'Files Accessed from Internal Servers',
    value: '8,934',
    change: '10%',
    changeType: 'positive',
    previousValue: '8,125'
  },
  {
    title: 'Top Collaborators',
    value: '1200',
    change: '10%',
    changeType: 'positive',
    previousValue: '200'
  },
  {
    title: 'Quiet Hours Analysis',
    value: '1200',
    change: '10%',
    changeType: 'positive',
    previousValue: '200'
  },
  {
    title: 'Employee Productivity Score',
    value: '1200',
    change: '10%',
    changeType: 'positive',
    previousValue: '200'
  },
  {
    title: 'Sentimental Score',
    value: '1200',
    change: '10%',
    changeType: 'positive',
    previousValue: '200'
  }
];

export const topCollaborators = [
  { name: 'Sarah Johnson', interactions: 245, department: 'Marketing' },
  { name: 'Mike Chen', interactions: 198, department: 'Engineering' },
  { name: 'Emily Davis', interactions: 176, department: 'Sales' },
  { name: 'David Wilson', interactions: 154, department: 'Product' },
  { name: 'Lisa Anderson', interactions: 132, department: 'HR' }
];

export const quietHoursData = [
  { hour: '6 AM', activity: 5 },
  { hour: '7 AM', activity: 15 },
  { hour: '8 AM', activity: 45 },
  { hour: '9 AM', activity: 85 },
  { hour: '10 AM', activity: 95 },
  { hour: '11 AM', activity: 90 },
  { hour: '12 PM', activity: 70 },
  { hour: '1 PM', activity: 60 },
  { hour: '2 PM', activity: 85 },
  { hour: '3 PM', activity: 90 },
  { hour: '4 PM', activity: 80 },
  { hour: '5 PM', activity: 65 },
  { hour: '6 PM', activity: 35 },
  { hour: '7 PM', activity: 20 },
  { hour: '8 PM', activity: 10 }
];