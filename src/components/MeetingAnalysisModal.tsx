import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Mail, AlertTriangle, TrendingDown, MessageSquare } from 'lucide-react';

interface MeetingAnalysisModalProps {
  onClose: () => void;
}

interface MeetingOverload {
  id: string;
  employee: string;
  email: string;
  department: string;
  totalMeetingHours: number;
  meetingCount: number;
  backToBackMeetings: number;
  overlappingMeetings: number;
  productivityScore: number;
  meetings: Meeting[];
}

interface Meeting {
  id: string;
  title: string;
  duration: number;
  attendees: number;
  time: string;
  type: 'recurring' | 'one-time' | 'urgent';
  outcome?: string;
  necessary: boolean;
}

export const MeetingAnalysisModal: React.FC<MeetingAnalysisModalProps> = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [employees, setEmployees] = useState<MeetingOverload[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [emailsSent, setEmailsSent] = useState<string[]>([]);

  useEffect(() => {
    // Simulate meeting analysis
    setTimeout(() => {
      setEmployees([
        {
          id: 'emp-1',
          employee: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          department: 'Marketing',
          totalMeetingHours: 7.5,
          meetingCount: 12,
          backToBackMeetings: 8,
          overlappingMeetings: 3,
          productivityScore: 62,
          meetings: [
            { id: 'm1', title: 'Daily Standup', duration: 30, attendees: 8, time: '9:00 AM', type: 'recurring', necessary: true },
            { id: 'm2', title: 'Marketing Review', duration: 60, attendees: 6, time: '9:30 AM', type: 'recurring', necessary: false },
            { id: 'm3', title: 'Client Presentation', duration: 90, attendees: 12, time: '11:00 AM', type: 'one-time', necessary: true },
            { id: 'm4', title: 'Budget Discussion', duration: 45, attendees: 4, time: '12:30 PM', type: 'urgent', necessary: false },
            { id: 'm5', title: 'Team Sync', duration: 30, attendees: 5, time: '1:15 PM', type: 'recurring', necessary: false }
          ]
        },
        {
          id: 'emp-2',
          employee: 'Mike Chen',
          email: 'mike.chen@company.com',
          department: 'Engineering',
          totalMeetingHours: 6.5,
          meetingCount: 9,
          backToBackMeetings: 6,
          overlappingMeetings: 2,
          productivityScore: 71,
          meetings: [
            { id: 'm6', title: 'Sprint Planning', duration: 120, attendees: 10, time: '10:00 AM', type: 'recurring', necessary: true },
            { id: 'm7', title: 'Code Review', duration: 45, attendees: 4, time: '12:00 PM', type: 'recurring', necessary: true },
            { id: 'm8', title: 'Architecture Discussion', duration: 90, attendees: 6, time: '2:00 PM', type: 'one-time', necessary: false },
            { id: 'm9', title: 'All Hands', duration: 60, attendees: 50, time: '3:30 PM', type: 'recurring', necessary: false }
          ]
        },
        {
          id: 'emp-3',
          employee: 'Emily Davis',
          email: 'emily.davis@company.com',
          department: 'Sales',
          totalMeetingHours: 8.0,
          meetingCount: 15,
          backToBackMeetings: 10,
          overlappingMeetings: 4,
          productivityScore: 58,
          meetings: [
            { id: 'm10', title: 'Sales Pipeline Review', duration: 60, attendees: 8, time: '9:00 AM', type: 'recurring', necessary: true },
            { id: 'm11', title: 'Client Call #1', duration: 45, attendees: 3, time: '10:00 AM', type: 'one-time', necessary: true },
            { id: 'm12', title: 'Client Call #2', duration: 30, attendees: 2, time: '10:45 AM', type: 'one-time', necessary: true },
            { id: 'm13', title: 'Internal Sync', duration: 30, attendees: 6, time: '11:15 AM', type: 'recurring', necessary: false },
            { id: 'm14', title: 'Proposal Review', duration: 75, attendees: 4, time: '2:00 PM', type: 'urgent', necessary: false }
          ]
        }
      ]);
      setIsAnalyzing(false);
    }, 2500);
  }, []);

  const handleEmployeeSelect = (empId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(empId) 
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    );
  };

  const handleSendEmail = (employee: MeetingOverload) => {
    const emailContent = generateEmailContent(employee);
    setEmailsSent(prev => [...prev, employee.email]);
    
    // Simulate sending email
    alert(`Email sent to ${employee.employee} requesting explanation for meeting overload and productivity improvement plan.\n\nEmail Preview:\n${emailContent}`);
  };

  const generateEmailContent = (employee: MeetingOverload) => {
    return `
Subject: Meeting Load Analysis & Productivity Optimization Request

Dear ${employee.employee},

Our AI-powered productivity analysis has identified that you currently have ${employee.totalMeetingHours} hours of meetings scheduled today (${employee.meetingCount} meetings), which exceeds our recommended 5-hour limit.

Key Concerns:
• ${employee.backToBackMeetings} back-to-back meetings without breaks
• ${employee.overlappingMeetings} overlapping meetings detected
• Current productivity score: ${employee.productivityScore}% (below optimal)

We'd like to understand:
1. Which meetings are essential vs. optional?
2. Can any recurring meetings be reduced in frequency?
3. Are there opportunities to delegate attendance?

Please reply with your analysis and a plan to optimize your meeting schedule while maintaining productivity.

Best regards,
Productivity Management Team
    `;
  };

  const handleBulkEmailSend = () => {
    selectedEmployees.forEach(empId => {
      const employee = employees.find(e => e.id === empId);
      if (employee && !emailsSent.includes(employee.email)) {
        setEmailsSent(prev => [...prev, employee.email]);
      }
    });
    alert(`Productivity improvement emails sent to ${selectedEmployees.length} employees.`);
    setSelectedEmployees([]);
  };

  const getProductivityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Meeting Overload Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">AI analysis of meeting patterns and productivity impact</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="p-8 text-center">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <Calendar className="w-12 h-12 text-orange-600 animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analyzing Meeting Patterns</h3>
                <p className="text-gray-600 mt-2">Evaluating meeting schedules and productivity impact...</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-500">✓ Scanning calendar data</div>
                  <div className="text-sm text-gray-500">✓ Identifying overlapping meetings</div>
                  <div className="text-sm text-gray-500">✓ Calculating productivity scores</div>
                  <div className="text-sm text-orange-600">⟳ Generating recommendations...</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Meeting Summary */}
            <div className="p-6 bg-orange-50 border-b border-orange-200">
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{employees.filter(e => e.totalMeetingHours > 6).length}</div>
                  <div className="text-sm text-gray-600">Overloaded Employees</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{employees.reduce((sum, e) => sum + e.overlappingMeetings, 0)}</div>
                  <div className="text-sm text-gray-600">Overlapping Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{employees.reduce((sum, e) => sum + e.backToBackMeetings, 0)}</div>
                  <div className="text-sm text-gray-600">Back-to-Back Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(employees.reduce((sum, e) => sum + e.productivityScore, 0) / employees.length)}</div>
                  <div className="text-sm text-gray-600">Avg Productivity Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{emailsSent.length}</div>
                  <div className="text-sm text-gray-600">Emails Sent</div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            {selectedEmployees.length > 0 && (
              <div className="p-4 bg-blue-50 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedEmployees.length} employees selected
                  </span>
                  <button
                    onClick={handleBulkEmailSend}
                    className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Productivity Improvement Emails
                  </button>
                </div>
              </div>
            )}

            {/* Employees List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {employees.map((employee) => (
                  <div key={employee.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => handleEmployeeSelect(employee.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{employee.employee}</h3>
                              <p className="text-sm text-gray-600">{employee.department} • {employee.email}</p>
                              {emailsSent.includes(employee.email) && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                  <Mail className="w-3 h-3 mr-1" />
                                  EMAIL SENT
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProductivityColor(employee.productivityScore)}`}>
                              {employee.productivityScore}% Productivity
                            </span>
                          </div>
                        </div>

                        {/* Meeting Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-xl font-bold text-red-600">{employee.totalMeetingHours}h</div>
                            <div className="text-xs text-gray-600">Total Meeting Time</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-xl font-bold text-orange-600">{employee.meetingCount}</div>
                            <div className="text-xs text-gray-600">Total Meetings</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <div className="text-xl font-bold text-yellow-600">{employee.backToBackMeetings}</div>
                            <div className="text-xs text-gray-600">Back-to-Back</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">{employee.overlappingMeetings}</div>
                            <div className="text-xs text-gray-600">Overlapping</div>
                          </div>
                        </div>

                        {/* Meeting Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Today's Meeting Schedule</h4>
                          <div className="space-y-2">
                            {employee.meetings.map((meeting) => (
                              <div key={meeting.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                <div className="flex items-center space-x-3">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <div>
                                    <span className="font-medium text-gray-900">{meeting.title}</span>
                                    <div className="text-xs text-gray-500">
                                      {meeting.time} • {meeting.duration}min • {meeting.attendees} attendees
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    meeting.type === 'urgent' ? 'bg-red-100 text-red-800' :
                                    meeting.type === 'recurring' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {meeting.type}
                                  </span>
                                  {!meeting.necessary && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      Optional
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Analysis */}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start">
                            <AlertTriangle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                            <div>
                              <h5 className="font-medium text-blue-900">AI Analysis</h5>
                              <p className="text-sm text-blue-700 mt-1">
                                {employee.totalMeetingHours > 6 ? 
                                  `Meeting overload detected. ${employee.overlappingMeetings} overlapping meetings are reducing productivity by an estimated ${100 - employee.productivityScore}%. Consider consolidating recurring meetings and delegating attendance where possible.` :
                                  'Meeting schedule is within acceptable limits but could be optimized for better productivity.'
                                }
                              </p>
                              <div className="mt-2 text-xs text-blue-600">
                                Recommendations: Reduce recurring meetings by 30%, add 15-min breaks between meetings, delegate 2-3 optional meetings
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex items-center space-x-3">
                          <button 
                            onClick={() => handleSendEmail(employee)}
                            disabled={emailsSent.includes(employee.email)}
                            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            {emailsSent.includes(employee.email) ? 'Email Sent' : 'Send Improvement Email'}
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-800">View Full Calendar</button>
                          <button className="text-sm text-green-600 hover:text-green-800">Suggest Optimizations</button>
                          <button className="text-sm text-purple-600 hover:text-purple-800">Generate Report</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Productivity Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-medium text-red-900">Immediate Actions</span>
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Cancel 9 overlapping meetings</li>
                    <li>• Add breaks between sessions</li>
                    <li>• Reduce recurring meeting frequency</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-900">Time Optimization</span>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Implement 25-min default meetings</li>
                    <li>• Block focus time in calendars</li>
                    <li>• Limit daily meeting hours to 5</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Communication</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Use async updates for status</li>
                    <li>• Delegate meeting attendance</li>
                    <li>• Implement meeting-free days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};