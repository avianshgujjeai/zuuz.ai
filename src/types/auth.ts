export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ceo' | 'manager' | 'user' | 'admin';
  department: string;
  teamId?: string;
  permissions: Permission[];
  avatar?: string;
}

export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

export interface Team {
  id: string;
  name: string;
  department: string;
  managerId: string;
  memberIds: string[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  requiredRole?: ('user' | 'manager' | 'ceo' | 'admin')[];
}