import React from 'react';
import { FileText, Users, Clock, Share2, Edit3, Eye } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

const documentData = [
  { name: 'Project Proposal.docx', collaborators: 8, lastEdited: '2 hours ago', status: 'active' },
  { name: 'Marketing Strategy.pptx', collaborators: 5, lastEdited: '4 hours ago', status: 'active' },
  { name: 'Budget Report.xlsx', collaborators: 12, lastEdited: '1 day ago', status: 'review' },
  { name: 'User Research.docx', collaborators: 6, lastEdited: '2 days ago', status: 'completed' },
  { name: 'Product Roadmap.pptx', collaborators: 9, lastEdited: '3 days ago', status: 'active' }
];

const collaborationTrends = [
  { month: 'Jan', documents: 45, collaborators: 23 },
  { month: 'Feb', documents: 52, collaborators: 28 },
  { month: 'Mar', documents: 48, collaborators: 31 },
  { month: 'Apr', documents: 61, collaborators: 35 },
  { month: 'May', documents: 55, collaborators: 29 },
  { month: 'Jun', documents: 67, collaborators: 42 }
];

const documentTypes = [
  { name: 'Word Documents', value: 45, color: '#3b82f6' },
  { name: 'PowerPoint', value: 30, color: '#ef4444' },
  { name: 'Excel Sheets', value: 20, color: '#10b981' },
  { name: 'PDFs', value: 5, color: '#f59e0b' }
];

export const DocumentCollaboration: React.FC = () => {
  const { user } = useAuth();

  // Filter data based on user role and department
  const getFilteredData = () => {
    if (!user) return { 
      documents: documentData,
      title: 'Document Collaboration',
      activeDocs: '1,247',
      collaborators: '342',
      edits: '8,934',
      avgTime: '2.4h'
    };

    switch (user.role) {
      case 'user':
        const userDocs = documentData.filter(doc => 
          doc.name.toLowerCase().includes(user.department.toLowerCase()) ||
          Math.random() > 0.7 // Simulate user's documents
        );
        return {
          documents: userDocs.length > 0 ? userDocs.slice(0, 2) : [
            { name: 'My Project Notes.docx', collaborators: 3, lastEdited: '1 hour ago', status: 'active' },
            { name: 'Team Planning.pptx', collaborators: 5, lastEdited: '3 hours ago', status: 'review' }
          ],
          title: 'Your Document Collaboration',
          activeDocs: '12',
          collaborators: '8',
          edits: '47',
          avgTime: '1.8h'
        };
      
      case 'manager':
        return {
          documents: documentData.filter(doc => 
            doc.name.toLowerCase().includes(user.department.toLowerCase()) ||
            doc.collaborators >= 5
          ),
          title: `${user.department} Team Collaboration`,
          activeDocs: '156',
          collaborators: '23',
          edits: '892',
          avgTime: '2.1h'
        };
      
      default:
        return {
          documents: documentData,
          title: 'Company Document Collaboration',
          activeDocs: '1,247',
          collaborators: '342',
          edits: '8,934',
          avgTime: '2.4h'
        };
    }
  };

  const { documents, title, activeDocs, collaborators, edits, avgTime } = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <button className="btn-primary">
            <Share2 className="w-4 h-4 mr-2" />
            Share Document
          </button>
          <button 
            onClick={() => window.open('https://docs.google.com/document/d/1example/edit', '_blank')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Create New Document
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeDocs}</p>
              <p className="text-sm text-gray-600">Active Documents</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{collaborators}</p>
              <p className="text-sm text-gray-600">Active Collaborators</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Edit3 className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{edits}</p>
              <p className="text-sm text-gray-600">Edits This Week</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{avgTime}</p>
              <p className="text-sm text-gray-600">Avg Collaboration Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={collaborationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="documents" stroke="#3b82f6" strokeWidth={2} name="Documents" />
                <Line type="monotone" dataKey="collaborators" stroke="#10b981" strokeWidth={2} name="Collaborators" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={documentTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {documentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Collaborated Documents</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Document</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Collaborators</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Edited</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">{doc.collaborators}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{doc.lastEdited}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'active' ? 'bg-green-100 text-green-800' :
                      doc.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => window.open(`https://docs.google.com/document/d/${index}/view`, '_blank')}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://docs.google.com/document/d/${index}/edit`, '_blank')}
                        className="p-1 text-gray-400 hover:text-green-600"
                        title="Edit Document"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`https://docs.google.com/document/d/${index}/view`);
                          alert('Share link copied to clipboard!');
                        }}
                        className="p-1 text-gray-400 hover:text-purple-600"
                        title="Share Document"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};