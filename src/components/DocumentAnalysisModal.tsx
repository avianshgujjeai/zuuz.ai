import React, { useState, useEffect } from 'react';
import { X, FileText, AlertTriangle, CheckCircle, Clock, Trash2, Archive, RefreshCw } from 'lucide-react';

interface DocumentAnalysisModalProps {
  onClose: () => void;
}

interface DocumentIssue {
  id: string;
  name: string;
  path: string;
  size: string;
  lastModified: string;
  issues: string[];
  severity: 'high' | 'medium' | 'low';
  duplicates?: string[];
  corruption?: boolean;
  outdated?: boolean;
}

export const DocumentAnalysisModal: React.FC<DocumentAnalysisModalProps> = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [documents, setDocuments] = useState<DocumentIssue[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setDocuments([
        {
          id: 'doc-1',
          name: 'Project_Requirements_v1.docx',
          path: '/shared/projects/legacy/',
          size: '2.4 MB',
          lastModified: '127 days ago',
          issues: ['Duplicate found', 'Outdated version'],
          severity: 'high',
          duplicates: ['Project_Requirements_v2.docx', 'Project_Requirements_final.docx'],
          outdated: true
        },
        {
          id: 'doc-2',
          name: 'Budget_2022_BACKUP.xlsx',
          path: '/finance/archives/',
          size: '15.7 MB',
          lastModified: '234 days ago',
          issues: ['File corruption detected', 'Superseded by newer version'],
          severity: 'high',
          corruption: true,
          outdated: true
        },
        {
          id: 'doc-3',
          name: 'Team_Photos_Event.zip',
          path: '/hr/events/',
          size: '45.2 MB',
          lastModified: '156 days ago',
          issues: ['Large file size', 'No recent access'],
          severity: 'medium'
        },
        {
          id: 'doc-4',
          name: 'Marketing_Draft_OLD.pptx',
          path: '/marketing/drafts/',
          size: '8.9 MB',
          lastModified: '98 days ago',
          issues: ['Multiple versions exist', 'Draft status unclear'],
          severity: 'medium',
          duplicates: ['Marketing_Draft_v2.pptx', 'Marketing_Final.pptx']
        },
        {
          id: 'doc-5',
          name: 'Temp_Data_Export.csv',
          path: '/temp/',
          size: '1.2 MB',
          lastModified: '189 days ago',
          issues: ['Temporary file not cleaned', 'Contains sensitive data'],
          severity: 'medium'
        }
      ]);
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleBulkAction = (action: 'archive' | 'delete' | 'update') => {
    const actionText = action === 'archive' ? 'archived' : action === 'delete' ? 'deleted' : 'updated';
    alert(`${selectedDocuments.length} documents have been ${actionText}.`);
    setSelectedDocuments([]);
    onClose();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Document Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">Analyzing stale documents for issues and optimization opportunities</p>
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
              <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Analysis in Progress</h3>
                <p className="text-gray-600 mt-2">Scanning documents for duplicates, corruption, and optimization opportunities...</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-500">✓ Checking for duplicate files</div>
                  <div className="text-sm text-gray-500">✓ Analyzing file integrity</div>
                  <div className="text-sm text-gray-500">✓ Identifying outdated versions</div>
                  <div className="text-sm text-blue-600">⟳ Generating recommendations...</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Summary Stats */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{documents.filter(d => d.severity === 'high').length}</div>
                  <div className="text-sm text-gray-600">Critical Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.duplicates).length}</div>
                  <div className="text-sm text-gray-600">Duplicates Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{documents.filter(d => d.corruption).length}</div>
                  <div className="text-sm text-gray-600">Corrupted Files</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">127.4 MB</div>
                  <div className="text-sm text-gray-600">Space Recoverable</div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            {selectedDocuments.length > 0 && (
              <div className="p-4 bg-blue-50 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedDocuments.length} documents selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBulkAction('archive')}
                      className="flex items-center px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                    >
                      <Archive className="w-4 h-4 mr-1" />
                      Archive
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                    <button
                      onClick={() => handleBulkAction('update')}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Documents List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleDocumentSelect(doc.id)}
                        className="mt-1"
                      />
                      <FileText className="w-6 h-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-600">{doc.path}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>{doc.size}</span>
                              <span>Last modified: {doc.lastModified}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(doc.severity)}`}>
                            {doc.severity.toUpperCase()}
                          </span>
                        </div>

                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Issues Detected:</h4>
                          <div className="space-y-2">
                            {doc.issues.map((issue, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                                <span className="text-gray-700">{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {doc.duplicates && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h4 className="text-sm font-medium text-yellow-900 mb-1">Duplicate Files Found:</h4>
                            <ul className="text-xs text-yellow-700 space-y-1">
                              {doc.duplicates.map((duplicate, index) => (
                                <li key={index}>• {duplicate}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {doc.corruption && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center">
                              <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                              <span className="text-sm font-medium text-red-900">File Corruption Detected</span>
                            </div>
                            <p className="text-xs text-red-700 mt-1">This file may be damaged and should be restored from backup or deleted.</p>
                          </div>
                        )}

                        <div className="mt-3 flex items-center space-x-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
                          <button className="text-sm text-green-600 hover:text-green-800">Restore from Backup</button>
                          <button className="text-sm text-red-600 hover:text-red-800">Mark for Deletion</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Immediate Actions</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Delete 2 corrupted files</li>
                    <li>• Archive 3 outdated documents</li>
                    <li>• Consolidate duplicate versions</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Optimization</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Free up 127.4 MB storage</li>
                    <li>• Improve search performance</li>
                    <li>• Reduce backup time by 15%</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-2">
                    <RefreshCw className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">Prevention</span>
                  </div>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Set up automated cleanup</li>
                    <li>• Implement version control</li>
                    <li>• Schedule monthly reviews</li>
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