import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Calendar,
  Clock, 
  TrendingUp, 
  FileText, 
  Target,
  CheckCircle,
  Bot,
  Send,
  Zap,
  Heart,
  Activity,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ActionableItems } from './ActionableItems';

// Mock personal data for the user
const getPersonalData = (user: any) => ({
  profile: {
    joinDate: '2023-01-15',
    employeeId: 'EMP-' + user.id.slice(-4).toUpperCase(),
    manager: user.department === 'Engineering' ? 'Mike Manager' : 
             user.department === 'Marketing' ? 'Sarah Manager' : 
             user.department === 'Sales' ? 'Sales Manager' : 'Team Lead',
    location: 'New York, NY',
    timezone: 'EST',
    workingHours: '9:00 AM - 6:00 PM'
  },
  personalMetrics: {
    emailsToday: 23,
    emailsThisWeek: 156,
    avgResponseTime: '2.4 hours',
    meetingsToday: 4,
    meetingsThisWeek: 18,
    focusTimeToday: '4.2 hours',
    productivityScore: 87,
    collaborationScore: 92
  },
  weeklyTrend: [
    { day: 'Mon', productivity: 85, emails: 28, meetings: 3, focus: 4.5 },
    { day: 'Tue', productivity: 92, emails: 31, meetings: 4, focus: 3.8 },
    { day: 'Wed', productivity: 78, emails: 25, meetings: 6, focus: 2.5 },
    { day: 'Thu', productivity: 89, emails: 33, meetings: 2, focus: 5.2 },
    { day: 'Fri', productivity: 87, emails: 29, meetings: 3, focus: 4.1 }
  ],
  communicationBreakdown: [
    { name: 'Internal Emails', value: 65, color: '#3b82f6' },
    { name: 'External Emails', value: 20, color: '#10b981' },
    { name: 'Teams Messages', value: 15, color: '#f59e0b' }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'email',
      title: 'Responded to project update from Sarah',
      time: '10 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Attended team standup meeting',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'document',
      title: 'Reviewed Q4 planning document',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'task',
      title: 'Updated project timeline',
      time: '6 hours ago',
      status: 'completed'
    }
  ]
});

