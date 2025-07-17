import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { activityData } from '../../data/mockData';

export const ActivityTimeline: React.FC = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Teams Activity Timeline</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Bar dataKey="profitMargin" fill="#3b82f6" name="Profit Margin" />
            <Bar dataKey="cost" fill="#10b981" name="Cost" />
            <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} name="Revenue" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};