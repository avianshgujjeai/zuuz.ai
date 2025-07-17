import { User, Team, Module } from '../types/auth';

export const mockUsers: User[] = [
  // CEO
  {
    id: 'ceo-1',
    email: 'ceo@zuuz.com',
    name: 'John CEO',
    role: 'ceo',
    department: 'Executive',
    permissions: [
      { module: 'dashboard', actions: ['read', 'write', 'admin'] },
      { module: 'ai-agent', actions: ['read', 'write', 'admin'] },
      { module: 'email-analytics', actions: ['read', 'write', 'admin'] },
      { module: 'document-collaboration', actions: ['read', 'write', 'admin'] },
      { module: 'teams-activity', actions: ['read', 'write', 'admin'] },
      { module: 'sharepoint-documents', actions: ['read', 'write', 'admin'] },
      { module: 'file-access', actions: ['read', 'write', 'admin'] },
      { module: 'top-collaborators', actions: ['read', 'write', 'admin'] },
      { module: 'quiet-hours', actions: ['read', 'write', 'admin'] },
      { module: 'productivity-score', actions: ['read', 'write', 'admin'] },
      { module: 'sentiment-analysis', actions: ['read', 'write', 'admin'] },
      { module: 'saas-integrations', actions: ['read', 'write', 'admin'] },
      { module: 'erp-integrations', actions: ['read', 'write', 'admin'] }
    ]
  },
  // Admin
  {
    id: 'admin-1',
    email: 'admin@zuuz.com',
    name: 'System Admin',
    role: 'admin',
    department: 'IT',
    permissions: [
      { module: 'admin-panel', actions: ['read', 'write', 'admin'] },
      { module: 'dashboard', actions: ['read', 'write'] },
      { module: 'ai-agent', actions: ['read', 'write'] },
      { module: 'file-access', actions: ['read', 'write', 'admin'] },
      { module: 'saas-integrations', actions: ['read', 'write', 'admin'] },
      { module: 'erp-integrations', actions: ['read', 'write', 'admin'] },
      { module: 'user-management', actions: ['read', 'write', 'admin'] },
      { module: 'security-monitoring', actions: ['read', 'write', 'admin'] }
    ]
  },
  // Managers
  {
    id: 'mgr-1',
    email: 'manager.engineering@zuuz.com',
    name: 'Mike Manager',
    role: 'manager',
    department: 'Engineering',
    teamId: 'team-eng',
    permissions: [
      { module: 'dashboard', actions: ['read'] },
      { module: 'ai-agent', actions: ['read'] },
      { module: 'email-analytics', actions: ['read'] },
      { module: 'document-collaboration', actions: ['read'] },
      { module: 'teams-activity', actions: ['read'] },
      { module: 'sharepoint-documents', actions: ['read'] },
      { module: 'top-collaborators', actions: ['read'] },
      { module: 'quiet-hours', actions: ['read'] },
      { module: 'productivity-score', actions: ['read'] },
      { module: 'sentiment-analysis', actions: ['read'] },
      { module: 'team-management', actions: ['read', 'write'] }
    ]
  },
  {
    id: 'mgr-2',
    email: 'manager.marketing@zuuz.com',
    name: 'Sarah Manager',
    role: 'manager',
    department: 'Marketing',
    teamId: 'team-mkt',
    permissions: [
      { module: 'dashboard', actions: ['read'] },
      { module: 'ai-agent', actions: ['read'] },
      { module: 'email-analytics', actions: ['read'] },
      { module: 'document-collaboration', actions: ['read'] },
      { module: 'teams-activity', actions: ['read'] },
      { module: 'sharepoint-documents', actions: ['read'] },
      { module: 'top-collaborators', actions: ['read'] },
      { module: 'quiet-hours', actions: ['read'] },
      { module: 'productivity-score', actions: ['read'] },
      { module: 'sentiment-analysis', actions: ['read'] },
      { module: 'team-management', actions: ['read', 'write'] }
    ]
  },
  // Regular Users
  {
    id: 'user-1',
    email: 'john.doe@zuuz.com',
    name: 'John Doe',
    role: 'user',
    department: 'Engineering',
    teamId: 'team-eng',
    permissions: [
      { module: 'dashboard', actions: ['read'] },
      { module: 'ai-agent', actions: ['read'] },
      { module: 'email-analytics', actions: ['read'] },
      { module: 'document-collaboration', actions: ['read'] },
      { module: 'teams-activity', actions: ['read'] },
      { module: 'sharepoint-documents', actions: ['read'] },
      { module: 'top-collaborators', actions: ['read'] },
      { module: 'quiet-hours', actions: ['read'] },
      { module: 'productivity-score', actions: ['read'] }
    ]
  },
  {
    id: 'user-2',
    email: 'jane.smith@zuuz.com',
    name: 'Jane Smith',
    role: 'user',
    department: 'Marketing',
    teamId: 'team-mkt',
    permissions: [
      { module: 'dashboard', actions: ['read'] },
      { module: 'ai-agent', actions: ['read'] },
      { module: 'email-analytics', actions: ['read'] },
      { module: 'document-collaboration', actions: ['read'] },
      { module: 'teams-activity', actions: ['read'] },
      { module: 'sharepoint-documents', actions: ['read'] },
      { module: 'top-collaborators', actions: ['read'] },
      { module: 'quiet-hours', actions: ['read'] },
      { module: 'productivity-score', actions: ['read'] },
      { module: 'sentiment-analysis', actions: ['read'] }
    ]
  },
  {
    id: 'user-3',
    email: 'bob.wilson@zuuz.com',
    name: 'Bob Wilson',
    role: 'user',
    department: 'Sales',
    teamId: 'team-sales',
    permissions: [
      { module: 'dashboard', actions: ['read'] },
      { module: 'ai-agent', actions: ['read'] },
      { module: 'email-analytics', actions: ['read'] }
    ]
  }
];

