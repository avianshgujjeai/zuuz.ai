import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPersonalDashboard } from './UserPersonalDashboard';
import { DrillDownChart } from './Charts/DrillDownChart';
import { MetricCard } from './MetricCard';
import { ActionableItems } from './ActionableItems';
import { metricCards, emailHeatmapData, collaborationData, activityData } from '../data/mockData';
import { Shield, Users, AlertTriangle, Database } from 'lucide-react';

interface RoleBasedDashboardProps {
  onNavigate?: (path: string) => void;
}

export const RoleBasedDashboard: React.FC<RoleBasedDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // Helper function to get route based on metric title
  const getMetricRoute = (title: string): string => {
    if (title.includes('Email')) return '/email-analytics';
    if (title.includes('Teams')) return '/teams-activity';
    if (title.includes('SharePoint') || title.includes('Document')) return '/sharepoint-documents';
    if (title.includes('File')) return '/file-access';
    if (title.includes('Collaborator')) return '/top-collaborators';
    if (title.includes('Quiet')) return '/quiet-hours';
    if (title.includes('Productivity')) return '/productivity-score';
    if (title.includes('Sentiment')) return '/sentiment-analysis';
    return '/dashboard';
  };

  // Show personal dashboard for regular users
  if (user?.role === 'user') {
    return <UserPersonalDashboard />;
  }

  // Show admin panel for admin users
  if (user?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">System administration and security monitoring</p>
          </div>
        </div>

        {/* Admin-specific metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">98.7%</p>
                <p className="text-sm text-gray-600">System Security Score</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">247</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Security Alerts</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
                <p className="text-sm text-gray-600">System Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActionableItems />
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">All systems operational</p>
                  <p className="text-xs text-gray-500">Last checked: 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Scheduled maintenance tonight</p>
                  <p className="text-xs text-gray-500">11:00 PM - 2:00 AM EST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Security scan completed</p>
                  <p className="text-xs text-gray-500">No vulnerabilities found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter data based on user role
  const getFilteredData = () => {
    if (!user) return { metrics: [], showActionable: false };

    switch (user.role) {
      case 'ceo':
        return {
          metrics: metricCards,
          showActionable: true,
          title: 'Executive Dashboard',
          subtitle: 'Complete organizational overview'
        };
      
      case 'manager':
        return {
          metrics: metricCards.map(m => ({
            ...m,
            // Adjust values for department-specific data
            value: user.department === 'Engineering' ? 
              (m.title.includes('Teams') ? '892' : m.title.includes('Emails') ? '2,847' : m.value) :
              user.department === 'Marketing' ? 
              (m.title.includes('Teams') ? '567' : m.title.includes('Emails') ? '1,234' : m.value) :
              m.value
          })),
          showActionable: true,
          title: `${user.department} Team Dashboard`,
          subtitle: 'Team performance and collaboration metrics'
        };
      
      default:
        return {
          metrics: [],
          showActionable: true,
          title: 'Dashboard',
          subtitle: 'Analytics overview'
        };
    }
  };

  const { metrics, showActionable, title, subtitle } = getFilteredData();

  const handleEmailDrillDown = (data: any) => {
    alert(`Drilling down into ${data.date} email data: ${JSON.stringify(data)}`);
  };

  const handleCollaborationDrillDown = (data: any) => {
    alert(`Drilling down into ${data.date} collaboration data: ${JSON.stringify(data)}`);
  };

  const handleActivityDrillDown = (data: any) => {
    alert(`Drilling down into ${data.date} activity data: ${JSON.stringify(data)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Date Range:</span> 01/01/24 - 31/12/25
          </div>
        </div>
      </div>

      {/* Role-specific welcome message */}
      {user && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Welcome back, {user.name}!</h2>
              <p className="text-sm text-gray-600">
                {user.role === 'ceo' && 'You have full access to all organizational metrics and insights.'}
                {user.role === 'manager' && `Managing ${user.department} team with access to team analytics and reports.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row - Show different charts based on role */}
      {(user?.role === 'ceo' || user?.role === 'manager') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DrillDownChart 
            data={emailHeatmapData.map(item => ({ name: item.date, value: item.marketing + item.other + item.shipping + item.transactions }))}
            title="Email Response Time Heatmap"
            onDrillDown={handleEmailDrillDown}
          />
          <DrillDownChart 
            data={collaborationData.map(item => ({ name: item.date, value: item.value }))}
            title="Document Collaboration Graph"
            onDrillDown={handleCollaborationDrillDown}
          />
          <DrillDownChart 
            data={activityData.map(item => ({ name: item.date, value: item.revenue }))}
            title="Teams Activity Timeline"
            onDrillDown={handleActivityDrillDown}
          />
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} onClick={() => onNavigate && onNavigate(getMetricRoute(metric.title))}>
            <MetricCard metric={metric} />
          </div>
        ))}
      </div>

      {/* Actionable Items and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showActionable && (
          <div className="lg:col-span-1">
            <ActionableItems />
          </div>
        )}
        <div className={showActionable ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {user?.role === 'ceo' && (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Company-wide email response time improved by 15%</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New collaboration pattern detected across departments</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                </>
              )}
              
              {user?.role === 'manager' && (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.department} team productivity increased by 8%</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Team collaboration score updated</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">System maintenance scheduled for tonight</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};