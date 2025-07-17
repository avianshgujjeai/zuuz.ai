import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, Mic, FileText, BarChart3, Users, MessageSquare, Zap, Brain, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AIAgent: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: `Hello ${user?.name || 'there'}! I'm your CloudBox AI Assistant. I can help you analyze your Office 365 data, generate insights, and answer questions about your productivity metrics. What would you like to know?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const quickActions = [
    { icon: BarChart3, label: 'Generate Dashboard Report', query: 'Generate a comprehensive dashboard report for this week' },
    { icon: Users, label: 'Team Performance Analysis', query: 'Analyze team performance and collaboration patterns' },
    { icon: MessageSquare, label: 'Communication Insights', query: 'Show me communication patterns and email analytics' },
    { icon: FileText, label: 'Document Usage Report', query: 'Generate a report on document collaboration and usage' }
  ];

  const aiCapabilities = [
    {
      icon: Brain,
      title: 'Intelligent Analytics',
      description: 'Advanced AI algorithms analyze your Office 365 data to provide actionable insights',
      action: () => navigate('/email-analytics')
    },
    {
      icon: Search,
      title: 'Natural Language Queries',
      description: 'Ask questions in plain English and get detailed answers about your data',
      action: () => navigate('/teams-activity')
    },
    {
      icon: Zap,
      title: 'Automated Insights',
      description: 'Receive proactive recommendations and alerts based on your usage patterns',
      action: () => navigate('/productivity-score')
    },
    {
      icon: FileText,
      title: 'Report Generation',
      description: 'Generate comprehensive reports and summaries with a single command',
      action: () => navigate('/sharepoint-documents')
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      type: 'user',
      message: message,
      timestamp: new Date().toLocaleTimeString()
    };

    // Simulate AI response
    const aiResponse = {
      type: 'ai',
      message: generateAIResponse(message),
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, newUserMessage, aiResponse]);
    setMessage('');
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      'dashboard': user?.role === 'user' 
        ? `Your personal dashboard shows: 23 emails today (92% response rate), productivity score 87%, focus time 4.2 hours. Your collaboration score is 92% - excellent work!`
        : 'Based on your current data: 1,247 emails processed today (94.2% response rate), team collaboration score is 87%, productivity improved 15% this week. Engineering leads with 95% activity. Would you like a detailed report?',
      'team': user?.role === 'user'
        ? `Your team (${user.department}) performance: You're contributing well with 92% collaboration score. Your manager ${user.department === 'Engineering' ? 'Mike Manager' : 'Sarah Manager'} has noted your strong performance.`
        : 'Team performance: Engineering 95% activity, Marketing 87% engagement, Sales 92% collaboration. Cross-department collaboration up 23%. Mike Chen and Sarah Johnson are top performers.',
      'email': user?.role === 'user'
        ? `Your email analytics: 23 emails today, response time 2.4 hours (20% better than average). You have 1 high-priority email pending. Peak productivity 10-11 AM.`
        : 'Email analytics: Peak activity 10-11 AM, 78% positive sentiment, marketing emails 87% engagement rate. Average response time 2.4 hours (improved 20%). 23 emails need attention.',
      'document': user?.role === 'user'
        ? `Your document activity: 5 documents accessed today, 2 collaborative edits. You have 1 document review pending from your team.`
        : 'Document insights: 1,247 active documents, 342 collaborators, 8,934 edits this week. Marketing presentations most popular. 156 stale documents need review.',
      'security': user?.role === 'user'
        ? `Your security status: All good! No security alerts for your account. Last login from your usual location. Keep up the secure practices.`
        : 'Security status: 98.7% security score, 3 alerts requiring attention. Detected unusual file access from 2 external locations. 8 suspicious activities blocked.',
      'productivity': user?.role === 'user'
        ? `Your productivity: Score 87% (up 5% this week), focus time 4.2 hours today. You have 4 meetings today - consider blocking focus time between them.`
        : 'Productivity analysis: Overall score 87% (up 5%), focus time improved 15%. 12 employees have >5h meetings daily. Recommend meeting-free time blocks.',
      'sentiment': user?.role === 'user'
        ? `Your work sentiment: 88% positive this week! Your work-life balance is healthy. You seem engaged with current projects.`
        : 'Sentiment analysis: 88% positive team sentiment (up 8%), work-life balance discussions 85% positive. Project management needs attention (76% positive).',
      'default': user?.role === 'user'
        ? `I can help with your personal productivity, email management, task prioritization, and work-life balance. Your current productivity score is 87% - great work! What would you like to improve?`
        : 'I can analyze emails, teams activity, document collaboration, productivity scores, security patterns, and sentiment. What specific insights would you like?'
    };

    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('report')) return responses.dashboard;
    if (lowerMessage.includes('team') || lowerMessage.includes('performance')) return responses.team;
    if (lowerMessage.includes('email') || lowerMessage.includes('communication')) return responses.email;
    if (lowerMessage.includes('document') || lowerMessage.includes('collaboration')) return responses.document;
    if (lowerMessage.includes('security') || lowerMessage.includes('access')) return responses.security;
    if (lowerMessage.includes('productivity') || lowerMessage.includes('score')) return responses.productivity;
    if (lowerMessage.includes('sentiment') || lowerMessage.includes('mood')) return responses.sentiment;
    return responses.default;
  };

  const handleQuickAction = (query: string) => {
    setMessage(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ZUUZ AI Agent</h1>
            <p className="text-gray-600">Your intelligent Office 365 analytics assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Online</span>
        </div>
      </div>

      {/* Branding */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <p className="text-center text-sm text-gray-600">🤖 <strong>ZUUZ</strong> - Advanced AI Analytics Platform | Powered by <strong>CloudBox</strong></p>
      </div>

      {/* AI Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiCapabilities.map((capability, index) => (
          <div 
            key={index} 
            className="card cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={capability.action}
          >
            <div className="flex items-center mb-3">
              <capability.icon className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">{capability.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{capability.description}</p>
            <div className="mt-3 text-xs text-blue-600 font-medium">Click to explore →</div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card h-96 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat with AI Assistant</h3>
            
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                    <p className={`text-xs mt-1 ${
                      chat.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {chat.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your Office 365 data..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.query)}
                className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <action.icon className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Pro Tip</h4>
            <p className="text-sm text-blue-700">
              Try asking specific questions like "Show me email patterns for the marketing team" or "Generate a productivity report for this month"
            </p>
          </div>
        </div>
      </div>

      {/* Recent AI Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900">Productivity Boost Detected</h4>
            <p className="text-sm text-green-700 mt-1">Your team's productivity increased by 15% this week, primarily due to improved email response times.</p>
            <p className="text-xs text-green-600 mt-2">2 hours ago</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900">Collaboration Pattern</h4>
            <p className="text-sm text-blue-700 mt-1">Cross-department collaboration has increased by 23%, with Engineering and Marketing teams leading.</p>
            <p className="text-xs text-blue-600 mt-2">4 hours ago</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900">Meeting Optimization</h4>
            <p className="text-sm text-purple-700 mt-1">AI suggests reducing meeting frequency by 10% to increase focus time and productivity.</p>
            <p className="text-xs text-purple-600 mt-2">6 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;