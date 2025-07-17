import React from 'react';
import { Users, Mail, MessageSquare, FileText } from 'lucide-react';
import { topCollaborators } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const TopCollaborators: React.FC = () => {
  const { user } = useAuth();

  // Filter data based on user role
  const getFilteredData = () => {
    if (!user) return { data: topCollaborators, title: 'Top Collaborators' };

    switch (user.role) {
      case 'manager':
        // Show only team members for managers
        const teamCollaborators = topCollaborators.filter(c => c.department === user.department);
        return {
          data: teamCollaborators.length > 0 ? teamCollaborators : [
            { name: 'Team Member 1', interactions: 145, department: user.department },
            { name: 'Team Member 2', interactions: 123, department: user.department }
          ],
          title: `${user.department} Team Collaborators`
        };
      
      case 'ceo':
        return {
          data: topCollaborators,
          title: 'Company Top Collaborators'
        };
      
      default:
        return {
          data: [],
          title: 'Access Restricted'
        };
    }
  };

  const { data, title } = getFilteredData();

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-gray-600">You don't have permission to view this data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Active Collaborators</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">8,934</p>
              <p className="text-sm text-gray-600">Email Exchanges</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">15,672</p>
              <p className="text-sm text-gray-600">Team Messages</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">3,456</p>
              <p className="text-sm text-gray-600">Shared Documents</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top 10 Collaborators</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Interactions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Activity Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((collaborator, index) => (
                <tr key={collaborator.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{collaborator.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{collaborator.department}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{collaborator.interactions}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(collaborator.interactions / 250) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{Math.round((collaborator.interactions / 250) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration Patterns</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Cross-Department Collaboration</span>
              <span className="text-sm text-green-600 font-medium">↑ 23%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Project-Based Teams</span>
              <span className="text-sm text-blue-600 font-medium">↑ 15%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Remote Collaboration</span>
              <span className="text-sm text-purple-600 font-medium">↑ 31%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown</h3>
          <div className="space-y-3">
            {['Engineering', 'Marketing', 'Sales', 'Product', 'HR'].map((dept, index) => (
              <div key={dept} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{dept}</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${[85, 72, 68, 61, 45][index]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{[85, 72, 68, 61, 45][index]}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};