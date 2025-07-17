import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

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
  aiAction: string;
  recommendation: string;
}

const DocumentAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [documents, setDocuments] = useState<DocumentIssue[]>([]);

  useEffect(() => {
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
          outdated: true,
          aiAction: 'Archive old version and consolidate with latest',
          recommendation: 'Keep only the final version and notify team members'
        },
        {
          id: 'doc-2',
          name: 'Budget_2024_BACKUP.xlsx',
          path: '/finance/archives/',
          size: '15.7 MB',
          lastModified: '234 days ago',
          issues: ['File corruption detected', 'Superseded by newer version'],
          severity: 'high',
          corruption: true,
          outdated: true,
          aiAction: 'Delete corrupted file and restore from backup',
          recommendation: 'Replace with clean backup version from December 2024'
        },
        {
          id: 'doc-3',
          name: 'Team_Photos_Event.zip',
          path: '/hr/events/',
          size: '45.2 MB',
          lastModified: '156 days ago',
          issues: ['Large file size', 'No recent access'],
          severity: 'medium',
          aiAction: 'Move to archive storage',
          recommendation: 'Compress and move to long-term storage to free up space'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const handleDocumentAction = (docId: string, action: string) => {
    alert(`AI Action: ${action}\n\nDocument ${docId} has been processed successfully!`);
    setDocuments(prev => prev.filter(d => d.id !== docId));
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI Document Analysis</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Analyzing stale documents for issues and optimization</p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="card text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">AI Analysis in Progress</h3>
            <p className="text-gray-600 mt-2">Scanning documents for duplicates, corruption, and optimization opportunities...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600">{documents.filter(d => d.severity === 'high').length}</div>
                <div className="text-sm text-gray-600">Critical Issues</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.duplicates).length}</div>
                <div className="text-sm text-gray-600">Duplicates</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-purple-600">{documents.filter(d => d.corruption).length}</div>
                <div className="text-sm text-gray-600">Corrupted</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">63.1 MB</div>
                <div className="text-sm text-gray-600">Space Recoverable</div>
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 break-words">{doc.name}</h3>
                          <p className="text-sm text-gray-600 break-words">{doc.path}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>Modified: {doc.lastModified}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(doc.severity)} mt-2 lg:mt-0`}>
                          {doc.severity.toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Issues Detected:</h4>
                        <div className="space-y-1">
                          {doc.issues.map((issue, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">AI Recommendation:</h4>
                        <p className="text-sm text-blue-700">{doc.recommendation}</p>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleDocumentAction(doc.id, doc.aiAction)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
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

export default DocumentAnalysisPage;