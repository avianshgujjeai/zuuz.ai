import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ChevronDown, ChevronRight, TrendingUp, Users, Mail } from 'lucide-react';

interface DrillDownChartProps {
  data: any[];
  title: string;
  onDrillDown?: (item: any) => void;
}

export const DrillDownChart: React.FC<DrillDownChartProps> = ({ data, title, onDrillDown }) => {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleBarClick = (data: any, index: number) => {
    setSelectedBar(index);
    setShowDetails(true);
    if (onDrillDown) {
      onDrillDown(data);
    }
  };

  const getBarColor = (index: number) => {
    if (selectedBar === index) return '#2563eb';
    return '#3b82f6';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {showDetails ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
          Details
        </button>
      </div>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <p className="font-medium">{label}</p>
                      <p className="text-blue-600">
                        Value: {payload[0].value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Click to drill down</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              cursor="pointer"
              onClick={handleBarClick}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {showDetails && selectedBar !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">
            Detailed Analysis: {data[selectedBar]?.name}
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-900">Growth</div>
              <div className="text-xs text-gray-600">+12.5%</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-900">Users</div>
              <div className="text-xs text-gray-600">1,247</div>
            </div>
            <div className="text-center">
              <Mail className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-900">Activity</div>
              <div className="text-xs text-gray-600">High</div>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
              View Report
            </button>
            <button className="text-sm bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-50">
              Export Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};