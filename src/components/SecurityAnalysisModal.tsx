import React, { useState, useEffect } from 'react';
import { X, Shield, AlertTriangle, User, MapPin, Ban, Eye } from 'lucide-react';

interface SecurityAnalysisModalProps {
  onClose: () => void;
}

interface SecurityIncident {
  id: string;
  user: string;
  email: string;
  action: string;
  fileName: string;
  fileSize: string;
  timestamp: string;
  location: string;
  ipAddress: string;
  riskLevel: 'high' | 'medium' | 'low';
  suspicious: boolean;
  details: string;
}

export const SecurityAnalysisModal: React.FC<SecurityAnalysisModalProps> = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Simulate security analysis
    setTimeout(() => {
      setIncidents([
        {
          id: 'sec-1',
          user: 'Unknown User',
          email: 'external@competitor.com',
          action: 'Large File Download',
          fileName: 'Financial_Database_2024.xlsx',
          fileSize: '45.2 MB',
          timestamp: '2024-01-15 02:30:15',
          location: 'Moscow, Russia',
          ipAddress: '185.220.101.42',
          riskLevel: 'high',
          suspicious: true,
          details: 'Attempted download of sensitive financial data from suspicious location outside business hours'
        },
        {
          id: 'sec-2',
          user: 'John Smith',
          email: 'john.smith@company.com',
          action: 'Bulk File Access',
          fileName: 'Multiple HR Files',
          fileSize: '127.8 MB',
          timestamp: '2024-01-15 14:45:22',
          location: 'New York, USA',
          ipAddress: '192.168.1.45',
          riskLevel: 'medium',
          suspicious: false,
          details: 'Employee accessed 47 HR files in 10 minutes - unusual pattern detected'
        },
        {
          id: 'sec-3',
          user: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          action: 'External File Transfer',
          fileName: 'Client_Contracts_Q4.zip',
          fileSize: '23.1 MB',
          timestamp: '2024-01-15 18:20:33',
          location: 'London, UK',
          ipAddress: '10.0.0.156',
          riskLevel: 'medium',
          suspicious: false,
          details: 'Large file transfer to external email address - requires approval'
        },
        {
          id: 'sec-4',
          user: 'Mike Chen',
          email: 'mike.chen@company.com',
          action: 'After Hours Access',
          fileName: 'Source_Code_Repository',
          fileSize: '89.4 MB',
          timestamp: '2024-01-15 23:15:44',
          location: 'Tokyo, Japan',
          ipAddress: '203.0.113.78',
          riskLevel: 'low',
          suspicious: false,
          details: 'Developer accessed source code repository after hours - within normal work pattern'
        },
        {
          id: 'sec-5',
          user: 'Unknown User',
          email: 'temp@tempmail.com',
          action: 'Failed Login Attempts',
          fileName: 'N/A',
          fileSize: 'N/A',
          timestamp: '2024-01-15 03:45:12',
          location: 'Unknown',
          ipAddress: '198.51.100.23',
          riskLevel: 'high',
          suspicious: true,
          details: '15 failed login attempts using various admin credentials'
        }
      ]);
      setIsAnalyzing(false);
    }, 2500);
  }, []);

  const handleIncidentSelect = (incidentId: string) => {
    setSelectedIncidents(prev => 
      prev.includes(incidentId) 
        ? prev.filter(id => id !== incidentId)
        : [...prev, incidentId]
    );
  };

  const handleBlockUser = (incident: SecurityIncident) => {
    setBlockedUsers(prev => [...prev, incident.email]);
    alert(`User ${incident.email} has been blocked from accessing files.`);
  };

  const handleBulkAction = (action: 'block' | 'investigate' | 'approve') => {
    const actionText = action === 'block' ? 'blocked' : action === 'investigate' ? 'flagged for investigation' : 'approved';
    alert(`${selectedIncidents.length} incidents have been ${actionText}.`);
    setSelectedIncidents([]);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Security Analysis - Large Files & Unusual Access</h2>
              <p className="text-sm text-gray-600 mt-1">AI-powered analysis of suspicious file access patterns and security threats</p>
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
              <Shield className="w-12 h-12 text-red-600 animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Security Analysis in Progress</h3>
                <p className="text-gray-600 mt-2">Analyzing file access patterns and identifying potential security threats...</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-500">✓ Scanning access logs</div>
                  <div className="text-sm text-gray-500">✓ Analyzing IP addresses</div>
                  <div className="text-sm text-gray-500">✓ Checking file transfer patterns</div>
                  <div className="text-sm text-red-600">⟳ Identifying threats...</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Security Summary */}
            <div className="p-6 bg-red-50 border-b border-red-200">
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{incidents.filter(i => i.riskLevel === 'high').length}</div>
                  <div className="text-sm text-gray-600">Critical Threats</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{incidents.filter(i => i.suspicious).length}</div>
                  <div className="text-sm text-gray-600">Suspicious Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{blockedUsers.length}</div>
                  <div className="text-sm text-gray-600">Users Blocked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">285.5 MB</div>
                  <div className="text-sm text-gray-600">Data at Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Countries Involved</div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            {selectedIncidents.length > 0 && (
              <div className="p-4 bg-blue-50 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedIncidents.length} incidents selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBulkAction('block')}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      Block Users
                    </button>
                    <button
                      onClick={() => handleBulkAction('investigate')}
                      className="flex items-center px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Investigate
                    </button>
                    <button
                      onClick={() => handleBulkAction('approve')}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Incidents List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className={`border rounded-lg p-4 transition-shadow hover:shadow-md ${
                    incident.suspicious ? 'border-red-200 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedIncidents.includes(incident.id)}
                        onChange={() => handleIncidentSelect(incident.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{incident.user}</h3>
                              <p className="text-sm text-gray-600">{incident.email}</p>
                              {blockedUsers.includes(incident.email) && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                                  <Ban className="w-3 h-3 mr-1" />
                                  BLOCKED
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {incident.suspicious && (
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(incident.riskLevel)}`}>
                              {incident.riskLevel.toUpperCase()} RISK
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Action:</span>
                            <p className="font-medium text-gray-900">{incident.action}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">File:</span>
                            <p className="font-medium text-gray-900">{incident.fileName}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Size:</span>
                            <p className="font-medium text-gray-900">{incident.fileSize}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Time:</span>
                            <p className="font-medium text-gray-900">{incident.timestamp}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-gray-600">{incident.location}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500">IP:</span>
                            <span className="font-mono text-gray-900 ml-1">{incident.ipAddress}</span>
                          </div>
                        </div>

                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{incident.details}</p>
                        </div>

                        <div className="mt-4 flex items-center space-x-3">
                          <button className="text-sm text-blue-600 hover:text-blue-800">View Full Log</button>
                          <button className="text-sm text-green-600 hover:text-green-800">Approve Access</button>
                          <button 
                            onClick={() => handleBlockUser(incident)}
                            disabled={blockedUsers.includes(incident.email)}
                            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Block User
                          </button>
                          <button className="text-sm text-purple-600 hover:text-purple-800">Generate Report</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Security Recommendations */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Security Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-medium text-red-900">Immediate Actions</span>
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Block 2 suspicious IP addresses</li>
                    <li>• Revoke access for external users</li>
                    <li>• Enable 2FA for all accounts</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-900">Policy Updates</span>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Implement file size limits</li>
                    <li>• Restrict after-hours access</li>
                    <li>• Add geo-location blocking</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Eye className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Monitoring</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Set up real-time alerts</li>
                    <li>• Monitor bulk downloads</li>
                    <li>• Track external transfers</li>
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