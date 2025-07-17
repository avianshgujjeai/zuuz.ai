import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { EmailAnalytics } from './pages/EmailAnalytics';
import { DocumentCollaboration } from './pages/DocumentCollaboration';
import { TeamsActivity } from './pages/TeamsActivity';
import { SharePointDocuments } from './pages/SharePointDocuments';
import { FileAccess } from './pages/FileAccess';
import { TopCollaborators } from './pages/TopCollaborators';
import { QuietHours } from './pages/QuietHours';
import { ProductivityScore } from './pages/ProductivityScore';
import { SentimentAnalysis } from './pages/SentimentAnalysis';
import AIAgent from './pages/AIAgent';
import SaasIntegrations from './pages/SaasIntegrations';
import ErpIntegrations from './pages/ErpIntegrations';
import AdminPanel from './pages/AdminPanel';
import DocumentAnalysisPage from './pages/DocumentAnalysisPage';
import SecurityAnalysisPage from './pages/SecurityAnalysisPage';
import MeetingAnalysisPage from './pages/MeetingAnalysisPage';
import PerformanceReviewPage from './pages/PerformanceReviewPage';
import SystemUpdatesPage from './pages/SystemUpdatesPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ai-agent" element={<AIAgent />} />
            <Route path="email-analytics" element={<EmailAnalytics />} />
            <Route path="document-collaboration" element={<DocumentCollaboration />} />
            <Route path="teams-activity" element={<TeamsActivity />} />
            <Route path="email-metrics" element={<EmailAnalytics />} />
            <Route path="file-access" element={<FileAccess />} />
            <Route path="top-collaborators" element={<TopCollaborators />} />
            <Route path="quiet-hours" element={<QuietHours />} />
            <Route path="productivity-score" element={<ProductivityScore />} />
            <Route path="sentiment-analysis" element={<SentimentAnalysis />} />
            <Route path="saas-integrations" element={<SaasIntegrations />} />
            <Route path="erp-integrations" element={<ErpIntegrations />} />
            <Route path="sharepoint-documents" element={<SharePointDocuments />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="document-analysis" element={<DocumentAnalysisPage />} />
            <Route path="security-analysis" element={<SecurityAnalysisPage />} />
            <Route path="meeting-analysis" element={<MeetingAnalysisPage />} />
            <Route path="performance-review" element={<PerformanceReviewPage />} />
            <Route path="system-updates" element={<SystemUpdatesPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;