export const UserPersonalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [aiMessage, setAiMessage] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      type: 'ai',
      message: `Hello ${user?.name}! I'm your personal AI assistant. I can help you with productivity insights, schedule optimization, and task management. What would you like to know about your work patterns?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  if (!user) return null;

  const personalData = getPersonalData(user);

  const handleAiMessage = () => {
    if (!aiMessage.trim()) return;

    const newUserMessage = {
      type: 'user',
      message: aiMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    const aiResponse = {
      type: 'ai',
      message: generatePersonalAIResponse(aiMessage, personalData),
      timestamp: new Date().toLocaleTimeString()
    };

    setAiChatHistory(prev => [...prev, newUserMessage, aiResponse]);
    setAiMessage('');
  };

  const generatePersonalAIResponse = (message: string, data: any): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('productivity') || lowerMessage.includes('performance')) {
      return `Your productivity score is ${data.personalMetrics.productivityScore}% this week! You've maintained strong focus time (${data.personalMetrics.focusTimeToday} today) and your email response time of ${data.personalMetrics.avgResponseTime} is excellent. Consider scheduling more focus blocks for optimal performance.`;
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('communication')) {
      return `You've handled ${data.personalMetrics.emailsToday} emails today and ${data.personalMetrics.emailsThisWeek} this week. Your response time of ${data.personalMetrics.avgResponseTime} is 20% better than average. I notice you have some pending responses - would you like me to help prioritize them?`;
    }
    
    if (lowerMessage.includes('meeting') || lowerMessage.includes('calendar')) {
      return `You have ${data.personalMetrics.meetingsToday} meetings today and ${data.personalMetrics.meetingsThisWeek} this week. Your meeting load is well-balanced. I recommend blocking 2-hour focus time slots between meetings for optimal productivity.`;
    }
    
    if (lowerMessage.includes('task') || lowerMessage.includes('action') || lowerMessage.includes('todo')) {
      return `Based on your action items, you have several tasks that need attention. Your highest priority item is responding to pending emails. Would you like me to help you create a schedule to complete these efficiently?`;
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      return `Your optimal productivity hours appear to be in the morning. You typically have ${data.personalMetrics.focusTimeToday} of focus time daily. I suggest blocking 9-11 AM for deep work when possible.`;
    }
    
    if (lowerMessage.includes('team') || lowerMessage.includes('collaboration')) {
      return `Your collaboration score is ${data.personalMetrics.collaborationScore}% - excellent! You're actively participating in team discussions and document reviews. Your manager ${data.profile.manager} has noted your strong teamwork.`;
    }
    
    return `I can help you with productivity analysis, email management, meeting optimization, and task prioritization. Your current productivity score is ${data.personalMetrics.productivityScore}% - great work! What specific area would you like to improve?`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'meeting': return Calendar;
      case 'document': return FileText;
      case 'task': return Target;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Header */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.department} Department</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>ID: {personalData.profile.employeeId}</span>
                <span>Manager: {personalData.profile.manager}</span>
                <span>Location: {personalData.profile.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              <p>Working Hours: {personalData.profile.workingHours}</p>
              <p>Timezone: {personalData.profile.timezone}</p>
              <p>Joined: {new Date(personalData.profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{personalData.personalMetrics.productivityScore}%</p>
              <p className="text-sm text-gray-600">Your Productivity Score</p>
              <p className="text-xs text-green-600 mt-1">↑ 5% from last week</p>
            </div>
          </div>
        </div>
        <div className="metric-card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{personalData.personalMetrics.emailsToday}</p>
              <p className="text-sm text-gray-600">Emails Today</p>
              <p className="text-xs text-blue-600 mt-1">Avg response: {personalData.personalMetrics.avgResponseTime}</p>
            </div>
          </div>
        </div>
        <div className="metric-card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{personalData.personalMetrics.focusTimeToday}</p>
              <p className="text-sm text-gray-600">Focus Time Today</p>
              <p className="text-xs text-purple-600 mt-1">{personalData.personalMetrics.meetingsToday} meetings scheduled</p>
            </div>
          </div>
        </div>
        <div className="metric-card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{personalData.personalMetrics.collaborationScore}%</p>
              <p className="text-sm text-gray-600">Collaboration Score</p>
              <p className="text-xs text-red-600 mt-1">Excellent teamwork!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Productivity Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Weekly Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={personalData.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Line type="monotone" dataKey="productivity" stroke="#10b981" strokeWidth={3} name="Productivity" />
                <Line type="monotone" dataKey="focus" stroke="#3b82f6" strokeWidth={2} name="Focus Hours" />
                <Line type="monotone" dataKey="emails" stroke="#f59e0b" strokeWidth={2} name="Emails" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personal AI Assistant */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Bot className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Your Personal AI Assistant</h3>
          </div>
          
          <div className="h-48 overflow-y-auto mb-4 space-y-3 bg-gray-50 rounded-lg p-3">
            {aiChatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  chat.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p>{chat.message}</p>
                  <p className={`text-xs mt-1 ${
                    chat.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {chat.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiMessage()}
              placeholder="Ask about your productivity, tasks, or schedule..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleAiMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Items and Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Action Items */}
        <div className="card">
          <ActionableItems />
        </div>

        {/* Communication Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Communication Patterns</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personalData.communicationBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {personalData.communicationBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Recent Activities</h3>
          <div className="space-y-3">
            {personalData.recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Insights */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Insights & Tips</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Great Progress</span>
              </div>
              <p className="text-sm text-green-700">Your productivity score improved by 5% this week. Keep up the excellent work!</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Optimization Tip</span>
              </div>
              <p className="text-sm text-blue-700">Consider batching similar tasks together. Your focus time could increase by 15%.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Activity className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-900">Work-Life Balance</span>
              </div>
              <p className="text-sm text-purple-700">You're maintaining healthy work hours. Your average day ends at 5:45 PM.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => alert('Opening priority emails...\n\nThis would:\n- Show high-priority emails\n- Suggest responses\n- Help prioritize replies')}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <Mail className="w-6 h-6 text-blue-600 mb-2" />
            <div className="font-medium text-blue-900">Check Priority Emails</div>
            <div className="text-sm text-blue-700">3 high priority</div>
          </button>
          <button 
            onClick={() => alert('Opening calendar to schedule focus time...\n\nThis would:\n- Show available time slots\n- Block calendar for deep work\n- Set do-not-disturb status')}
            className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
          >
            <Calendar className="w-6 h-6 text-green-600 mb-2" />
            <div className="font-medium text-green-900">Schedule Focus Time</div>
            <div className="text-sm text-green-700">Block calendar</div>
          </button>
          <button 
            onClick={() => alert('Opening task management...\n\nThis would:\n- Show all pending tasks\n- Allow task prioritization\n- Set deadlines and reminders')}
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <Target className="w-6 h-6 text-purple-600 mb-2" />
            <div className="font-medium text-purple-900">Review Tasks</div>
            <div className="text-sm text-purple-700">3 pending items</div>
          </button>
          <button 
            onClick={() => alert('Opening detailed analytics...\n\nThis would:\n- Show comprehensive reports\n- Display productivity trends\n- Provide improvement suggestions')}
            className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left"
          >
            <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
            <div className="font-medium text-orange-900">View Analytics</div>
            <div className="text-sm text-orange-700">Full report</div>
          </button>
        </div>
      </div>
    </div>
  );
};