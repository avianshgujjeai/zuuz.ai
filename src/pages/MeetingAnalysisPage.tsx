import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Mail, AlertTriangle, ArrowLeft } from 'lucide-react';

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
  aiAction: string;
  recommendation: string;
  meetings: Meeting[];
}

interface Meeting {
  id: string;
  title: string;
  duration: number;
  attendees: number;
  time: string;
  type: 'recurring' | 'one-time' | 'urgent';
  necessary: boolean;
}

const MeetingAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [employees, setEmployees] = useState<MeetingOverload[]>([]);
  const [emailsSent, setEmailsSent] = useState<string[]>([]);

  useEffect(() => {
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
          aiAction: 'Reduce recurring meetings by 30% and add breaks',
          recommendation: 'Cancel 3 optional meetings and reschedule overlapping ones',
          meetings: [
            { id: 'm1', title: 'Daily Standup', duration: 30, attendees: 8, time: '9:00 AM', type: 'recurring', necessary: true },
            { id: 'm2', title: 'Marketing Review', duration: 60, attendees: 6, time: '9:30 AM', type: 'recurring', necessary: false },
            { id: 'm3', title: 'Client Presentation', duration: 90, attendees: 12, time: '11:00 AM', type: 'one-time', necessary: true }
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
          aiAction: 'Optimize meeting schedule and block focus time',
          recommendation: 'Add 15-minute breaks between meetings and delegate 2 meetings',
          meetings: [
            { id: 'm4', title: 'Sprint Planning', duration: 120, attendees: 10, time: '10:00 AM', type: 'recurring', necessary: true },
            { id: 'm5', title: 'Code Review', duration: 45, attendees: 4, time: '12:00 PM', type: 'recurring', necessary: true }
          ]
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const handleMeetingAction = (empId: string, action: string) => {
    const employee = employees.find(e => e.id === empId);
    if (employee) {
      alert(`AI Meeting Optimization: ${action}\n\nEmployee: ${employee.employee}\nAction: ${employee.aiAction}\n\nOptimization completed successfully!`);
      setEmailsSent(prev => [...prev, employee.email]);
    }
  };

  const getProductivityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Meeting Load Analysis</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">AI analysis of meeting patterns and productivity impact</p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="card text-center py-12">
            <Calendar className="w-12 h-12 text-orange-600 animate-pulse mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Analyzing Meeting Patterns</h3>
            <p className="text-gray-600 mt-2">Evaluating meeting schedules and productivity impact...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Meeting Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600">{employees.filter(e => e.totalMeetingHours > 6).length}</div>
                <div className="text-sm text-gray-600">Overloaded Employees</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-orange-600">{employees.reduce((sum, e) => sum + e.overlappingMeetings, 0)}</div>
                <div className="text-sm text-gray-600">Overlapping Meetings</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-yellow-600">{employees.reduce((sum, e) => sum + e.backToBackMeetings, 0)}</div>
                <div className="text-sm text-gray-600">Back-to-Back Meetings</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(employees.reduce((sum, e) => sum + e.productivityScore, 0) / employees.length)}</div>
                <div className="text-sm text-gray-600">Avg Productivity Score</div>
              </div>
            </div>

            {/* Employees List */}
            <div className="space-y-6">
              {employees.map((employee) => (
                <div key={employee.id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{employee.employee}</h3>
                          <p className="text-sm text-gray-600">{employee.department} • {employee.email}</p>
                          {emailsSent.includes(employee.email) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              OPTIMIZED
                            </span>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProductivityColor(employee.productivityScore)} mt-2 lg:mt-0`}>
                          {employee.productivityScore}% Productivity
                        </span>
                      </div>

                      {/* Meeting Stats */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Today's Meeting Schedule</h4>
                        <div className="space-y-2">
                          {employee.meetings.map((meeting) => (
                            <div key={meeting.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-white rounded border">
                              <div className="flex items-center space-x-3">
                                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-gray-900">{meeting.title}</span>
                                  <div className="text-xs text-gray-500">
                                    {meeting.time} • {meeting.duration}min • {meeting.attendees} attendees
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
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
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-900">AI Recommendation</h5>
                            <p className="text-sm text-blue-700 mt-1">{employee.recommendation}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => handleMeetingAction(employee.id, employee.aiAction)}
                          disabled={emailsSent.includes(employee.email)}
                          className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {emailsSent.includes(employee.email) ? 'Optimized' : 'Execute AI Optimization'}
                        </button>
                        <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          Manual Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingAnalysisPage;