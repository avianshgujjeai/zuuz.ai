import React, { useState } from 'react';
import { Shield, Users, Settings, Key, Plus, Edit3, Trash2, Save, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockUsers, availableModules } from '../data/users';
import { User } from '../types/auth';
import { useAuth } from '../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [moduleSettings, setModuleSettings] = useState(
    availableModules.reduce((acc, module) => ({
      ...acc,
      [module.id]: {
        enabled: true,
        maintenanceMode: false,
        accessLevel: 'all'
      }
    }), {} as Record<string, { enabled: boolean; maintenanceMode: boolean; accessLevel: string }>)
  );

  // Check if current user has admin access
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Only system administrators can access this panel.</p>
        </div>
      </div>
    );
  }

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      setEditingUser(null);
      alert('User permissions updated successfully!');
    }
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== userId));
      alert(`User ${user.name} has been deleted.`);
    }
  };

  const handlePermissionChange = (moduleId: string, action: string, checked: boolean) => {
    if (!editingUser) return;

    const updatedPermissions = [...editingUser.permissions];
    const existingPermission = updatedPermissions.find(p => p.module === moduleId);

    if (existingPermission) {
      if (checked) {
        if (!existingPermission.actions.includes(action as any)) {
          existingPermission.actions.push(action as any);
        }
      } else {
        existingPermission.actions = existingPermission.actions.filter(a => a !== action);
      }
    } else if (checked) {
      updatedPermissions.push({
        module: moduleId,
        actions: [action as any]
      });
    }

    setEditingUser({
      ...editingUser,
      permissions: updatedPermissions.filter(p => p.actions.length > 0)
    });
  };

  const handleModuleToggle = (moduleId: string, setting: 'enabled' | 'maintenanceMode') => {
    setModuleSettings(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [setting]: !prev[moduleId][setting]
      }
    }));

    const module = availableModules.find(m => m.id === moduleId);
    const action = setting === 'enabled' ? 
      (moduleSettings[moduleId].enabled ? 'disabled' : 'enabled') :
      (moduleSettings[moduleId].maintenanceMode ? 'taken out of maintenance' : 'put into maintenance');
    
    alert(`${module?.name} has been ${action}.`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleStatusColor = (moduleId: string) => {
    const settings = moduleSettings[moduleId];
    if (!settings.enabled) return 'text-red-600';
    if (settings.maintenanceMode) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage users, permissions, and system settings</p>
          </div>
        </div>
        <button
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
              <p className="text-sm text-gray-600">Administrators</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'manager').length}</p>
              <p className="text-sm text-gray-600">Managers</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center">
            <Settings className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(moduleSettings).filter(s => s.enabled).length}
              </p>
              <p className="text-sm text-gray-600">Active Modules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {[
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'permissions', label: 'Permissions Matrix', icon: Key },
            { id: 'modules', label: 'Module Control', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Permissions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.department}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{user.permissions.length} modules</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-green-600 font-medium">Active</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Edit Permissions"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 border-b">Module</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 border-b">CEO</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 border-b">Admin</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 border-b">Manager</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 border-b">User</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 border-b">Total Users</th>
                  </tr>
                </thead>
                <tbody>
                  {availableModules.map((module) => (
                    <tr key={module.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{module.name}</td>
                      {['ceo', 'admin', 'manager', 'user'].map((role) => {
                        const usersWithAccess = users.filter(u => 
                          u.role === role && u.permissions.some(p => p.module === module.id)
                        ).length;
                        const totalUsersInRole = users.filter(u => u.role === role).length;
                        
                        return (
                          <td key={role} className="py-3 px-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className={`text-sm font-medium ${
                                usersWithAccess > 0 ? 'text-green-600' : 'text-gray-400'
                              }`}>
                                {usersWithAccess}/{totalUsersInRole}
                              </span>
                              <div className="w-8 h-2 bg-gray-200 rounded-full mt-1">
                                <div 
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ 
                                    width: totalUsersInRole > 0 ? `${(usersWithAccess / totalUsersInRole) * 100}%` : '0%' 
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-medium text-blue-600">
                          {users.filter(u => u.permissions.some(p => p.module === module.id)).length}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Control Center</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableModules.map((module) => {
                const settings = moduleSettings[module.id];
                const usersWithAccess = users.filter(u => u.permissions.some(p => p.module === module.id)).length;
                
                return (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{module.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Route: {module.route}</p>
                      </div>
                      <div className={`text-2xl ${getModuleStatusColor(module.id)}`}>
                        {settings.enabled ? (settings.maintenanceMode ? '🔧' : '✅') : '❌'}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Module Enable/Disable */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-900">Module Status</span>
                          <p className="text-xs text-gray-500">Enable or disable this module</p>
                        </div>
                        <button
                          onClick={() => handleModuleToggle(module.id, 'enabled')}
                          className="flex items-center"
                        >
                          {settings.enabled ? (
                            <ToggleRight className="w-8 h-8 text-green-600" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Maintenance Mode */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-900">Maintenance Mode</span>
                          <p className="text-xs text-gray-500">Temporarily disable for maintenance</p>
                        </div>
                        <button
                          onClick={() => handleModuleToggle(module.id, 'maintenanceMode')}
                          className="flex items-center"
                          disabled={!settings.enabled}
                        >
                          {settings.maintenanceMode ? (
                            <ToggleRight className="w-8 h-8 text-yellow-600" />
                          ) : (
                            <ToggleLeft className={`w-8 h-8 ${settings.enabled ? 'text-gray-400' : 'text-gray-300'}`} />
                          )}
                        </button>
                      </div>

                      {/* User Access Count */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <span className="text-sm text-gray-600">Users with access:</span>
                        <span className="text-sm font-medium text-blue-600">{usersWithAccess}</span>
                      </div>

                      {/* Module Actions */}
                      <div className="flex space-x-2 pt-2">
                        <button className="flex-1 text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors">
                          View Logs
                        </button>
                        <button className="flex-1 text-xs bg-gray-600 text-white py-2 px-3 rounded hover:bg-gray-700 transition-colors">
                          Settings
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit User Permissions</h2>
                <button
                  onClick={() => setEditingUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{editingUser.name}</h3>
                <p className="text-gray-600">{editingUser.email} - {editingUser.role.toUpperCase()}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Module Permissions</h4>
                {availableModules.map((module) => {
                  const userPermission = editingUser.permissions.find(p => p.module === module.id);
                  return (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{module.name}</h5>
                      <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                      <div className="flex space-x-6">
                        {['read', 'write', 'admin'].map((action) => (
                          <label key={action} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={userPermission?.actions.includes(action as any) || false}
                              onChange={(e) => handlePermissionChange(module.id, action, e.target.checked)}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700 capitalize">{action}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;