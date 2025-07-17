import { useState, useEffect } from 'react';
import { useOffice365 } from '../context/Office365Context';

export const useRealTimeData = () => {
  const { graphService, isAuthenticated } = useOffice365();
  const [emailData, setEmailData] = useState<Record<string, any> | null>(null);
  const [teamsData, setTeamsData] = useState<any[] | null>(null);
  const [filesData, setFilesData] = useState<any[] | null>(null);
  const [collaborationData, setCollaborationData] = useState<{ sharedFiles: any[]; activities: any[]; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    if (!graphService || !isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const [emails, teams, files, collaboration] = await Promise.all([
        graphService.getEmailAnalytics(30),
        graphService.getTeamsActivity(),
        graphService.getSharePointFiles(),
        graphService.getCollaborationInsights(),
      ]);

      setEmailData(emails);
      setTeamsData(teams);
      setFilesData(files);
      setCollaborationData(collaboration);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      console.error('Error fetching real-time data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && graphService) {
      fetchAllData();
      
      // Set up periodic refresh (every 5 minutes)
      const interval = setInterval(fetchAllData, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, graphService]);

  return {
    emailData,
    teamsData,
    filesData,
    collaborationData,
    loading,
    error,
    refetch: fetchAllData,
  };
};