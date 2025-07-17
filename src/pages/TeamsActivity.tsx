import React from 'react';
import { MessageSquare, Users, Video, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const teamsData = [
  { team: 'Engineering', messages: 1247, meetings: 23, members: 12, activity: 95 },
  { team: 'Marketing', messages: 892, meetings: 18, members: 8, activity: 87 },
  { team: 'Sales', messages: 1156, meetings: 31, members: 15, activity: 92 },
  { team: 'Product', messages: 734, meetings: 15, members: 6, activity: 78 },
  { team: 'HR', messages: 445, meetings: 12, members: 4, activity: 65 }
];

const activityTrends = [
  { day: 'Mon', messages: 245, calls: 12, meetings: 8 },
  { day: 'Tue', messages: 312, calls: 18, meetings: 15 },
  { day: 'Wed', messages: 289, calls: 14, meetings: 12 },
  { day: 'Thu', messages: 356, calls: 22, meetings: 18 },
  { day: 'Fri', messages: 298, calls: 16, meetings: 10 },
  { day: 'Sat', messages: 89, calls: 3, meetings: 2 },
  { day: 'Sun', messages: 67, calls: 2, meetings: 1 }
];

const hourlyActivity = [
  { hour: '9 AM', activity: 45 },
  { hour: '10 AM', activity: 78 },
  { hour: '11 AM', activity: 92 },
  { hour: '12 PM', activity: 65 },
  { hour: '1 PM', activity: 54 },
  { hour: '2 PM', activity: 87 },
  { hour: '3 PM', activity: 95 },
  { hour: '4 PM', activity: 82 },
  { hour: '5 PM', activity: 67 }
];

export const TeamsActivity: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter data based on user role and department
  const getFilteredData = () => {
    if (!user) return { data: teamsData, title: 'Teams Activity', totalMessages: '15,672', activeMeetings: '47', activeUsers: '234' };

    switch (user.role) {
      case 'user':
        const userTeamData = teamsData.filter(team => team.team === user.department);
        return {
          data: userTeamData.length > 0 ? userTeamData : [
            { team: user.department, messages: 156, meetings: 4, members: 8, activity: 87 }
          ],
          title: `Your Team Activity (${user.department})`,
          totalMessages: '156',
          activeMeetings: '4',
          activeUsers: '8'
        };
      
      case 'manager':
        const managerTeamData = teamsData.filter(team => team.team === user.department);
        return {
          data: managerTeamData.length > 0 ? managerTeamData : [
            { team: user.department, messages: 892, meetings: 18, members: 12, activity: 87 }
          ],
          title: `${user.department} Team Activity`,
          totalMessages: '892',
          activeMeetings: '18',
          activeUsers: '12'
        };
      
      default:
        return {
          data: teamsData,
          title: 'Company Teams Activity',
          totalMessages: '15,672',
          activeMeetings: '47',
          activeUsers: '234'
        };
    }
  };

  const { data, title, totalMessages, activeMeetings, activeUsers } = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              // Simulate starting a Teams meeting
              const meetingUrl = `https://teams.microsoft.com/l/meetup-join/19%3ameeting_${Date.now()}`;
              window.open(meetingUrl, '_blank');
              alert('Starting Teams meeting...');
            }}
            className="btn-primary"
          >
            <Video className="w-4 h-4 mr-2" />
            Start Meeting
          </button>
          <button 
            onClick={() => alert('Opening Teams chat...')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            New Chat
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/email-analytics')}>
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
              <p className="text-sm text-gray-600">Messages Today</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/email-analytics'); }}>View email analytics →</div>
            </div>
          </div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/ai-agent')}>
          <div className="flex items-center">
            <Video className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeMeetings}</p>
              <p className="text-sm text-gray-600">Active Meetings</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/ai-agent'); }}>AI meeting insights →</div>
            </div>
          </div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/top-collaborators')}>
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/top-collaborators'); }}>View collaborators →</div>
            </div>
          </div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/productivity-score')}>
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/productivity-score'); }}>Productivity details →</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="messages" fill="#3b82f6" name="Messages" />
                <Bar dataKey="calls" fill="#10b981" name="Calls" />
                <Bar dataKey="meetings" fill="#f59e0b" name="Meetings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Activity Pattern</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Area type="monotone" dataKey="activity" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Teams Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Teams Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Team</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Messages</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Meetings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Members</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Activity Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((team, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{team.team}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{team.messages.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Video className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{team.meetings}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{team.members}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${team.activity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{team.activity}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">New message in Engineering team</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Video className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Marketing team meeting started</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">New member joined Sales team</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">Most Active Team</h4>
              <p className="text-sm text-green-700 mt-1">Engineering team leads with 95% activity score</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">Peak Communication</h4>
              <p className="text-sm text-blue-700 mt-1">Highest message volume between 2-4 PM</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900">Meeting Efficiency</h4>
              <p className="text-sm text-purple-700 mt-1">Average meeting duration: 32 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};