import React from 'react';
import { TrendingUp, Clock, Target, Award, Calendar, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const productivityTrends = [
  { week: 'Week 1', score: 72, focus: 68, collaboration: 75, communication: 70 },
  { week: 'Week 2', score: 78, focus: 74, collaboration: 80, communication: 76 },
  { week: 'Week 3', score: 75, focus: 71, collaboration: 78, communication: 74 },
  { week: 'Week 4', score: 82, focus: 85, collaboration: 79, communication: 81 },
  { week: 'Week 5', score: 85, focus: 88, collaboration: 82, communication: 84 },
  { week: 'Week 6', score: 87, focus: 90, collaboration: 84, communication: 86 }
];

const teamScores = [
  { team: 'Engineering', score: 92, members: 12, trend: 'up' },
  { team: 'Marketing', score: 87, members: 8, trend: 'up' },
  { team: 'Sales', score: 84, members: 15, trend: 'down' },
  { team: 'Product', score: 89, members: 6, trend: 'up' },
  { team: 'HR', score: 78, members: 4, trend: 'stable' }
];

const focusMetrics = [
  { name: 'Focus Time', value: 85, fill: '#3b82f6' },
  { name: 'Meeting Efficiency', value: 78, fill: '#10b981' },
  { name: 'Task Completion', value: 92, fill: '#f59e0b' },
  { name: 'Response Time', value: 88, fill: '#8b5cf6' }
];

export const ProductivityScore: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Productivity Score</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => alert('Opening goal setting interface...')}
            className="btn-primary"
          >
            <Target className="w-4 h-4 mr-2" />
            Set Goals
          </button>
          <button 
            onClick={() => alert('Generating productivity report...')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Overall Productivity Score</h2>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">+5% from last week</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${87 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">87</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Overall Score</p>
            <p className="text-xs text-gray-500">Excellent</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${90 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">90</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Focus Time</p>
            <p className="text-xs text-gray-500">Outstanding</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${84 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">84</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Collaboration</p>
            <p className="text-xs text-gray-500">Very Good</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${86 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">86</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Communication</p>
            <p className="text-xs text-gray-500">Excellent</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">6.2h</p>
              <p className="text-sm text-gray-600">Daily Focus Time</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-sm text-gray-600">Goal Achievement</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-600">Meeting Efficiency</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} name="Overall" />
                <Line type="monotone" dataKey="focus" stroke="#10b981" strokeWidth={2} name="Focus" />
                <Line type="monotone" dataKey="collaboration" stroke="#f59e0b" strokeWidth={2} name="Collaboration" />
                <Line type="monotone" dataKey="communication" stroke="#8b5cf6" strokeWidth={2} name="Communication" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={focusMetrics}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Scores */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Productivity Scores</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Team</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Members</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Trend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody>
              {teamScores.map((team, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">{team.team}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 mr-2">{team.score}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${team.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{team.members}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        team.trend === 'up' ? 'text-green-600' :
                        team.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        team.trend === 'up' ? 'text-green-600' :
                        team.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {team.trend === 'up' ? 'Improving' :
                         team.trend === 'down' ? 'Declining' : 'Stable'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      team.score >= 90 ? 'bg-green-100 text-green-800' :
                      team.score >= 80 ? 'bg-blue-100 text-blue-800' :
                      team.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {team.score >= 90 ? 'Outstanding' :
                       team.score >= 80 ? 'Excellent' :
                       team.score >= 70 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">Strong Focus Performance</h4>
              <p className="text-sm text-green-700 mt-1">Your focus time has improved by 15% this month</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">Collaboration Excellence</h4>
              <p className="text-sm text-blue-700 mt-1">Team collaboration scores are above industry average</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900">Communication Efficiency</h4>
              <p className="text-sm text-purple-700 mt-1">Response times have decreased by 20%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900">Optimize Meeting Schedule</h4>
              <p className="text-sm text-yellow-700 mt-1">Consider reducing meeting frequency by 10% to increase focus time</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900">Break Optimization</h4>
              <p className="text-sm text-orange-700 mt-1">Schedule regular breaks to maintain high productivity levels</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-indigo-900">Goal Setting</h4>
              <p className="text-sm text-indigo-700 mt-1">Set weekly productivity targets to maintain momentum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};