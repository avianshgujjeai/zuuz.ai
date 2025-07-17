import React, { useState } from 'react';
import { Settings, Database, CheckCircle, AlertTriangle, ExternalLink, Zap, Shield, FolderSync as Sync, Server } from 'lucide-react';

const ErpIntegrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const erpSystems = [
    {
      id: 'sap',
      name: 'SAP ERP',
      category: 'Enterprise',
      description: 'Integrate SAP modules for comprehensive business process analytics',
      status: 'connected',
      logo: '🔷',
      modules: ['Finance', 'HR', 'Supply Chain', 'Sales & Distribution'],
      lastSync: '15 minutes ago',
      dataPoints: '45,892 transactions',
      version: 'S/4HANA Cloud',
      connectionType: 'API'
    },
    {
      id: 'oracle',
      name: 'Oracle ERP Cloud',
      category: 'Enterprise',
      description: 'Connect Oracle Fusion Cloud applications for unified analytics',
      status: 'connected',
      logo: '🔴',
      modules: ['Financials', 'Procurement', 'Project Management', 'HCM'],
      lastSync: '30 minutes ago',
      dataPoints: '32,156 records',
      version: '23C',
      connectionType: 'REST API'
    },
    {
      id: 'dynamics',
      name: 'Microsoft Dynamics 365',
      category: 'Enterprise',
      description: 'Native integration with Dynamics 365 for seamless data flow',
      status: 'connected',
      logo: '🟦',
      modules: ['Finance & Operations', 'Sales', 'Customer Service', 'Field Service'],
      lastSync: '5 minutes ago',
      dataPoints: '28,743 entities',
      version: 'Business Central',
      connectionType: 'Native'
    },
    {
      id: 'netsuite',
      name: 'NetSuite',
      category: 'Cloud ERP',
      description: 'Integrate NetSuite financial and operational data',
      status: 'pending',
      logo: '🟠',
      modules: ['Financial Management', 'CRM', 'E-commerce', 'Inventory'],
      lastSync: 'Pending setup',
      dataPoints: 'Not connected',
      version: '2023.2',
      connectionType: 'SuiteTalk API'
    },
    {
      id: 'workday',
      name: 'Workday',
      category: 'HCM',
      description: 'Human capital management and financial data integration',
      status: 'disconnected',
      logo: '🟡',
      modules: ['HCM', 'Financial Management', 'Analytics', 'Planning'],
      lastSync: 'Never',
      dataPoints: 'Not connected',
      version: '2023R2',
      connectionType: 'REST API'
    }
  ];

  const categories = ['all', 'Enterprise', 'Cloud ERP', 'HCM'];

  const filteredSystems = activeTab === 'all' 
    ? erpSystems 
    : erpSystems.filter(system => system.category === activeTab);

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
      case 'pending': return AlertTriangle;
      case 'disconnected': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ERP Integrations</h1>
            <p className="text-gray-600">Connect and manage your enterprise resource planning systems</p>
          </div>
        </div>
        <button className="btn-primary">
          <Zap className="w-4 h-4 mr-2" />
          Add ERP System
        </button>
      </div>

      {/* ERP Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Active Connections</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Server className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">106,791</p>
              <p className="text-sm text-gray-600">Records Synced</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">Enterprise</p>
              <p className="text-sm text-gray-600">Security Level</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Sync className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">Real-time</p>
              <p className="text-sm text-gray-600">Data Sync</p>
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
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category === 'all' ? 'All Systems' : category}
            </button>
          ))}
        </div>

        {/* ERP Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSystems.map((system) => {
            const StatusIcon = getStatusIcon(system.status);
            return (
              <div key={system.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{system.logo}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
                      <span className="text-sm text-gray-500">{system.category}</span>
                    </div>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {system.status}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{system.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Version:</span>
                    <span className="text-gray-900">{system.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Connection:</span>
                    <span className="text-gray-900">{system.connectionType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Sync:</span>
                    <span className="text-gray-900">{system.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Data Points:</span>
                    <span className="text-gray-900">{system.dataPoints}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Modules:</h4>
                  <div className="flex flex-wrap gap-2">
                    {system.modules.map((module, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {module}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {system.status === 'connected' ? (
                    <>
                      <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                        <Settings className="w-4 h-4 mr-2 inline" />
                        Manage
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </>
                  ) : system.status === 'pending' ? (
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

      {/* Data Flow Visualization */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Flow Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">ERP Systems</h4>
            <p className="text-sm text-gray-600">Financial, HR, and operational data from enterprise systems</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sync className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Real-time Sync</h4>
            <p className="text-sm text-gray-600">Continuous data synchronization with enterprise security</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Analytics Engine</h4>
            <p className="text-sm text-gray-600">AI-powered insights and business intelligence</p>
          </div>
        </div>
      </div>

      {/* System Health & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="text-lg mr-3">🔷</div>
                <div>
                  <span className="text-sm font-medium text-gray-900">SAP ERP</span>
                  <p className="text-xs text-gray-500">S/4HANA Cloud</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600 font-medium">Healthy</span>
                <p className="text-xs text-gray-500">99.9% uptime</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="text-lg mr-3">🔴</div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Oracle ERP</span>
                  <p className="text-xs text-gray-500">Fusion Cloud 23C</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600 font-medium">Healthy</span>
                <p className="text-xs text-gray-500">99.8% uptime</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="text-lg mr-3">🟦</div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Dynamics 365</span>
                  <p className="text-xs text-gray-500">Business Central</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600 font-medium">Healthy</span>
                <p className="text-xs text-gray-500">100% uptime</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sync Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-lg">🔷</div>
              <div>
                <p className="text-sm font-medium text-gray-900">SAP Financial data updated</p>
                <p className="text-xs text-gray-500">15 minutes ago • 15,247 transactions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-lg">🟦</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dynamics 365 sync completed</p>
                <p className="text-xs text-gray-500">5 minutes ago • 8,743 entities</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-lg">🔴</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Oracle HCM data refreshed</p>
                <p className="text-xs text-gray-500">30 minutes ago • 12,156 records</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErpIntegrations;