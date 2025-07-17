import React from 'react';
import { Shield, Eye, Lock, AlertTriangle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useAuth } from '../context/AuthContext';

const accessLogs = [
  { user: 'John Smith', file: 'Financial_Report_Q4.xlsx', action: 'Download', time: '2 minutes ago', location: 'New York', risk: 'low' },
  { user: 'Sarah Johnson', file: 'Marketing_Strategy.pptx', action: 'View', time: '15 minutes ago', location: 'London', risk: 'low' },
  { user: 'Mike Chen', file: 'Employee_Database.xlsx', action: 'Edit', time: '1 hour ago', location: 'Tokyo', risk: 'medium' },
  { user: 'Unknown User', file: 'Confidential_Data.pdf', action: 'Access Denied', time: '2 hours ago', location: 'Unknown', risk: 'high' },
  { user: 'Emily Davis', file: 'Project_Timeline.docx', action: 'Share', time: '3 hours ago', location: 'Sydney', risk: 'low' }
];

const accessTrends = [
  { hour: '9 AM', successful: 45, failed: 2, suspicious: 0 },
  { hour: '10 AM', successful: 78, failed: 5, suspicious: 1 },
  { hour: '11 AM', successful: 92, failed: 3, suspicious: 0 },
  { hour: '12 PM', successful: 65, failed: 8, suspicious: 2 },
  { hour: '1 PM', successful: 54, failed: 4, suspicious: 1 },
  { hour: '2 PM', successful: 87, failed: 6, suspicious: 0 },
  { hour: '3 PM', successful: 95, failed: 7, suspicious: 3 },
  { hour: '4 PM', successful: 82, failed: 5, suspicious: 1 },
  { hour: '5 PM', successful: 67, failed: 3, suspicious: 0 }
];

const securityMetrics = [
  { day: 'Mon', threats: 3, blocked: 12, alerts: 5 },
  { day: 'Tue', threats: 1, blocked: 8, alerts: 2 },
  { day: 'Wed', threats: 5, blocked: 15, alerts: 8 },
  { day: 'Thu', threats: 2, blocked: 10, alerts: 4 },
  { day: 'Fri', threats: 4, blocked: 18, alerts: 7 },
  { day: 'Sat', threats: 1, blocked: 3, alerts: 1 },
  { day: 'Sun', threats: 0, blocked: 2, alerts: 0 }
];

export const FileAccess: React.FC = () => {
  const { user } = useAuth();

  // Only allow CEO and Admin access
  if (!user || (user.role !== 'ceo' && user.role !== 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Only administrators and executives can access file monitoring.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">File Access Monitoring</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => alert('Generating security report...')}
            className="btn-primary"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security Report
          </button>
          <button 
            onClick={() => alert('Opening security settings...')}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Security Settings
          </button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">File Accesses Today</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">98.7%</p>
              <p className="text-sm text-gray-600">Security Score</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Security Alerts</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Lock className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-gray-600">Blocked Attempts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Access Pattern</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accessTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Area type="monotone" dataKey="successful" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="failed" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                <Area type="monotone" dataKey="suspicious" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Incidents</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={securityMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="threats" fill="#ef4444" name="Threats" />
                <Bar dataKey="blocked" fill="#f59e0b" name="Blocked" />
                <Bar dataKey="alerts" fill="#3b82f6" name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Access Logs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Access Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">File</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {accessLogs.map((log, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-600">
                          {log.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900 font-mono text-sm">{log.file}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.action === 'Access Denied' ? 'bg-red-100 text-red-800' :
                      log.action === 'Download' ? 'bg-blue-100 text-blue-800' :
                      log.action === 'Edit' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{log.time}</td>
                  <td className="py-3 px-4 text-gray-600">{log.location}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        log.risk === 'high' ? 'bg-red-500' :
                        log.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className={`text-sm font-medium ${
                        log.risk === 'high' ? 'text-red-700' :
                        log.risk === 'medium' ? 'text-yellow-700' : 'text-green-700'
                      }`}>
                        {log.risk.toUpperCase()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h4 className="font-medium text-red-900">Suspicious Access Detected</h4>
              </div>
              <p className="text-sm text-red-700 mt-1">Unusual access pattern from unknown location</p>
              <p className="text-xs text-red-600 mt-1">2 hours ago</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">After Hours Access</h4>
              </div>
              <p className="text-sm text-yellow-700 mt-1">File accessed outside business hours</p>
              <p className="text-xs text-yellow-600 mt-1">5 hours ago</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Security Policy Updated</h4>
              </div>
              <p className="text-sm text-blue-700 mt-1">New access controls implemented</p>
              <p className="text-xs text-blue-600 mt-1">1 day ago</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Successful Accesses</span>
              <span className="text-sm text-green-600 font-medium">1,203 (96.5%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Failed Attempts</span>
              <span className="text-sm text-red-600 font-medium">44 (3.5%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Most Accessed File</span>
              <span className="text-sm text-blue-600 font-medium">Financial_Report_Q4.xlsx</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Peak Access Time</span>
              <span className="text-sm text-purple-600 font-medium">3:00 PM - 4:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};