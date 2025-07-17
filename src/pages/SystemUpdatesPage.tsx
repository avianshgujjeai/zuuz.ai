import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, AlertTriangle, CheckCircle, ArrowLeft, Download, Shield } from 'lucide-react';

interface SystemUpdate {
  id: string;
  name: string;
  version: string;
  currentVersion: string;
  type: 'security' | 'feature' | 'bugfix' | 'critical';
  size: string;
  description: string;
  releaseDate: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  dependencies: string[];
  aiAction: string;
  recommendation: string;
  status: 'pending' | 'downloading' | 'ready' | 'installed';
}

const SystemUpdatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [updates, setUpdates] = useState<SystemUpdate[]>([]);
  const [installedUpdates, setInstalledUpdates] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setUpdates([
        {
          id: 'upd-1',
          name: 'Security Patch KB5034441',
          version: '2025.01.15',
          currentVersion: '2024.12.10',
          type: 'security',
          size: '245 MB',
          description: 'Critical security update addressing vulnerabilities in authentication system',
          releaseDate: '2025-01-15',
          priority: 'high',
          estimatedTime: '15 minutes',
          dependencies: ['Windows Update Service', 'Authentication Service'],
          aiAction: 'Install immediately during maintenance window',
          recommendation: 'Critical security patch - install within 24 hours',
          status: 'pending'
        },
        {
          id: 'upd-2',
          name: 'Office 365 Feature Update',
          version: '16.0.17328.20068',
          currentVersion: '16.0.17231.20182',
          type: 'feature',
          size: '1.2 GB',
          description: 'New collaboration features and performance improvements for Office applications',
          releaseDate: '2025-01-10',
          priority: 'medium',
          estimatedTime: '45 minutes',
          dependencies: ['Office Suite', 'OneDrive Sync'],
          aiAction: 'Schedule installation during off-hours',
          recommendation: 'Install during next maintenance window to minimize disruption',
          status: 'ready'
        },
        {
          id: 'upd-3',
          name: 'Network Driver Update',
          version: '22.120.2.1',
          currentVersion: '22.100.1.8',
          type: 'bugfix',
          size: '89 MB',
          description: 'Fixes connectivity issues and improves network performance',
          releaseDate: '2025-01-08',
          priority: 'medium',
          estimatedTime: '10 minutes',
          dependencies: ['Network Adapter'],
          aiAction: 'Install and restart network services',
          recommendation: 'Install to resolve reported connectivity issues',
          status: 'pending'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const handleUpdateAction = (updateId: string, action: string) => {
    const update = updates.find(u => u.id === updateId);
    if (update) {
      alert(`AI System Update: ${action}\n\nUpdate: ${update.name}\nAction: ${update.aiAction}\n\nUpdate process initiated successfully!`);
      setInstalledUpdates(prev => [...prev, updateId]);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'feature': return 'text-blue-600 bg-blue-100';
      case 'bugfix': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'downloading': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'installed': return 'text-gray-600 bg-gray-100';
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">System Updates Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">AI-powered system update scheduling and management</p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="card text-center py-12">
            <Settings className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Checking System Updates</h3>
            <p className="text-gray-600 mt-2">Analyzing available updates and security patches...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Update Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600">{updates.filter(u => u.priority === 'high').length}</div>
                <div className="text-sm text-gray-600">Critical Updates</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-orange-600">{updates.filter(u => u.type === 'security').length}</div>
                <div className="text-sm text-gray-600">Security Patches</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">{updates.filter(u => u.status === 'ready').length}</div>
                <div className="text-sm text-gray-600">Ready to Install</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-green-600">{installedUpdates.length}</div>
                <div className="text-sm text-gray-600">Installed</div>
              </div>
            </div>

            {/* Updates List */}
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {update.type === 'security' ? (
                        <Shield className="w-6 h-6 text-red-600" />
                      ) : (
                        <Settings className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{update.name}</h3>
                          <p className="text-sm text-gray-600">Version {update.version} (Current: {update.currentVersion})</p>
                          {installedUpdates.includes(update.id) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              INSTALLED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(update.type)}`}>
                            {update.type.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(update.priority)}`}>
                            {update.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}>
                            {update.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-gray-700">{update.description}</p>

                      {/* Update Details */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <p className="font-medium text-gray-900">{update.size}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Install Time:</span>
                          <p className="font-medium text-gray-900">{update.estimatedTime}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Release Date:</span>
                          <p className="font-medium text-gray-900">{update.releaseDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Dependencies:</span>
                          <p className="font-medium text-gray-900">{update.dependencies.length} services</p>
                        </div>
                      </div>

                      {/* Dependencies */}
                      <div className="mt-3">
                        <span className="text-sm text-gray-500">Dependencies: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {update.dependencies.map((dep, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Analysis */}
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-900">AI Recommendation</h5>
                            <p className="text-sm text-blue-700 mt-1">{update.recommendation}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleUpdateAction(update.id, update.aiAction)}
                          disabled={installedUpdates.includes(update.id)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {installedUpdates.includes(update.id) ? 'Installed' : 'Execute AI Installation'}
                        </button>
                        <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          Schedule Later
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
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

export default SystemUpdatesPage;