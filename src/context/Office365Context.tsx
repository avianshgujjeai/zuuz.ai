import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../config/msalConfig';
import { GraphService } from '../services/graphService';

interface Office365ContextType {
  isAuthenticated: boolean;
  user: AccountInfo | null;
  graphService: GraphService | null;
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const Office365Context = createContext<Office365ContextType | undefined>(undefined);

export const useOffice365 = () => {
  const context = useContext(Office365Context);
  if (context === undefined) {
    throw new Error('useOffice365 must be used within an Office365Provider');
  }
  return context;
};

interface Office365ProviderProps {
  children: ReactNode;
}

export const Office365Provider: React.FC<Office365ProviderProps> = ({ children }) => {
  const [msalInstance] = useState(() => new PublicClientApplication(msalConfig));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [graphService, setGraphService] = useState<GraphService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeMsal();
  }, []);

  const initializeMsal = async () => {
    try {
      await msalInstance.initialize();
      const accounts = msalInstance.getAllAccounts();
      
      if (accounts.length > 0) {
        setUser(accounts[0]);
        setIsAuthenticated(true);
        await acquireTokenSilent(accounts[0]);
      }
    } catch (error) {
      console.error('MSAL initialization error:', error);
      setError('Failed to initialize authentication');
    } finally {
      setLoading(false);
    }
  };

  const acquireTokenSilent = async (account: AccountInfo) => {
    try {
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      
      const service = new GraphService(response.accessToken);
      setGraphService(service);
    } catch (error) {
      console.error('Silent token acquisition failed:', error);
      // If silent acquisition fails, user needs to login again
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await msalInstance.loginPopup(loginRequest);
      
      if (response.account) {
        setUser(response.account);
        setIsAuthenticated(true);
        
        const service = new GraphService(response.accessToken);
        setGraphService(service);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    msalInstance.logoutPopup();
    setIsAuthenticated(false);
    setUser(null);
    setGraphService(null);
  };

  return (
    <Office365Context.Provider
      value={{
        isAuthenticated,
        user,
        graphService,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </Office365Context.Provider>
  );
};