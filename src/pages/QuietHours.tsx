import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, Moon, Sun, Coffee } from 'lucide-react';
import { quietHoursData } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const QuietHours: React.FC = () => {
  const { user } = useAuth();

  // Only allow CEO and Manager access
  if (!user || (user.role !== 'ceo' && user.role !== 'manager')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-gray-600">Only managers and executives can access quiet hours analysis.</p>
        </div>
      </div>
    );
  }

  const title = user.role === 'manager' ? `${user.department} Team Quiet Hours` : 'Company Quiet Hours Analysis';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <Moon className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">6-8 AM</p>
              <p className="text-sm text-gray-600">Quietest Hours</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Sun className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">10-11 AM</p>
              <p className="text-sm text-gray-600">Peak Activity</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Coffee className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">12-1 PM</p>
              <p className="text-sm text-gray-600">Lunch Break</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">7.2h</p>
              <p className="text-sm text-gray-600">Avg Active Hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity Pattern</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quietHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Bar dataKey="activity" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quietHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Line type="monotone" dataKey="activity" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">Optimal Meeting Times</h4>
              <p className="text-sm text-blue-700 mt-1">Schedule important meetings between 9 AM - 11 AM for maximum participation</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">Focus Time</h4>
              <p className="text-sm text-green-700 mt-1">Early morning (6-8 AM) shows lowest interruptions - ideal for deep work</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900">Communication Strategy</h4>
              <p className="text-sm text-purple-700 mt-1">Avoid sending urgent messages after 6 PM for better work-life balance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Pattern Analysis</h3>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-sm font-medium text-gray-700 mb-2">{day}</div>
              <div className={`h-20 rounded-lg flex items-end justify-center ${
                index < 5 ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <div 
                  className={`w-full rounded-lg ${
                    index < 5 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ height: `${[85, 90, 88, 92, 87, 25, 15][index]}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{[85, 90, 88, 92, 87, 25, 15][index]}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};