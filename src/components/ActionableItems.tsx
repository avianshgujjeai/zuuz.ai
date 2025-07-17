import React, { useState } from 'react';
import { AlertTriangle, Clock, Shield, Users, ArrowRight, Mail, FileText, CheckCircle, Bot, Zap, RefreshCw, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EmailDetailModal } from './EmailDetailModal';

interface Email {
  id: string;
  sender: string;
  subject: string;
  content: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  preview?: string;
}

interface ActionableItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  count: number;
  dueDate?: string;
  assignedTo?: string;
  department?: string;
  actionType: 'email' | 'document' | 'security' | 'meeting' | 'system' | 'hr' | 'personal';
}

const getActionableItemsForRole = (role: string, department?: string): ActionableItem[] => {
  const baseItems: ActionableItem[] = [
    {
      id: '1',
      title: 'Emails Unanswered > 48 Hours',
      description: '23 emails require immediate attention',
      priority: 'high',
      category: 'Communication',
      count: 23,
      dueDate: '2 hours',
      actionType: 'email'
    },
    {
      id: '2',
      title: 'Stale Documents (No update in 90 days)',
      description: '156 documents need review',
      priority: 'medium',
      category: 'Documentation',
      count: 156,
      dueDate: '1 week',
      actionType: 'document'
    },
    {
      id: '3',
      title: 'Large File Transfers or Unusual Access',
      description: '8 suspicious activities detected',
      priority: 'high',
      category: 'Security',
      count: 8,
      dueDate: 'Immediate',
      actionType: 'security'
    },
    {
      id: '4',
      title: 'High Meeting Load (>5 hours/day)',
      description: '12 employees affected',
      priority: 'medium',
      category: 'Productivity',
      count: 12,
      dueDate: '3 days',
      actionType: 'meeting'
    },
    {
      id: '5',
      title: 'Pending Performance Reviews',
      description: '7 reviews overdue',
      priority: 'high',
      category: 'HR',
      count: 7,
      dueDate: '1 day',
      actionType: 'hr'
    },
    {
      id: '6',
      title: 'System Updates Required',
      description: '15 critical updates pending',
      priority: 'medium',
      category: 'IT',
      count: 15,
      dueDate: '2 days',
      actionType: 'system'
    }
  ];

  switch (role) {
    case 'user':
      return [
        {
          id: 'u1',
          title: 'Your Pending Email Responses',
          description: '3 emails need your response',
          priority: 'high',
          category: 'Personal',
          count: 3,
          dueDate: '4 hours',
          actionType: 'email'
        },
        {
          id: 'u2',
          title: 'Quarterly Self-Assessment',
          description: 'Due by end of week',
          priority: 'medium',
          category: 'HR',
          count: 1,
          dueDate: '3 days',
          actionType: 'personal'
        },
        {
          id: 'u3',
          title: 'Document Review Required',
          description: 'Team document needs your input',
          priority: 'medium',
          category: 'Collaboration',
          count: 2,
          dueDate: '1 day',
          actionType: 'document'
        }
      ];
    
    case 'manager':
      return baseItems.filter(item => 
        item.category === 'Communication' || 
        item.category === 'Productivity' || 
        item.category === 'HR'
      ).map(item => ({
        ...item,
        department,
        description: `${item.description} in ${department} team`
      }));
    
    case 'admin':
      return baseItems.filter(item => 
        item.category === 'Security' || 
        item.category === 'IT' || 
        item.category === 'HR'
      );
    
    case 'ceo':
    default:
      return baseItems;
  }
};

