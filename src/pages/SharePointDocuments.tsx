import React from 'react';
import { FileText, Download, Share2, Edit3, Folder, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const documentsData = [
  { name: 'Q4 Financial Report.xlsx', size: '2.4 MB', modified: '2 hours ago', owner: 'John Smith', downloads: 23, type: 'excel' },
  { name: 'Marketing Presentation.pptx', size: '15.7 MB', modified: '4 hours ago', owner: 'Sarah Johnson', downloads: 45, type: 'powerpoint' },
  { name: 'Project Guidelines.docx', size: '1.2 MB', modified: '1 day ago', owner: 'Mike Chen', downloads: 67, type: 'word' },
  { name: 'User Research Data.pdf', size: '8.9 MB', modified: '2 days ago', owner: 'Emily Davis', downloads: 34, type: 'pdf' },
  { name: 'Team Photos.zip', size: '45.2 MB', modified: '3 days ago', owner: 'David Wilson', downloads: 12, type: 'archive' }
];

const accessData = [
  { month: 'Jan', views: 1245, downloads: 234, shares: 89 },
  { month: 'Feb', views: 1456, downloads: 298, shares: 112 },
  { month: 'Mar', views: 1234, downloads: 267, shares: 95 },
  { month: 'Apr', views: 1678, downloads: 345, shares: 134 },
  { month: 'May', views: 1567, downloads: 312, shares: 128 },
  { month: 'Jun', views: 1789, downloads: 389, shares: 156 }
];

const fileTypes = [
  { name: 'Word Documents', value: 35, color: '#2563eb' },
  { name: 'Excel Sheets', value: 28, color: '#16a34a' },
  { name: 'PowerPoint', value: 22, color: '#dc2626' },
  { name: 'PDFs', value: 10, color: '#ea580c' },
  { name: 'Others', value: 5, color: '#7c3aed' }
];

export const SharePointDocuments: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter data based on user role and department
  const getFilteredData = () => {
    if (!user) return { 
      documents: documentsData, 
      title: 'SharePoint Documents',
      totalDocs: '2,847',
      downloads: '1,234',
      shared: '567',
      storage: '45.2 GB'
    };

    switch (user.role) {
      case 'user':
        const userDocs = documentsData.filter(doc => 
          doc.owner === user.name || 
          doc.name.toLowerCase().includes(user.department.toLowerCase())
        );
        return {
          documents: userDocs.length > 0 ? userDocs : [
            { name: 'My Project Notes.docx', size: '1.2 MB', modified: '1 hour ago', owner: user.name, downloads: 5, type: 'word' },
            { name: 'Team Meeting Notes.docx', size: '0.8 MB', modified: '3 hours ago', owner: user.name, downloads: 12, type: 'word' }
          ],
          title: 'Your Documents',
          totalDocs: '23',
          downloads: '47',
          shared: '12',
          storage: '2.1 GB'
        };
      
      case 'manager':
        const teamDocs = documentsData.filter(doc => 
          doc.name.toLowerCase().includes(user.department.toLowerCase()) ||
          doc.owner.includes('Manager')
        );
        return {
          documents: teamDocs.length > 0 ? teamDocs : documentsData.slice(0, 3),
          title: `${user.department} Team Documents`,
          totalDocs: '347',
          downloads: '234',
          shared: '89',
          storage: '12.4 GB'
        };
      
      default:
        return {
          documents: documentsData,
          title: 'Company SharePoint Documents',
          totalDocs: '2,847',
          downloads: '1,234',
          shared: '567',
          storage: '45.2 GB'
        };
    }
  };

  const { documents, title, totalDocs, downloads, shared, storage } = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="btn-primary">
            <FileText className="w-4 h-4 mr-2" />
            Upload Document
          </button>
          <button 
            onClick={() => window.open('https://sharepoint.com/sites/company/documents', '_blank')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Folder className="w-4 h-4 mr-2" />
            Open SharePoint
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/document-collaboration')}>
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalDocs}</p>
              <p className="text-sm text-gray-600">Total Documents</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/document-collaboration'); }}>View collaboration →</div>
            </div>
          </div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/ai-agent')}>
          <div className="flex items-center">
            <Download className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{downloads}</p>
              <p className="text-sm text-gray-600">Downloads This Month</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/ai-agent'); }}>AI insights →</div>
            </div>
          </div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/teams-activity')}>
          <div className="flex items-center">
            <Share2 className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{shared}</p>
              <p className="text-sm text-gray-600">Shared Documents</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/teams-activity'); }}>Team activity →</div>
            </div>
          </div>
        </div>
        <div className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/file-access')}>
          <div className="flex items-center">
            <Folder className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{storage}</p>
              <p className="text-sm text-gray-600">Storage Used</p>
              <div className="text-xs text-blue-600 mt-1" onClick={(e) => { e.stopPropagation(); navigate('/file-access'); }}>Access details →</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Access Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="views" fill="#3b82f6" name="Views" />
                <Bar dataKey="downloads" fill="#10b981" name="Downloads" />
                <Bar dataKey="shares" fill="#f59e0b" name="Shares" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">File Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fileTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {fileTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Modified</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Downloads</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FileText className={`w-5 h-5 mr-3 ${
                        doc.type === 'excel' ? 'text-green-600' :
                        doc.type === 'powerpoint' ? 'text-red-600' :
                        doc.type === 'word' ? 'text-blue-600' :
                        doc.type === 'pdf' ? 'text-orange-600' : 'text-gray-600'
                      }`} />
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                  <td className="py-3 px-4 text-gray-600">{doc.modified}</td>
                  <td className="py-3 px-4 text-gray-600">{doc.owner}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {doc.downloads}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          // Simulate file download
                          const link = document.createElement('a');
                          link.href = `data:text/plain;charset=utf-8,Sample content for ${doc.name}`;
                          link.download = doc.name;
                          link.click();
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://sharepoint.com/sites/company/documents/${doc.name}`, '_blank')}
                        className="p-1 text-gray-400 hover:text-green-600"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`https://sharepoint.com/sites/company/documents/${doc.name}`);
                          alert('Share link copied to clipboard!');
                        }}
                        className="p-1 text-gray-400 hover:text-purple-600"
                        title="Share"
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

      {/* Storage and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Used Storage</span>
              <span className="text-sm font-medium text-gray-900">45.2 GB / 100 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '45.2%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">54.8 GB</p>
                <p className="text-xs text-gray-600">Available</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">2,847</p>
                <p className="text-xs text-gray-600">Total Files</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">Most Popular</h4>
              <p className="text-sm text-blue-700 mt-1">Marketing presentations have highest download rate</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">Storage Optimization</h4>
              <p className="text-sm text-green-700 mt-1">Archive old files to free up 12.3 GB space</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900">Access Pattern</h4>
              <p className="text-sm text-yellow-700 mt-1">Peak usage between 10 AM - 2 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};