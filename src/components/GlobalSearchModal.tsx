import React, { useState, useEffect } from 'react';
import { X, Search, FileText, Users, Mail, BarChart3, Clock, Zap, ArrowRight, Bot, MessageSquare, Shield, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchModalProps {
  query: string;
  onClose: () => void;
  onQueryChange: (query: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'document' | 'person' | 'metric' | 'insight' | 'email' | 'ai-response' | 'page' | 'action';
  description: string;
  relevance: number;
  path?: string;
  icon: React.ComponentType<any>;
  action: () => void;
  category?: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ query, onClose, onQueryChange }) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiResponse, setAiResponse] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate AI-powered search with comprehensive results
      setTimeout(() => {
        const allResults = generateSearchResults(query);
        setResults(allResults);
        setAiResponse(generateAIResponse(query));
        setIsSearching(false);
      }, 800);
    } else {
      setResults([]);
      setAiResponse('');
    }
  }, [query]);

  const generateSearchResults = (searchQuery: string): SearchResult[] => {
    const lowerQuery = searchQuery.toLowerCase();
    
    const allPossibleResults: SearchResult[] = [
      // AI Agent responses
      {
        id: 'ai-1',
        title: 'AI Analysis: Email Performance',
        type: 'ai-response',
        description: 'Your email response time has improved by 15% this week. Average response time is now 2.4 hours.',
        relevance: 95,
        icon: Bot,
        action: () => {
          navigate('/ai-agent');
          onClose();
        }
      },
      {
        id: 'ai-2',
        title: 'AI Insight: Team Productivity',
        type: 'ai-response',
        description: 'Engineering team shows 23% increase in collaboration. Consider reducing meeting frequency by 10%.',
        relevance: 92,
        icon: Bot,
        action: () => {
          navigate('/ai-agent');
          onClose();
        }
      },
      
      // Documents
      {
        id: 'doc-1',
        title: 'Q4 Financial Report Analysis',
        type: 'document',
        description: 'Comprehensive financial analysis showing 15% revenue growth',
        relevance: 88,
        path: '/documents/financial/',
        icon: FileText,
        action: () => {
          navigate('/sharepoint-documents');
          onClose();
        }
      },
      {
        id: 'doc-2',
        title: 'Marketing Strategy Document',
        type: 'document',
        description: 'Latest marketing campaign strategies and performance metrics',
        relevance: 85,
        path: '/documents/marketing/',
        icon: FileText,
        action: () => {
          navigate('/sharepoint-documents');
          onClose();
        }
      },
      
      // People
      {
        id: 'person-1',
        title: 'Sarah Johnson - Marketing Lead',
        type: 'person',
        description: 'Top collaborator with 245 interactions this month',
        relevance: 90,
        icon: Users,
        action: () => {
          navigate('/top-collaborators');
          onClose();
        }
      },
      {
        id: 'person-2',
        title: 'Mike Chen - Engineering Manager',
        type: 'person',
        description: 'High productivity score (92%) with excellent team collaboration',
        relevance: 87,
        icon: Users,
        action: () => {
          navigate('/top-collaborators');
          onClose();
        }
      },
      
      // Metrics
      {
        id: 'metric-1',
        title: 'Email Response Time Metrics',
        type: 'metric',
        description: 'Average response time: 2.4 hours (improved by 20%)',
        relevance: 89,
        icon: Mail,
        action: () => {
          navigate('/email-analytics');
          onClose();
        }
      },
      {
        id: 'metric-2',
        title: 'Team Productivity Scores',
        type: 'metric',
        description: 'Overall productivity: 87% (up 5% from last week)',
        relevance: 86,
        icon: TrendingUp,
        action: () => {
          navigate('/productivity-score');
          onClose();
        }
      },
      {
        id: 'metric-3',
        title: 'Meeting Load Analysis',
        type: 'metric',
        description: '12 employees with >5 hours of meetings per day',
        relevance: 84,
        icon: Clock,
        action: () => {
          navigate('/quiet-hours');
          onClose();
        }
      },
      
      // Insights
      {
        id: 'insight-1',
        title: 'Collaboration Pattern Analysis',
        type: 'insight',
        description: 'Cross-department collaboration increased by 23% this month',
        relevance: 91,
        icon: BarChart3,
        action: () => {
          navigate('/document-collaboration');
          onClose();
        }
      },
      {
        id: 'insight-2',
        title: 'Security Alert: Unusual File Access',
        type: 'insight',
        description: '8 suspicious file access attempts detected',
        relevance: 93,
        icon: Shield,
        action: () => {
          navigate('/file-access');
          onClose();
        }
      },
      {
        id: 'insight-3',
        title: 'Sentiment Analysis Results',
        type: 'insight',
        description: 'Team sentiment improved to 88% positive (up 8%)',
        relevance: 82,
        icon: Heart,
        action: () => {
          navigate('/sentiment-analysis');
          onClose();
        }
      },
      
      // Pages/Navigation
      {
        id: 'page-1',
        title: 'Dashboard Overview',
        type: 'page',
        description: 'Main dashboard with all key metrics and insights',
        relevance: 80,
        icon: BarChart3,
        action: () => {
          navigate('/dashboard');
          onClose();
        }
      },
      {
        id: 'page-2',
        title: 'Teams Activity Monitor',
        type: 'page',
        description: 'Real-time Teams collaboration and communication data',
        relevance: 78,
        icon: MessageSquare,
        action: () => {
          navigate('/teams-activity');
          onClose();
        }
      },
      
      // Actions
      {
        id: 'action-1',
        title: 'Generate Productivity Report',
        type: 'action',
        description: 'Create comprehensive productivity analysis report',
        relevance: 75,
        icon: FileText,
        action: () => {
          alert('Generating comprehensive productivity report...');
          onClose();
        }
      },
      {
        id: 'action-2',
        title: 'Schedule Team Meeting',
        type: 'action',
        description: 'Start a new Teams meeting or schedule one',
        relevance: 73,
        icon: MessageSquare,
        action: () => {
          window.open('https://teams.microsoft.com/l/meetup-join/19%3ameeting_' + Date.now(), '_blank');
          onClose();
        }
      }
    ];

    // Filter results based on query relevance
    return allPossibleResults
      .filter(result => 
        result.title.toLowerCase().includes(lowerQuery) ||
        result.description.toLowerCase().includes(lowerQuery) ||
        (result.type && result.type.includes(lowerQuery))
      )
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8); // Limit to top 8 results
  };

  const generateAIResponse = (searchQuery: string): string => {
    const lowerQuery = searchQuery.toLowerCase();
    
    if (lowerQuery.includes('email') || lowerQuery.includes('response')) {
      return "Based on your email analytics, I can see your response time has improved significantly. Your current average is 2.4 hours, which is 20% better than last month. The marketing team has the highest engagement rate at 87%.";
    }
    
    if (lowerQuery.includes('team') || lowerQuery.includes('collaboration')) {
      return "Your team collaboration metrics show strong performance. Engineering leads with 95% activity score, and cross-department collaboration has increased by 23%. I recommend maintaining current communication patterns.";
    }
    
    if (lowerQuery.includes('productivity') || lowerQuery.includes('performance')) {
      return "Overall productivity score is 87%, up 5% from last week. Focus time has improved by 15%, but I notice 12 employees have >5 hours of meetings daily. Consider implementing meeting-free time blocks.";
    }
    
    if (lowerQuery.includes('document') || lowerQuery.includes('file')) {
      return "Document collaboration is active with 1,247 documents and 342 collaborators. I've identified 156 stale documents that need review and detected some unusual file access patterns requiring attention.";
    }
    
    if (lowerQuery.includes('security') || lowerQuery.includes('access')) {
      return "Security analysis shows 98.7% security score with 3 alerts requiring attention. I've detected unusual file access patterns and recommend reviewing large file transfers from external locations.";
    }
    
    return `I found ${results.length} relevant results for "${searchQuery}". I can help you analyze email patterns, team productivity, document collaboration, security insights, and more. What specific aspect would you like me to focus on?`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      results[selectedIndex].action();
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'person': return 'bg-green-100 text-green-800';
      case 'metric': return 'bg-purple-100 text-purple-800';
      case 'insight': return 'bg-orange-100 text-orange-800';
      case 'email': return 'bg-red-100 text-red-800';
      case 'ai-response': return 'bg-indigo-100 text-indigo-800';
      case 'page': return 'bg-gray-100 text-gray-800';
      case 'action': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI assistant anything about your Office 365 data..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center">
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <Zap className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-gray-600">AI is analyzing your query and searching across all data...</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>✓ Scanning email analytics</div>
                  <div>✓ Analyzing team collaboration</div>
                  <div>✓ Checking document access</div>
                  <div className="text-blue-600">⟳ Generating insights...</div>
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4">
              {/* AI Response */}
              {aiResponse && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Bot className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-blue-900 mb-2">AI Assistant Response</h3>
                      <p className="text-blue-800 text-sm leading-relaxed">{aiResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-500 mb-4">
                Found {results.length} results for "{query}"
              </div>
              <div className="space-y-2">
                {results.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <div
                      key={result.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        index === selectedIndex ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        result.action();
                        onClose();
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="w-5 h-5 text-gray-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{result.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                                {result.type.replace('-', ' ')}
                              </span>
                              <span className="text-xs text-gray-500">{result.relevance}% match</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                          {result.path && (
                            <p className="text-xs text-gray-400 mt-1">{result.path}</p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : query.length > 2 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No results found for "{query}"</p>
              <p className="text-sm text-gray-500 mt-2">Try asking about emails, teams, documents, productivity, or security</p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Bot className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">AI-Powered Search</h3>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  Ask me anything about your Office 365 data. I can help with analytics, insights, and recommendations.
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      onQueryChange('email analytics');
                    }}
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                  >
                    <Mail className="w-6 h-6 text-blue-600 mb-2" />
                    <div className="font-medium text-gray-900">Email Analytics</div>
                    <div className="text-sm text-gray-600">Response times & patterns</div>
                  </button>
                  <button 
                    onClick={() => {
                      onQueryChange('team productivity');
                    }}
                    className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                  >
                    <Users className="w-6 h-6 text-green-600 mb-2" />
                    <div className="font-medium text-gray-900">Team Insights</div>
                    <div className="text-sm text-gray-600">Collaboration & performance</div>
                  </button>
                  <button 
                    onClick={() => {
                      onQueryChange('document collaboration');
                    }}
                    className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
                  >
                    <FileText className="w-6 h-6 text-purple-600 mb-2" />
                    <div className="font-medium text-gray-900">Documents</div>
                    <div className="text-sm text-gray-600">File access & sharing</div>
                  </button>
                  <button 
                    onClick={() => {
                      onQueryChange('security analysis');
                    }}
                    className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
                  >
                    <Shield className="w-6 h-6 text-orange-600 mb-2" />
                    <div className="font-medium text-gray-900">Security</div>
                    <div className="text-sm text-gray-600">Access patterns & alerts</div>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-900 mb-2">Try asking:</h4>
                  <div className="text-sm text-indigo-700 space-y-1">
                    <div>"Show me email response trends"</div>
                    <div>"Which teams collaborate the most?"</div>
                    <div>"Are there any security concerns?"</div>
                    <div>"How is our productivity this week?"</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};