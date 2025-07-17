import React, { useState } from 'react';
import { Cloud, Settings, CheckCircle, AlertCircle, ExternalLink, Zap, Shield, FolderSync as Sync } from 'lucide-react';

const SaasIntegrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const integrations = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      category: 'CRM',
      description: 'Sync customer data and sales analytics with your Office 365 environment',
      status: 'connected',
      logo: '🏢',
      features: ['Lead Management', 'Sales Analytics', 'Customer Insights', 'Pipeline Tracking'],
      lastSync: '2 minutes ago',
      dataPoints: '15,247 records'
    },
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      category: 'Productivity',
      description: 'Integrate Google Drive, Gmail, and Calendar with Office 365 analytics',
      status: 'connected',
      logo: '🌐',
      features: ['Email Sync', 'Calendar Integration', 'Drive Analytics', 'Contact Management'],
      lastSync: '5 minutes ago',
      dataPoints: '8,934 emails'
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      category: 'CRM',
      description: 'Connect Zoho CRM data for comprehensive customer relationship insights',
      status: 'pending',
      logo: '📊',
      features: ['Contact Management', 'Deal Tracking', 'Sales Reports', 'Lead Analytics'],
      lastSync: 'Pending setup',
      dataPoints: 'Not connected'
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      category: 'Support',
      description: 'Integrate customer support tickets and satisfaction metrics',
      status: 'connected',
      logo: '🎧',
      features: ['Ticket Analytics', 'Customer Satisfaction', 'Agent Performance', 'Response Times'],
      lastSync: '1 hour ago',
      dataPoints: '2,456 tickets'
    },
    {
      id: 'manageengine',
      name: 'ManageEngine',
      category: 'IT Management',
      description: 'IT service management and infrastructure monitoring integration',
      status: 'disconnected',
      logo: '⚙️',
      features: ['Asset Management', 'Service Desk', 'Network Monitoring', 'Security Analytics'],
      lastSync: 'Never',
      dataPoints: 'Not connected'
    }
  ];

  const categories = ['all', 'CRM', 'Productivity', 'Support', 'IT Management'];

  const filteredIntegrations = activeTab === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'disconnected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'pending': return AlertCircle;
      case 'disconnected': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SAAS Integrations</h1>
            <p className="text-gray-600">Connect and manage your third-party applications</p>
          </div>
        </div>
        <button className="btn-primary">
          <Zap className="w-4 h-4 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Connected</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Sync className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">26,637</p>
              <p className="text-sm text-gray-600">Data Points Synced</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-600">Security Score</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Pending Setup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="card">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === category
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category === 'all' ? 'All Integrations' : category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIntegrations.map((integration) => {
            const StatusIcon = getStatusIcon(integration.status);
            return (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.logo}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                      <span className="text-sm text-gray-500">{integration.category}</span>
                    </div>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {integration.status}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{integration.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Sync:</span>
                    <span className="text-gray-900">{integration.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Data Points:</span>
                    <span className="text-gray-900">{integration.dataPoints}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {integration.status === 'connected' ? (
                    <>
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <Settings className="w-4 h-4 mr-2 inline" />
                        Configure
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </>
                  ) : integration.status === 'pending' ? (
                    <button className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                      Complete Setup
                    </button>
                  ) : (
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integration Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">All systems operational</span>
              </div>
              <span className="text-sm text-green-600">100% uptime</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Sync className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Data sync active</span>
              </div>
              <span className="text-sm text-blue-600">Real-time</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Security compliant</span>
              </div>
              <span className="text-sm text-purple-600">Verified</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-lg">🏢</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Salesforce sync completed</p>
                <p className="text-xs text-gray-500">2 minutes ago • 1,247 records updated</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-lg">🌐</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Google Workspace connected</p>
                <p className="text-xs text-gray-500">5 minutes ago • Email sync enabled</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-lg">🎧</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Zendesk data refreshed</p>
                <p className="text-xs text-gray-500">1 hour ago • 456 tickets processed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaasIntegrations;