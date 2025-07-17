import React from 'react';
import { Database, Cloud } from 'lucide-react';

interface DataSourceToggleProps {
  onToggle: (useRealData: boolean) => void;
  isRealData: boolean;
}

export const DataSourceToggle: React.FC<DataSourceToggleProps> = ({ onToggle, isRealData }) => {
  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <span className="text-sm font-medium text-gray-700">Data Source:</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle(false)}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            !isRealData
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Database className="w-4 h-4 mr-2" />
          Demo Data
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isRealData
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Cloud className="w-4 h-4 mr-2" />
          Live Office 365
        </button>
      </div>
    </div>
  );
};