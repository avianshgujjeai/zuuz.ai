import React from 'react';
import { useOffice365 } from '../context/Office365Context';
import { Microscope as Microsoft } from 'lucide-react';

export const Office365Login: React.FC = () => {
  const { login, loading, error } = useOffice365();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Microsoft className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CloudBox AI</h1>
          <p className="text-gray-600 mt-2">Connect with Office 365</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            'Connecting...'
          ) : (
            <>
              <Microsoft className="w-5 h-5 mr-2" />
              Sign in with Microsoft
            </>
          )}
        </button>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">What we'll access:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Email analytics and metrics</li>
            <li>• Teams activity and collaboration</li>
            <li>• SharePoint document insights</li>
            <li>• Productivity analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};