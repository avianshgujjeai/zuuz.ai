import React from 'react';
import { Heart, MessageSquare, TrendingUp, Users, Smile, Frown, Meh } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

const sentimentTrends = [
  { week: 'Week 1', positive: 65, neutral: 25, negative: 10 },
  { week: 'Week 2', positive: 70, neutral: 22, negative: 8 },
  { week: 'Week 3', positive: 68, neutral: 24, negative: 8 },
  { week: 'Week 4', positive: 75, neutral: 20, negative: 5 },
  { week: 'Week 5', positive: 78, neutral: 18, negative: 4 },
  { week: 'Week 6', positive: 82, neutral: 15, negative: 3 }
];

const teamSentiment = [
  { team: 'Engineering', positive: 85, neutral: 12, negative: 3, score: 91 },
  { team: 'Marketing', positive: 78, neutral: 18, negative: 4, score: 87 },
  { team: 'Sales', positive: 72, neutral: 22, negative: 6, score: 83 },
  { team: 'Product', positive: 80, neutral: 15, negative: 5, score: 88 },
  { team: 'HR', positive: 88, neutral: 10, negative: 2, score: 93 }
];

const sentimentDistribution = [
  { name: 'Positive', value: 78, color: '#10b981' },
  { name: 'Neutral', value: 18, color: '#f59e0b' },
  { name: 'Negative', value: 4, color: '#ef4444' }
];

const topicsData = [
  { topic: 'Work-Life Balance', sentiment: 85, mentions: 234 },
  { topic: 'Team Collaboration', sentiment: 92, mentions: 189 },
  { topic: 'Project Management', sentiment: 76, mentions: 156 },
  { topic: 'Communication', sentiment: 88, mentions: 145 },
  { topic: 'Technology Tools', sentiment: 82, mentions: 123 }
];

export const SentimentAnalysis: React.FC = () => {
  const { user } = useAuth();

  // Only allow CEO and Manager access
  if (!user || (user.role !== 'ceo' && user.role !== 'manager')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-gray-600">Only managers and executives can access sentiment analysis.</p>
        </div>
      </div>
    );
  }

  const getFilteredData = () => {
    if (user.role === 'manager') {
      // Filter to show only team data
      const teamSentimentData = teamSentiment.filter(team => team.team === user.department);
      return {
        title: `${user.department} Team Sentiment Analysis`,
        teamData: teamSentimentData.length > 0 ? teamSentimentData : [
          { team: user.department, positive: 85, neutral: 12, negative: 3, score: 91 }
        ]
      };
    }
    return {
      title: 'Company Sentiment Analysis',
      teamData: teamSentiment
    };
  };

  const { title, teamData } = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => alert('Generating sentiment analysis report...')}
            className="btn-primary"
          >
            <Heart className="w-4 h-4 mr-2" />
            Generate Report
          </button>
          <button 
            onClick={() => alert('Opening sentiment trends...')}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Trends
          </button>
        </div>
      </div>

      {/* Overall Sentiment Score */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Overall Sentiment Score</h2>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">+8% from last week</span>
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
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${88 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">88</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Overall Score</p>
            <p className="text-xs text-gray-500">Very Positive</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full">
              <Smile className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">78%</p>
            <p className="text-xs text-gray-500">Positive</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-yellow-100 rounded-full">
              <Meh className="w-12 h-12 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">18%</p>
            <p className="text-xs text-gray-500">Neutral</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full">
              <Frown className="w-12 h-12 text-red-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">4%</p>
            <p className="text-xs text-gray-500">Negative</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-gray-600">Messages Analyzed</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">2,221</p>
              <p className="text-sm text-gray-600">Positive Interactions</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">234</p>
              <p className="text-sm text-gray-600">Active Participants</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">+12%</p>
              <p className="text-sm text-gray-600">Sentiment Improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} name="Positive" />
                <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} name="Neutral" />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} name="Negative" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Sentiment */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Sentiment Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Team</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Sentiment Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Positive</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Neutral</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Negative</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((team, index) => (
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
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${team.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{team.positive}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-yellow-600 font-medium">{team.neutral}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">{team.negative}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      team.score >= 90 ? 'bg-green-100 text-green-800' :
                      team.score >= 80 ? 'bg-blue-100 text-blue-800' :
                      team.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {team.score >= 90 ? 'Excellent' :
                       team.score >= 80 ? 'Good' :
                       team.score >= 70 ? 'Fair' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Topic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Sentiment Analysis</h3>
          <div className="space-y-4">
            {topicsData.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{topic.topic}</p>
                  <p className="text-sm text-gray-600">{topic.mentions} mentions</p>
                </div>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        topic.sentiment >= 85 ? 'bg-green-500' :
                        topic.sentiment >= 70 ? 'bg-blue-500' :
                        topic.sentiment >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${topic.sentiment}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{topic.sentiment}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">Positive Trend</h4>
              <p className="text-sm text-green-700 mt-1">Team collaboration sentiment improved by 15% this month</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">High Engagement</h4>
              <p className="text-sm text-blue-700 mt-1">Work-life balance discussions show 85% positive sentiment</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900">Area for Improvement</h4>
              <p className="text-sm text-yellow-700 mt-1">Project management processes need attention (76% positive)</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900">Communication Excellence</h4>
              <p className="text-sm text-purple-700 mt-1">Internal communication rated highly positive (88%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback Highlights</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Smile className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900">"Great collaboration on the new project! The team communication has been excellent."</p>
              <p className="text-xs text-gray-500 mt-1">Engineering Team • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900">"Love the new tools we're using. They make work so much more efficient!"</p>
              <p className="text-xs text-gray-500 mt-1">Marketing Team • 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Meh className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900">"The project timeline is a bit tight, but we're managing well as a team."</p>
              <p className="text-xs text-gray-500 mt-1">Product Team • 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};