export const ActionableItems: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [processingItems, setProcessingItems] = useState<string[]>([]);
  const [aiProgress, setAiProgress] = useState<Record<string, number>>({});
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState<string | null>(null);

  if (!user) return null;

  const actionableItems = getActionableItemsForRole(user.role, user.department);
  
  const getImportantEmails = (user: any): Email[] => {
    const baseEmails = [
      {
        id: 'email-1',
        sender: 'Sarah Johnson',
        subject: 'Urgent: Q4 Budget Review Required',
        content: 'Hi there, I need your input on the Q4 budget allocations. The finance team is waiting for your department\'s numbers.',
        time: '3 days ago',
        priority: 'high' as const,
        preview: 'Hi there, I need your input on the Q4 budget allocations...'
      },
      {
        id: 'email-2',
        sender: 'Mike Chen',
        subject: 'Project Timeline Concerns',
        content: 'I wanted to follow up on our discussion about the project timeline. The client is asking for updates.',
        time: '2 days ago',
        priority: 'high' as const,
        preview: 'I wanted to follow up on our discussion about the project timeline...'
      },
      {
        id: 'email-3',
        sender: 'Emily Davis',
        subject: 'Marketing Campaign Approval Needed',
        content: 'The marketing campaign materials are ready for your review. We need approval by Friday.',
        time: '2 days ago',
        priority: 'medium' as const,
        preview: 'The marketing campaign materials are ready for your review...'
      }
    ];

    // Customize emails based on user role
    switch (user.role) {
      case 'ceo':
        return [
          {
            id: 'ceo-1',
            sender: 'Board of Directors',
            subject: 'Q4 Strategic Review Meeting',
            content: 'The board would like to schedule the quarterly strategic review. Please confirm your availability for next week.',
            time: '2 hours ago',
            priority: 'high' as const,
            preview: 'The board would like to schedule the quarterly strategic review...'
          },
          ...baseEmails.slice(0, 2)
        ];
      case 'admin':
        return [
          {
            id: 'admin-1',
            sender: 'IT Security',
            subject: 'System Maintenance Required',
            content: 'Critical security patches need to be applied to the main servers. Maintenance window required.',
            time: '1 hour ago',
            priority: 'high' as const,
            preview: 'Critical security patches need to be applied to the main servers...'
          },
          ...baseEmails.slice(0, 2)
        ];
      case 'manager':
        return [
          {
            id: 'mgr-1',
            sender: 'Team Lead',
            subject: 'Project Milestone Update',
            content: 'The development team has reached the next milestone. Please review the deliverables.',
            time: '3 hours ago',
            priority: 'medium' as const,
            preview: 'The development team has reached the next milestone...'
          },
          ...baseEmails.slice(0, 2)
        ];
      default:
        return baseEmails;
    }
  };

  const simulateAIProcessing = async (itemId: string, actionType: string) => {
    setProcessingItems(prev => [...prev, itemId]);
    setAiProgress(prev => ({ ...prev, [itemId]: 0 }));

    // Simulate AI processing with progress updates
    const steps = getProcessingSteps(actionType);
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAiProgress(prev => ({ ...prev, [itemId]: ((i + 1) / steps.length) * 100 }));
    }

    // Complete processing
    setProcessingItems(prev => prev.filter(id => id !== itemId));
    setCompletedItems(prev => [...prev, itemId]);
    setAiProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[itemId];
      return newProgress;
    });

    // Show completion message
    const item = actionableItems.find(i => i.id === itemId);
    if (item) {
      setExpandedItem(itemId);
    }
  };

  const getProcessingSteps = (actionType: string): string[] => {
    switch (actionType) {
      case 'email':
        return [
          'Analyzing email content and priority',
          'Generating AI responses',
          'Scheduling follow-ups',
          'Updating email status'
        ];
      case 'document':
        return [
          'Scanning document metadata',
          'Identifying stale content',
          'Notifying document owners',
          'Creating review schedule'
        ];
      case 'security':
        return [
          'Analyzing access patterns',
          'Checking security protocols',
          'Generating security report',
          'Implementing protective measures'
        ];
      case 'meeting':
        return [
          'Analyzing calendar data',
          'Identifying optimization opportunities',
          'Generating recommendations',
          'Notifying affected employees'
        ];
      case 'system':
        return [
          'Checking system compatibility',
          'Scheduling maintenance window',
          'Preparing update packages',
          'Initiating update process'
        ];
      case 'hr':
        return [
          'Reviewing employee records',
          'Generating performance summaries',
          'Scheduling review meetings',
          'Sending notifications'
        ];
      default:
        return [
          'Analyzing task requirements',
          'Processing data',
          'Generating solutions',
          'Implementing changes'
        ];
    }
  };

  const getCompletionMessage = (actionType: string, count: number): string => {
    switch (actionType) {
      case 'email':
        return `✓ Processed ${count} emails\n✓ Generated AI responses for urgent items\n✓ Scheduled follow-up reminders\n✓ Updated priority flags`;
      case 'document':
        return `✓ Reviewed ${count} documents\n✓ Identified outdated content\n✓ Notified document owners\n✓ Created cleanup schedule`;
      case 'security':
        return `✓ Analyzed ${count} security incidents\n✓ Blocked suspicious activities\n✓ Generated security report\n✓ Updated access controls`;
      case 'meeting':
        return `✓ Analyzed ${count} employee schedules\n✓ Identified meeting conflicts\n✓ Suggested optimizations\n✓ Sent recommendations to managers`;
      case 'system':
        return `✓ Prepared ${count} system updates\n✓ Scheduled maintenance window\n✓ Backed up critical data\n✓ Initiated update process`;
      case 'hr':
        return `✓ Processed ${count} performance reviews\n✓ Generated review summaries\n✓ Scheduled manager meetings\n✓ Sent employee notifications`;
      default:
        return `✓ Successfully processed ${count} items\n✓ Applied AI recommendations\n✓ Updated system status\n✓ Notified relevant stakeholders`;
    }
  };

  const handleItemClick = (itemId: string) => {
    const item = actionableItems.find(i => i.id === itemId);
    if (!item || completedItems.includes(itemId) || processingItems.includes(itemId)) return;

    // Navigate to dedicated pages for each action type using React Router
    switch (item.actionType) {
      case 'email':
        setShowEmailModal(itemId);
        break;
      case 'document':
        navigate('/document-analysis');
        break;
      case 'security':
        navigate('/security-analysis');
        break;
      case 'meeting':
        navigate('/meeting-analysis');
        break;
      case 'hr':
        navigate('/performance-review');
        break;
      case 'system':
        navigate('/system-updates');
        break;
      case 'personal':
        simulateAIProcessing(itemId, item.actionType);
        break;
      default:
        simulateAIProcessing(itemId, item.actionType);
        break;
    }
  };

  const handleCompleteItem = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const item = actionableItems.find(i => i.id === itemId);
    if (!item) return;

    setCompletedItems(prev => [...prev, itemId]);
    setExpandedItem(itemId);
  };

  const handleShowDetails = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'Communication': case 'Personal': return Mail;
      case 'Documentation': case 'Collaboration': return FileText;
      case 'Security': case 'IT': return Shield;
      case 'Productivity': case 'HR': return Users;
      default: return AlertTriangle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Personal Email Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Today's Important Emails</h4>
          </div>
          <span className="text-xs text-blue-600">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="space-y-3">
          {getImportantEmails(user).map((email: Email, index: number) => (
            <div key={index} className="p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{email.sender}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      email.priority === 'high' ? 'bg-red-100 text-red-800' :
                      email.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {email.priority}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-1">{email.subject}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{email.preview}</p>
                </div>
                <div className="text-right ml-3">
                  <span className="text-xs text-gray-500">{email.time}</span>
                  <button 
                    onClick={() => navigate('/email-analytics')}
                    className="block mt-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {user.role === 'user' ? 'Your AI Action Items' : 'AI-Powered Action Items'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {actionableItems.filter(item => !completedItems.includes(item.id)).length} pending
          </span>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        {actionableItems.map((item) => {
          const Icon = getIcon(item.category);
          const isCompleted = completedItems.includes(item.id);
          const isProcessing = processingItems.includes(item.id);
          const isExpanded = expandedItem === item.id;
          const progress = aiProgress[item.id] || 0;
          
          return (
            <div key={item.id} className="space-y-2">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  isCompleted 
                    ? 'border-green-200 bg-green-50 opacity-75' 
                    : isProcessing
                    ? 'border-blue-200 bg-blue-50'
                    : getPriorityColor(item.priority)
                }`}
                onClick={() => !isCompleted && !isProcessing && handleItemClick(item.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : isProcessing ? (
                      <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-gray-600 mt-0.5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className={`font-medium ${
                        isCompleted ? 'text-green-800 line-through' : 
                        isProcessing ? 'text-blue-800' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className={`text-lg font-bold ${
                          isCompleted ? 'text-green-600' :
                          isProcessing ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {item.count}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      isCompleted ? 'text-green-700' : 
                      isProcessing ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {isProcessing ? 'AI Agent is processing...' : item.description}
                    </p>

                    {/* AI Processing Progress */}
                    {isProcessing && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-blue-600 mb-1">
                          <span>AI Processing Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{item.category}</span>
                        {item.department && (
                          <span className="text-xs text-blue-600">• {item.department}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.dueDate && !isProcessing && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            Due: {item.dueDate}
                          </div>
                        )}
                        
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          isCompleted ? 'bg-green-100 text-green-800' : 
                          isProcessing ? 'bg-blue-100 text-blue-800' :
                          getPriorityBadgeColor(item.priority)
                        }`}>
                          {isCompleted ? 'COMPLETED' : 
                           isProcessing ? 'PROCESSING' : 
                           item.priority.toUpperCase()}
                        </span>
                        
                        {!isCompleted && !isProcessing && (
                          <>
                            <button
                              onClick={(e) => handleCompleteItem(item.id, e)}
                              className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                              title="Mark as manually completed"
                            >
                              Manual
                            </button>
                            <button
                              onClick={(e) => handleShowDetails(item.id, e)}
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                              title="View details"
                            >
                              <ExternalLink className="w-3 h-3 inline mr-1" />
                              Details
                            </button>
                            <div className="flex items-center text-xs text-blue-600">
                              <Zap className="w-3 h-3 mr-1" />
                              <span>AI Ready</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div className="ml-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  {isCompleted ? (
                    <div className="space-y-3">
                      <h5 className="font-medium text-green-900">✅ Task Completed Successfully!</h5>
                      <div className="text-sm text-green-700 whitespace-pre-line">
                        {getCompletionMessage(item.actionType, item.count)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed at {new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">Task Details</h5>
                      <div className="text-sm text-gray-700">
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Priority:</strong> {item.priority.toUpperCase()}</p>
                        <p><strong>Due Date:</strong> {item.dueDate}</p>
                        <p><strong>Items Affected:</strong> {item.count}</p>
                        {item.department && <p><strong>Department:</strong> {item.department}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleItemClick(item.id)}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          Start AI Processing
                        </button>
                        <button
                          onClick={() => setShowEmailModal('important-emails')}
                          className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Agent Status */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">AI Agent Status</h4>
        </div>
        <p className="text-sm text-blue-700">
          {processingItems.length > 0 
            ? `Currently processing ${processingItems.length} task${processingItems.length > 1 ? 's' : ''}. The AI agent is working autonomously to resolve your action items.`
            : user.role === 'user' 
            ? 'Your personal AI agent is ready to help with productivity tasks, email management, and workflow optimization. Click any action item to start AI processing.'
            : user.role === 'manager'
            ? `Your team AI agent is monitoring ${user.department} department tasks and can automatically process team-related action items. Click any item to delegate to AI.`
            : user.role === 'admin'
            ? 'System AI agent is monitoring security, IT infrastructure, and user management tasks. All critical systems are under AI supervision.'
            : 'Enterprise AI agent is analyzing company-wide patterns and can automatically process organizational action items. Click any item for AI assistance.'
          }
        </p>
        
        {completedItems.length > 0 && (
          <div className="mt-2 text-xs text-green-700">
            ✅ AI Agent has completed {completedItems.length} task{completedItems.length > 1 ? 's' : ''} today
          </div>
        )}
      </div>

      {/* Email Detail Modal */}
      {showEmailModal && (
        <EmailDetailModal
          itemId={showEmailModal}
          onClose={() => setShowEmailModal(null)}
        />
      )}
    </div>
  );
};