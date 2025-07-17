import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { emailHeatmapData } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const pieData = [
  { name: 'Marketing', value: 35, color: '#3b82f6' },
  { name: 'Transactions', value: 25, color: '#10b981' },
  { name: 'Shipping', value: 20, color: '#f59e0b' },
  { name: 'Other', value: 20, color: '#ef4444' }
];

export const EmailAnalytics: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter data based on user role and department
  const getFilteredData = () => {
    if (!user) return { data: emailHeatmapData, title: 'Email Analytics' };

    switch (user.role) {
      case 'user':
        return {
          data: emailHeatmapData.map(item => ({
            ...item,
            marketing: user.department === 'Marketing' ? item.marketing : 0,
            other: Math.floor(item.other * 0.1), // Personal emails
            shipping: 0,
            transactions: user.department === 'Sales' ? item.transactions : 0
          })),
          title: 'Your Email Analytics',
          totalEmails: '47',
          responseRate: '96.8%',
          avgResponseTime: '1.8h'
        };
      
      case 'manager':
        return {
          data: emailHeatmapData.map(item => ({
            ...item,
            marketing: user.department === 'Marketing' ? item.marketing : Math.floor(item.marketing * 0.3),
            other: Math.floor(item.other * 0.6),
            shipping: user.department === 'Operations' ? item.shipping : Math.floor(item.shipping * 0.2),
            transactions: user.department === 'Sales' ? item.transactions : Math.floor(item.transactions * 0.4)
          })),
          title: `${user.department} Team Email Analytics`,
          totalEmails: '2,847',
          responseRate: '91.5%',
          avgResponseTime: '3.2h'
        };
      
      default:
        return {
          data: emailHeatmapData,
          title: 'Company Email Analytics',
          totalEmails: '12,847',
          responseRate: '94.2%',
          avgResponseTime: '2.4h'
        };
    }
  };

  const { data, title, totalEmails = '12,847', responseRate = '94.2%', avgResponseTime = '2.4h' } = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => alert('Generating email analytics report...')}
            className="btn-primary"
          >
            Generate Report
          </button>
          <button 
            onClick={() => {
              const csvData = data.map(row => 
                `${row.date},${row.marketing},${row.other},${row.shipping},${row.transactions}`
              ).join('\n');
              const blob = new Blob([`Date,Marketing,Other,Shipping,Transactions\n${csvData}`], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'email-analytics.csv';
              link.click();
            }}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Volume by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
                <Bar dataKey="marketing" fill="#3b82f6" name="Marketing" />
                <Bar dataKey="other" fill="#ef4444" name="Other" />
                <Bar dataKey="shipping" fill="#f59e0b" name="Shipping" />
                <Bar dataKey="transactions" fill="#10b981" name="Transactions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData.map(item => ({
                    ...item,
                    value: user?.role === 'user' ? Math.floor(item.value * 0.2) : item.value
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/ai-agent')}>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Emails</h4>
          <p className="text-3xl font-bold text-gray-900">{totalEmails}</p>
          <p className="text-sm text-green-600 mt-1">↑ 8.2% from last month</p>
          <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/ai-agent'); }}>Click for AI analysis →</div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/productivity-score')}>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Response Rate</h4>
          <p className="text-3xl font-bold text-gray-900">{responseRate}</p>
          <p className="text-sm text-green-600 mt-1">↑ 2.1% from last month</p>
          <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/productivity-score'); }}>Click for productivity insights →</div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/teams-activity')}>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Avg Response Time</h4>
          <p className="text-3xl font-bold text-gray-900">{avgResponseTime}</p>
          <p className="text-sm text-red-600 mt-1">↓ 0.3h from last month</p>
          <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/teams-activity'); }}>Click for team analysis →</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Performance Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900">Peak Email Hours</h4>
            <p className="text-sm text-blue-700 mt-1">Most emails are sent between 9 AM - 11 AM and 2 PM - 4 PM</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900">Best Performing Category</h4>
            <p className="text-sm text-green-700 mt-1">Marketing emails have the highest engagement rate at 87%</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-900">Improvement Opportunity</h4>
            <p className="text-sm text-yellow-700 mt-1">Transaction emails could benefit from better subject lines</p>
          </div>
        </div>
      </div>
    </div>
  );
};