export const mockTeams: Team[] = [
  {
    id: 'team-eng',
    name: 'Engineering Team',
    department: 'Engineering',
    managerId: 'mgr-1',
    memberIds: ['user-1', 'user-4', 'user-5']
  },
  {
    id: 'team-mkt',
    name: 'Marketing Team',
    department: 'Marketing',
    managerId: 'mgr-2',
    memberIds: ['user-2', 'user-6']
  },
  {
    id: 'team-sales',
    name: 'Sales Team',
    department: 'Sales',
    managerId: 'mgr-3',
    memberIds: ['user-3', 'user-7']
  }
];

export const availableModules: Module[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Main analytics dashboard',
    icon: 'BarChart3',
    route: '/dashboard'
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    description: 'AI-powered assistant',
    icon: 'Bot',
    route: '/ai-agent'
  },
  {
    id: 'email-analytics',
    name: 'Email Analytics',
    description: 'Email performance metrics',
    icon: 'Mail',
    route: '/email-analytics'
  },
  {
    id: 'teams-activity',
    name: 'Teams Activity',
    description: 'Microsoft Teams collaboration data',
    icon: 'Activity',
    route: '/teams-activity'
  },
  {
    id: 'document-collaboration',
    name: 'Document Collaboration',
    description: 'Document sharing and collaboration',
    icon: 'FileText',
    route: '/document-collaboration'
  },
  {
    id: 'productivity-score',
    name: 'Productivity Score',
    description: 'Employee productivity metrics',
    icon: 'TrendingUp',
    route: '/productivity-score'
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Team sentiment and mood tracking',
    icon: 'Heart',
    route: '/sentiment-analysis'
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    description: 'System administration',
    icon: 'Settings',
    route: '/admin',
    requiredRole: ['admin', 'ceo']
  }
];

// Demo login credentials
export const demoCredentials = [
  { email: 'ceo@zuuz.com', password: 'ceo123', role: 'CEO' },
  { email: 'admin@zuuz.com', password: 'admin123', role: 'Admin' },
  { email: 'manager.engineering@zuuz.com', password: 'mgr123', role: 'Engineering Manager' },
  { email: 'manager.marketing@zuuz.com', password: 'mgr123', role: 'Marketing Manager' },
  { email: 'john.doe@zuuz.com', password: 'user123', role: 'Engineering User' },
  { email: 'jane.smith@zuuz.com', password: 'user123', role: 'Marketing User' },
  { email: 'bob.wilson@zuuz.com', password: 'user123', role: 'Sales User' }
];