import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, User, MapPin, Ban, ArrowLeft } from 'lucide-react';

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
  aiAction: string;
  recommendation: string;
}

const SecurityAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const blockedUsers: string[] = [];

  useEffect(() => {
    setTimeout(() => {
      setIncidents([
        {
          id: 'sec-1',
          user: 'Unknown User',
          email: 'external@competitor.com',
          action: 'Large File Download',
          fileName: 'Financial_Database_2024.xlsx',
          fileSize: '45.2 MB',
          timestamp: '2025-01-15 02:30:15',
          location: 'Moscow, Russia',
          ipAddress: '185.220.101.42',
          riskLevel: 'high',
          suspicious: true,
          details: 'Attempted download of sensitive financial data from suspicious location outside business hours',
          aiAction: 'Block IP and revoke access immediately',
          recommendation: 'Implement geo-blocking for this region and alert security team'
        },
        {
          id: 'sec-2',
          user: 'John Smith',
          email: 'john.smith@company.com',
          action: 'Bulk File Access',
          fileName: 'Multiple HR Files',
          fileSize: '127.8 MB',
          timestamp: '2025-01-15 14:45:22',
          location: 'New York, USA',
          ipAddress: '192.168.1.45',
          riskLevel: 'medium',
          suspicious: false,
          details: 'Employee accessed 47 HR files in 10 minutes - unusual pattern detected',
          aiAction: 'Monitor activity and request justification',
          recommendation: 'Send automated email requesting explanation for bulk access'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const handleSecurityAction = (incidentId: string, action: string) => {
    const incident = incidents.find(i => i.id === incidentId);
    if (incident) {
      alert(`AI Security Action: ${action}\n\nIncident ${incidentId} has been processed.\nUser: ${incident.user}\nAction taken: ${incident.aiAction}`);
      setIncidents(prev => prev.filter(i => i.id !== incidentId));
    }
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Security Analysis</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">AI-powered analysis of suspicious file access patterns</p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="card text-center py-12">
            <Shield className="w-12 h-12 text-red-600 animate-pulse mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Security Analysis in Progress</h3>
            <p className="text-gray-600 mt-2">Analyzing file access patterns and identifying potential threats...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Security Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600">{incidents.filter(i => i.riskLevel === 'high').length}</div>
                <div className="text-sm text-gray-600">Critical Threats</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-yellow-600">{incidents.filter(i => i.suspicious).length}</div>
                <div className="text-sm text-gray-600">Suspicious Activities</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">{blockedUsers.length}</div>
                <div className="text-sm text-gray-600">Users Blocked</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-purple-600">173.0 MB</div>
                <div className="text-sm text-gray-600">Data at Risk</div>
              </div>
            </div>

            {/* Incidents List */}
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className={`card ${incident.suspicious ? 'border-red-200 bg-red-50' : ''}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{incident.user}</h3>
                          <p className="text-sm text-gray-600 break-words">{incident.email}</p>
                          {blockedUsers.includes(incident.email) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                              <Ban className="w-3 h-3 mr-1" />
                              BLOCKED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                          {incident.suspicious && (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(incident.riskLevel)}`}>
                            {incident.riskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Action:</span>
                          <p className="font-medium text-gray-900">{incident.action}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">File:</span>
                          <p className="font-medium text-gray-900 break-words">{incident.fileName}</p>
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

                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
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

                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">AI Recommendation:</h4>
                        <p className="text-sm text-blue-700">{incident.recommendation}</p>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleSecurityAction(incident.id, incident.aiAction)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Execute AI Action
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

export default SecurityAnalysisPage;