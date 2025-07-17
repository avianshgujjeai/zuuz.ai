import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MetricCard as MetricCardType } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  metric: MetricCardType;
}

export const MetricCard: React.FC<Props> = ({ metric }) => {
  const navigate = useNavigate();
  const isPositive = metric.changeType === 'positive';
  const isNegative = metric.changeType === 'negative';

  const handleClick = () => {
    // Map metric titles to their corresponding routes
    const routeMap: { [key: string]: string } = {
      'Total Emails Sent / Received Today': '/email-analytics',
      'Teams Messages Exchanged Today': '/teams-activity',
      'Active SharePoint Documents': '/sharepoint-documents',
      'Files Accessed from Internal Servers': '/file-access',
      'Top Collaborators': '/top-collaborators',
      'Quiet Hours Analysis': '/quiet-hours',
      'Employee Productivity Score': '/productivity-score',
      'Sentimental Score': '/sentiment-analysis'
    };

    const route = routeMap[metric.title];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div 
      className="metric-card cursor-pointer transition-all hover:shadow-lg hover:bg-gray-50 hover:scale-105 duration-200"
      onClick={handleClick}
    >
      <h4 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h4>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500">vs prev = {metric.previousValue}</span>
            <div className={`flex items-center ml-2 ${
              isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
            }`}>
              {isPositive && <TrendingUp className="w-3 h-3 mr-1" />}
              {isNegative && <TrendingDown className="w-3 h-3 mr-1" />}
              <span className="text-xs font-medium">({metric.change})</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Click to view details →
      </div>
    </div>
  );
};