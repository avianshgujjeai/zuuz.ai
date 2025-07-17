import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface DateRangeModalProps {
  currentRange: string;
  onClose: () => void;
  onRangeChange: (range: string) => void;
}

export const DateRangeModal: React.FC<DateRangeModalProps> = ({ currentRange, onClose, onRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState(currentRange);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const predefinedRanges = [
    '01/01/24 - 31/12/25',
    'Last 7 days',
    'Last 14 days',
    'Last 30 days',
    'Last 90 days',
    'Last 6 months',
    'Last year',
    'This week',
    'This month',
    'This quarter',
    'This year',
    'Yesterday'
  ];

  const handleApply = () => {
    if (showCustom && customStart && customEnd) {
      const customRange = `${customStart} to ${customEnd}`;
      onRangeChange(customRange);
    } else {
      onRangeChange(selectedRange);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Select Date Range</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-2 mb-6">
            {predefinedRanges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedRange(range);
                  setShowCustom(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedRange === range && !showCustom
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{range}</span>
                  {selectedRange === range && !showCustom && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
            
            <button
              onClick={() => setShowCustom(true)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                showCustom
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Custom Range</span>
                {showCustom && <Check className="w-4 h-4 text-blue-600" />}
              </div>
            </button>
          </div>

          {showCustom && (
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};