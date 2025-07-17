import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { demoCredentials } from '../data/users';
import { User, Shield, Briefcase } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (credential: any) => {
    setEmail(credential.email);
    setPassword(credential.password);
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('CEO')) return Shield;
    if (role.includes('Admin')) return Shield;
    if (role.includes('Manager')) return Briefcase;
    return User;
  };

  const getRoleColor = (role: string) => {
    if (role.includes('CEO')) return 'from-purple-600 to-indigo-700';
    if (role.includes('Admin')) return 'from-red-600 to-pink-700';
    if (role.includes('Manager')) return 'from-blue-600 to-cyan-700';
    return 'from-green-600 to-emerald-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6">
            <img 
              src="/ZUUZ Operational Efficiency Tool Logo.png" 
              alt="ZUUZ Logo" 
              className="w-24 h-24 mx-auto mb-4 rounded-2xl shadow-xl"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300" style={{display: 'none'}}>
              <div className="text-white font-bold text-3xl tracking-wider">Z</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 font-medium">Powered by CloudBox</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Access Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {showDemo ? 'Hide Demo Access' : 'Show Demo Access'}
            </button>
          </div>
        </div>

        {/* Demo Credentials - Collapsible */}
        {showDemo && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Demo Access</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">Quick login for demonstration</p>
            
            <div className="space-y-3">
              {demoCredentials.map((credential, index) => {
                const Icon = getRoleIcon(credential.role);
                const colorClass = getRoleColor(credential.role);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickLogin(credential)}
                    className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{credential.role}</h4>
                        <p className="text-xs text-gray-600">{credential.email}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 text-sm mb-2">Access Levels:</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <Shield className="w-3 h-3 text-purple-600 mr-2" />
                  <span className="text-gray-700"><strong>CEO:</strong> Complete system access</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-3 h-3 text-red-600 mr-2" />
                  <span className="text-gray-700"><strong>Admin:</strong> User & system management</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-3 h-3 text-blue-600 mr-2" />
                  <span className="text-gray-700"><strong>Manager:</strong> Team analytics & reports</span>
                </div>
                <div className="flex items-center">
                  <User className="w-3 h-3 text-green-600 mr-2" />
                  <span className="text-gray-700"><strong>User:</strong> Personal productivity metrics</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">ZUUZ Demo - Powered by CloudBox Technology</p>
        </div>
      </div>
    </div>
  );
};