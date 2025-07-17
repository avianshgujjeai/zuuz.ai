import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleBasedDashboard } from '../components/RoleBasedDashboard';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return <RoleBasedDashboard onNavigate={navigate} />;
};