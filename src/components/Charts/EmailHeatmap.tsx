import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { emailHeatmapData } from '../../data/mockData';

export const EmailHeatmap: React.FC = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Response Time Heatmap</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={emailHeatmapData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Bar dataKey="marketing" stackId="a" fill="#3b82f6" name="Marketing" />
            <Bar dataKey="other" stackId="a" fill="#ef4444" name="Other" />
            <Bar dataKey="shipping" stackId="a" fill="#f59e0b" name="Shipping" />
            <Bar dataKey="transactions" stackId="a" fill="#10b981" name="Transactions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};