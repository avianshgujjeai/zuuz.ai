import React, { useState } from 'react';
import { X, Mail, Clock, User, Send, Edit, Sparkles, CheckCircle, Bot } from 'lucide-react';
import { mockEmails } from '../data/emailData';

interface EmailDetailModalProps {
  itemId: string;
  onClose: () => void;
}

export const EmailDetailModal: React.FC<EmailDetailModalProps> = ({ itemId, onClose }) => {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sentEmails, setSentEmails] = useState<string[]>([]);

  // Get emails based on the actionable item
  const getEmailsForItem = (id: string) => {
    if (id === 'important-emails') {
      return [
        {
          id: 'imp-1',
          sender: 'Board of Directors',
          subject: 'Q4 Strategic Review Meeting',
          content: 'The board would like to schedule the quarterly strategic review. Please confirm your availability for next week. We need to discuss the financial performance, strategic initiatives, and upcoming market opportunities.',
          time: '2 hours ago',
          priority: 'high' as const,
          type: 'meeting-request',
          preview: 'The board would like to schedule the quarterly strategic review...'
        },
        {
          id: 'imp-2',
          sender: 'Sarah Johnson',
          subject: 'Urgent: Q4 Budget Review Required',
          content: 'Hi there, I need your input on the Q4 budget allocations. The finance team is waiting for your department\'s numbers. Can you please review the attached spreadsheet and provide your feedback by tomorrow? This is critical for our quarterly planning.',
          time: '3 hours ago',
          priority: 'high' as const,
          type: 'urgent-budget',
          preview: 'Hi there, I need your input on the Q4 budget allocations...'
        },
        {
          id: 'imp-3',
          sender: 'Mike Chen',
          subject: 'Project Timeline Concerns',
          content: 'I wanted to follow up on our discussion about the project timeline. The client is asking for updates and I\'m concerned we might miss the deadline. Can we schedule a quick call to discuss the current status and potential solutions?',
          time: '4 hours ago',
          priority: 'medium' as const,
          type: 'project-delay',
          preview: 'I wanted to follow up on our discussion about the project timeline...'
        }
      ];
    }
    
    switch (id) {
      case '1': // Emails Unanswered > 48 Hours
        return mockEmails.filter(email => email.category === 'unanswered');
      default:
        return [];
    }
  };

  const emails = getEmailsForItem(itemId);

  const generateAIReply = async (email: any) => {
    setIsGenerating(true);
    setShowSuggestions(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = getAISuggestions(email);
      setReplyContent(suggestions.content);
      setIsGenerating(false);
    }, 2000);
  };

  const getAISuggestions = (email: any) => {
    const suggestions = {
      'meeting-request': {
        content: `Dear Board Members,

Thank you for reaching out regarding the Q4 strategic review meeting.

I am available for the meeting next week and would be happy to participate in the strategic discussions. I can accommodate the following time slots:
- Tuesday, any time after 2:00 PM
- Wednesday, 9:00 AM - 12:00 PM or after 3:00 PM
- Thursday, 10:00 AM - 4:00 PM

I will prepare a comprehensive overview of our department's Q4 performance, key achievements, and strategic recommendations for the upcoming quarter.

Please let me know the confirmed date and time, and I'll ensure all relevant materials are ready for the meeting.

Best regards,
[Your Name]`,
        tone: 'Professional and accommodating'
      },
      'urgent-budget': {
        content: `Hi ${email.sender},

Thank you for your email regarding the Q4 budget review. I understand the urgency of this matter.

I've reviewed the preliminary numbers and have a few questions:
1. Are we including the new marketing initiatives in this quarter's budget?
2. Should we account for the additional headcount we discussed last month?
3. What's the timeline for the final budget submission?

I'll have the complete analysis ready by tomorrow morning. Would you prefer to discuss this over a quick call or via email?

I'll send you the detailed breakdown by 10 AM tomorrow.

Best regards,
[Your Name]`,
        tone: 'Professional and responsive'
      },
      'project-delay': {
        content: `Dear ${email.sender},

Thank you for bringing the project timeline concerns to my attention.

After reviewing the current status, I can confirm that we're experiencing a 2-day delay due to the additional security requirements that were introduced last week. However, I'm confident we can still meet the original deadline by:

1. Reallocating resources from the testing phase
2. Running parallel development tracks
3. Extending work hours for the critical path items

I'll send you a detailed recovery plan by end of day. Let me know if you'd like to discuss this further in a call.

Best regards,
[Your Name]`,
        tone: 'Solution-oriented and proactive'
      }
    };

    return suggestions[email.type as keyof typeof suggestions] || {
      content: `Hi ${email.sender},

Thank you for your email. I've reviewed your message and will get back to you with a detailed response shortly.

Best regards,
[Your Name]`,
      tone: 'Professional acknowledgment'
    };
  };

  const handleSendReply = (emailId: string) => {
    setSentEmails(prev => [...prev, emailId]);
    alert('Email sent successfully!');
  };

  const getItemTitle = (id: string) => {
    if (id === 'important-emails') return 'Today\'s Important Emails';
    switch (id) {
      case '1': return 'Emails Unanswered > 48 Hours';
      default: return 'Email Management';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Email List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{getItemTitle(itemId)}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{emails.length} emails requiring attention</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedEmail === email.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedEmail(email.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{email.sender}</p>
                      <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{email.time}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          email.priority === 'high' ? 'bg-red-100 text-red-800' :
                          email.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {email.priority}
                        </span>
                      </div>
                      {sentEmails.includes(email.id) && (
                        <div className="mt-2 text-xs text-green-600 font-medium">✓ Reply Sent</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Detail and Reply */}
          <div className="flex-1 flex flex-col">
            {selectedEmail ? (
              <>
                {/* Email Content */}
                <div className="p-6 border-b border-gray-200">
                  {(() => {
                    const email = emails.find(e => e.id === selectedEmail);
                    return email ? (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{email.subject}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              email.priority === 'high' ? 'bg-red-100 text-red-800' :
                              email.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {email.priority} priority
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <span><strong>From:</strong> {email.sender}</span>
                          <span><strong>Time:</strong> {email.time}</span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-800">{email.content}</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* AI Reply Section */}
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">AI-Powered Reply</h4>
                    <button
                      onClick={() => generateAIReply(emails.find(e => e.id === selectedEmail))}
                      disabled={isGenerating || sentEmails.includes(selectedEmail)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      {isGenerating ? 'Generating...' : sentEmails.includes(selectedEmail) ? 'Reply Sent' : 'Generate AI Reply'}
                    </button>
                  </div>

                  {isGenerating && (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-pulse flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-600">AI is analyzing the email and generating a response...</span>
                      </div>
                    </div>
                  )}

                  {showSuggestions && !isGenerating && !sentEmails.includes(selectedEmail || '') && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-medium text-blue-900">AI Analysis Complete</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Tone: Professional and responsive • Estimated reading time: 30 seconds
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Generated Reply (Review and modify as needed)
                        </label>
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="AI-generated reply will appear here..."
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button 
                            onClick={() => generateAIReply(emails.find(e => e.id === selectedEmail))}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Sparkles className="w-4 h-4 mr-1" />
                            Regenerate
                          </button>
                        </div>
                        <button
                          onClick={() => selectedEmail && handleSendReply(selectedEmail)}
                          className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {sentEmails.includes(selectedEmail || '') && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-900 mb-2">Email Sent Successfully!</h3>
                      <p className="text-green-700">Your AI-generated reply has been sent to {emails.find(e => e.id === selectedEmail)?.sender}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select an email to view details and generate AI-powered replies</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};