import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, AlertTriangle, ArrowLeft, Mail } from 'lucide-react';

interface PerformanceReview {
  id: string;
  employee: string;
  email: string;
  department: string;
  position: string;
  reviewPeriod: string;
  daysOverdue: number;
  lastReview: string;
  manager: string;
  status: 'overdue' | 'pending' | 'scheduled';
  aiAction: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

const PerformanceReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [processedReviews, setProcessedReviews] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setReviews([
        {
          id: 'rev-1',
          employee: 'John Smith',
          email: 'john.smith@company.com',
          department: 'Engineering',
          position: 'Senior Developer',
          reviewPeriod: 'Q4 2024',
          daysOverdue: 15,
          lastReview: 'Q2 2024',
          manager: 'Mike Manager',
          status: 'overdue',
          aiAction: 'Schedule review meeting and prepare evaluation',
          recommendation: 'Immediate scheduling required - performance review is 15 days overdue',
          priority: 'high'
        },
        {
          id: 'rev-2',
          employee: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          department: 'Marketing',
          position: 'Marketing Specialist',
          reviewPeriod: 'Q4 2024',
          daysOverdue: 8,
          lastReview: 'Q2 2024',
          manager: 'Sarah Manager',
          status: 'overdue',
          aiAction: 'Generate performance summary and schedule meeting',
          recommendation: 'Review overdue by 8 days - schedule within next 3 days',
          priority: 'high'
        },
        {
          id: 'rev-3',
          employee: 'Mike Chen',
          email: 'mike.chen@company.com',
          department: 'Engineering',
          position: 'Junior Developer',
          reviewPeriod: 'Q4 2024',
          daysOverdue: 3,
          lastReview: 'Q3 2024',
          manager: 'Mike Manager',
          status: 'pending',
          aiAction: 'Prepare review materials and notify manager',
          recommendation: 'Schedule review meeting within next week',
          priority: 'medium'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const handleReviewAction = (reviewId: string, action: string) => {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      alert(`AI Performance Review Action: ${action}\n\nEmployee: ${review.employee}\nAction: ${review.aiAction}\n\nReview process initiated successfully!`);
      setProcessedReviews(prev => [...prev, reviewId]);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'scheduled': return 'text-green-600 bg-green-100';
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Performance Review Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">AI-powered performance review scheduling and management</p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="card text-center py-12">
            <Users className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Analyzing Performance Reviews</h3>
            <p className="text-gray-600 mt-2">Checking review schedules and identifying overdue evaluations...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600">{reviews.filter(r => r.status === 'overdue').length}</div>
                <div className="text-sm text-gray-600">Overdue Reviews</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-yellow-600">{reviews.filter(r => r.priority === 'high').length}</div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">{processedReviews.length}</div>
                <div className="text-sm text-gray-600">Processed</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(reviews.reduce((sum, r) => sum + r.daysOverdue, 0) / reviews.length)}</div>
                <div className="text-sm text-gray-600">Avg Days Overdue</div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{review.employee}</h3>
                          <p className="text-sm text-gray-600">{review.position} • {review.department}</p>
                          <p className="text-sm text-gray-600">{review.email}</p>
                          {processedReviews.includes(review.id) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              PROCESSED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                            {review.status.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(review.priority)}`}>
                            {review.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Review Details */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Review Period:</span>
                          <p className="font-medium text-gray-900">{review.reviewPeriod}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Days Overdue:</span>
                          <p className="font-medium text-red-600">{review.daysOverdue} days</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Review:</span>
                          <p className="font-medium text-gray-900">{review.lastReview}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Manager:</span>
                          <p className="font-medium text-gray-900">{review.manager}</p>
                        </div>
                      </div>

                      {/* AI Analysis */}
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-900">AI Recommendation</h5>
                            <p className="text-sm text-blue-700 mt-1">{review.recommendation}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleReviewAction(review.id, review.aiAction)}
                          disabled={processedReviews.includes(review.id)}
                          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processedReviews.includes(review.id) ? 'Processed' : 'Execute AI Action'}
                        </button>
                        <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          Manual Schedule
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Mail className="w-4 h-4 mr-1" />
                          Notify
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

export default PerformanceReviewPage;