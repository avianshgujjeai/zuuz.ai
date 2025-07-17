import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Mail, 
  FileText, 
  Users, 
  Activity, 
  Database,
  Clock,
  TrendingUp,
  Heart,
  Cloud,
  Settings,
  Bot,
  Shield,
  UserCog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const allNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3, module: 'dashboard' },
  { name: 'AI Agent', href: '/ai-agent', icon: Bot, module: 'ai-agent' },
  { name: 'Email Analytics', href: '/email-analytics', icon: Mail, module: 'email-analytics', roles: ['ceo', 'manager', 'user'] },
  { name: 'Document Collaboration', href: '/document-collaboration', icon: FileText, module: 'document-collaboration', roles: ['ceo', 'manager', 'user'] },
  { name: 'Teams Activity', href: '/teams-activity', icon: Activity, module: 'teams-activity', roles: ['ceo', 'manager', 'user'] },
  { name: 'SharePoint Documents', href: '/sharepoint-documents', icon: FileText, module: 'sharepoint-documents', roles: ['ceo', 'manager', 'user'] },
  { name: 'File Access', href: '/file-access', icon: Database, module: 'file-access', roles: ['ceo', 'admin'] },
  { name: 'Top Collaborators', href: '/top-collaborators', icon: Users, module: 'top-collaborators', roles: ['ceo', 'manager'] },
  { name: 'Quiet Hours', href: '/quiet-hours', icon: Clock, module: 'quiet-hours', roles: ['ceo', 'manager'] },
  { name: 'Productivity Score', href: '/productivity-score', icon: TrendingUp, module: 'productivity-score', roles: ['ceo', 'manager', 'user'] },
  { name: 'Sentiment Analysis', href: '/sentiment-analysis', icon: Heart, module: 'sentiment-analysis', roles: ['ceo', 'manager'] },
  { name: 'SAAS Integrations', href: '/saas-integrations', icon: Cloud, module: 'saas-integrations', roles: ['ceo', 'admin'] },
  { name: 'ERP Integrations', href: '/erp-integrations', icon: Settings, module: 'erp-integrations', roles: ['ceo', 'admin'] },
  { name: 'Admin Panel', href: '/admin', icon: Shield, module: 'admin-panel', roles: ['admin'] },
];

export const Sidebar: React.FC = () => {
  const { user, canAccessModule } = useAuth();

  // Filter navigation based on user permissions and role
  const navigation = allNavigation.filter(item => {
    // Check role-based access first
    if (item.roles && !item.roles.includes(user?.role || '')) {
      return false;
    }
    
    // Check module permissions
    return canAccessModule(item.module);
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'from-purple-600 to-indigo-700';
      case 'admin': return 'from-red-600 to-pink-700';
      case 'manager': return 'from-blue-600 to-cyan-700';
      case 'user': return 'from-green-600 to-emerald-700';
      default: return 'from-blue-600 to-purple-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ceo': return Shield;
      case 'admin': return UserCog;
      case 'manager': return Users;
      case 'user': return Users;
      default: return Users;
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src="/ZUUZ Operational Efficiency Tool Logo.png" 
            alt="ZUUZ Logo" 
            className="w-10 h-10 rounded-xl shadow-lg"
            onError={(e) => {
              // Fallback to text logo if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg" style={{display: 'none'}}>
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Powered by CloudBox</p>
          </div>
        </div>

        {/* User Role Badge */}
        {user && (
          <div className={`p-3 rounded-lg bg-gradient-to-r ${getRoleColor(user.role)} mb-4`}>
            <div className="flex items-center space-x-2">
              {(() => {
                const RoleIcon = getRoleIcon(user.role);
                return <RoleIcon className="w-5 h-5 text-white" />;
              })()}
              <div className="text-white">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs opacity-90">{user.role.toUpperCase()} - {user.department}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};