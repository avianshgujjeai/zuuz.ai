import React, { useState } from 'react';
import { X, Filter, Check, Users, Mail, FileText, BarChart3 } from 'lucide-react';

interface FilterModalProps {
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const filterCategories = [
    { id: 'emails', label: 'Email Analytics', icon: Mail, description: 'Filter by email metrics and patterns' },
    { id: 'teams', label: 'Teams Activity', icon: Users, description: 'Filter by collaboration data' },
    { id: 'documents', label: 'Document Access', icon: FileText, description: 'Filter by file and document metrics' },
    { id: 'productivity', label: 'Productivity Scores', icon: BarChart3, description: 'Filter by performance metrics' }
  ];

  const departments = [
    'Engineering', 'Marketing', 'Sales', 'Product', 'HR', 'Finance', 'Operations', 'Support'
  ];

  const metrics = [
    'Response Time', 'Collaboration Score', 'Meeting Load', 'Document Access', 
    'Email Volume', 'Productivity Score', 'Sentiment Analysis', 'File Sharing'
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleDepartmentToggle = (dept: string) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const handleApplyFilters = () => {
    // Simulate applying filters
    alert(`Filters Applied:\n\nCategories: ${selectedFilters.join(', ') || 'None'}\nDepartments: ${selectedDepartments.join(', ') || 'None'}\nMetrics: ${selectedMetrics.join(', ') || 'None'}`);
    onClose();
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedDepartments([]);
    setSelectedMetrics([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Filter className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
                <p className="text-sm text-gray-600">Customize your dashboard view with intelligent filtering</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-8">
            {/* Filter Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedFilters.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleFilterToggle(category.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-6 h-6 mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{category.label}</h4>
                            {isSelected && <Check className="w-5 h-5 text-blue-600" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Departments</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {departments.map((dept) => {
                  const isSelected = selectedDepartments.includes(dept);
                  return (
                    <button
                      key={dept}
                      onClick={() => handleDepartmentToggle(dept)}
                      className={`p-3 rounded-lg border transition-colors text-sm font-medium ${
                        isSelected 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{dept}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {metrics.map((metric) => {
                  const isSelected = selectedMetrics.includes(metric);
                  return (
                    <button
                      key={metric}
                      onClick={() => handleMetricToggle(metric)}
                      className={`p-3 rounded-lg border transition-colors text-sm font-medium ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{metric}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => {
                    setSelectedFilters(['emails', 'teams']);
                    setSelectedDepartments(['Engineering', 'Marketing']);
                    setSelectedMetrics(['Response Time', 'Collaboration Score']);
                  }}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <h4 className="font-medium text-blue-900">Communication Focus</h4>
                  <p className="text-sm text-blue-700 mt-1">Email and Teams collaboration metrics</p>
                </button>
                <button 
                  onClick={() => {
                    setSelectedFilters(['productivity', 'documents']);
                    setSelectedDepartments(['Sales', 'Product']);
                    setSelectedMetrics(['Productivity Score', 'Document Access']);
                  }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
                >
                  <h4 className="font-medium text-green-900">Productivity Analysis</h4>
                  <p className="text-sm text-green-700 mt-1">Performance and document usage</p>
                </button>
                <button 
                  onClick={() => {
                    setSelectedFilters(['teams', 'documents']);
                    setSelectedDepartments(['HR', 'Operations']);
                    setSelectedMetrics(['Meeting Load', 'Sentiment Analysis']);
                  }}
                  className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left"
                >
                  <h4 className="font-medium text-purple-900">Team Health</h4>
                  <p className="text-sm text-purple-700 mt-1">Meeting patterns and team sentiment</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedFilters.length + selectedDepartments.length + selectedMetrics.length} filters selected
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};