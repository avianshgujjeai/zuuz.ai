import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/auth';
import { mockUsers } from '../data/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (module: string, action: string) => boolean;
  canAccessModule: (moduleId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication logic
    const validCredentials = [
      { email: 'ceo@zuuz.com', password: 'ceo123' },
      { email: 'admin@zuuz.com', password: 'admin123' },
      { email: 'manager.engineering@zuuz.com', password: 'mgr123' },
      { email: 'manager.marketing@zuuz.com', password: 'mgr123' },
      { email: 'john.doe@zuuz.com', password: 'user123' },
      { email: 'jane.smith@zuuz.com', password: 'user123' },
      { email: 'bob.wilson@zuuz.com', password: 'user123' },
      // Legacy demo credentials
      { email: 'demo@zuuz.com', password: 'password' },
      { email: 'demo', password: 'demo' },
      { email: 'admin@zuuz.com', password: 'password' }
    ];

    const credential = validCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (credential) {
      // Find user in mock data or create default CEO user for legacy credentials
      let foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser && (email === 'demo@zuuz.com' || email === 'demo' || (email === 'admin@zuuz.com' && password === 'password'))) {
        foundUser = mockUsers.find(u => u.role === 'ceo'); // Default to CEO for legacy demo
      }

      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    
    const permission = user.permissions.find(p => p.module === module);
    return permission ? permission.actions.includes(action as any) : false;
  };

  const canAccessModule = (moduleId: string): boolean => {
    if (!user) return false;
    
    // Admin and CEO can access everything
    if (user.role === 'admin' || user.role === 'ceo') return true;
    
    // Check if user has permission for this module
    return user.permissions.some(p => p.module === moduleId);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      hasPermission, 
      canAccessModule 
    }}>
      {children}
    </AuthContext.Provider>
  );
};