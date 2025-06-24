/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  Shield, 
  Check, 
  X, 
  Search, 
  ChevronDown, 
  Filter, 
  UserCheck, 
  UserX,
  Edit,
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Trash2 
} from 'lucide-react';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  isVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  city: string | null;
  country: string | null;
  _count?: {
    verificationRequests: number;
  };
}

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => Promise<void>;
}

interface DeleteConfirmModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

function DeleteConfirmModal({ user, isOpen, onClose, onConfirm, isDeleting }: DeleteConfirmModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-red-800 rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          disabled={isDeleting}
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Trash2 className="mr-2 text-red-400" size={20} />
          Delete User
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Are you sure you want to delete this user?
          </p>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-white font-medium">{user.name || 'Unnamed User'}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <p className="text-gray-500 text-xs mt-1">Role: {user.role}</p>
          </div>
          <div className="mt-4 p-3 bg-red-500/10 border border-red-600 rounded-lg">
            <p className="text-red-400 text-sm">
              ⚠️ This action cannot be undone. This will permanently delete the user and all associated data.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditUserModal({ user, isOpen, onClose, onSave }: EditUserModalProps) {
  const [userData, setUserData] = useState<any>({
    name: '',
    email: '',
    role: '',
    isVerified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'VOLUNTEER',
        isVerified: user.isVerified
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSave(userData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving user data');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Edit className="mr-2 text-indigo-400" size={20} />
          Edit User
        </h2>
        
        {error && (
          <div className="bg-rose-500/10 border border-rose-600 rounded-lg p-3 mb-4 text-rose-400 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="VOLUNTEER">Volunteer</option>
                <option value="ORGANIZATION">Organization</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVerified"
                name="isVerified"
                checked={userData.isVerified}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="isVerified" className="ml-2 text-sm text-gray-300">
                Verified User
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UsersPage() {
  // State for users data
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filters
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState('');
  
  // State for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // State for sorting
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // State for edit modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // State for delete modal
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        order: sortOrder
      });
      
      if (search) queryParams.set('search', search);
      if (roleFilter) queryParams.set('role', roleFilter);
      if (verifiedFilter) queryParams.set('verified', verifiedFilter);
      
      const response = await fetch(`/api/admin/users?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users);
      setTotal(data.pagination.total);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, roleFilter, verifiedFilter, sortBy, sortOrder]);
    
  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };
  
  // Handle role filter change
  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setPage(1);
  };
  
  // Handle verified filter change
  const handleVerifiedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVerifiedFilter(e.target.value);
    setPage(1);
  };
  
  // Handle sort change
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Open edit modal
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  
  // Open delete modal
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  
  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
      
      // Close modal and refresh list
      setShowDeleteModal(false);
      setUserToDelete(null);
      fetchUsers();
      
      // Show success message (you can add a toast notification here)
      console.log('User deleted successfully');
      
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Save user changes
  const handleSaveUser = async (userData: any) => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }
      
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };
  
  // Quick actions to toggle verified status
  const handleToggleVerified = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isVerified: !currentStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user verification status');
      }
      
      fetchUsers();
    } catch (err) {
      console.error('Error updating user verification status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update verification status');
    }
  };
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <User className="mr-2 text-indigo-400" />
          User Management
        </h1>
        <p className="text-gray-400 mt-1">
          View and manage all users in the system
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="block w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </form>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={roleFilter}
                onChange={handleRoleFilterChange}
                className="appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg py-2 pl-3 pr-10"
              >
                <option value="">All Roles</option>
                <option value="VOLUNTEER">Volunteer</option>
                <option value="ORGANIZATION">Organization</option>
                <option value="ADMIN">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={verifiedFilter}
                onChange={handleVerifiedFilterChange}
                className="appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg py-2 pl-3 pr-10"
              >
                <option value="">All Status</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={() => fetchUsers()}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-600 rounded-lg p-4 mb-6">
          <p className="text-rose-400">{error}</p>
        </div>
      )}
      
      {/* Users Table */}
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl overflow-hidden mb-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-black/40">
                <tr>
                  <th 
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('name')}
                  >
                    <div className="flex items-center">
                      User
                      {sortBy === 'name' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('role')}
                  >
                    <div className="flex items-center">
                      Role
                      {sortBy === 'role' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('createdAt')}
                  >
                    <div className="flex items-center">
                      Joined
                      {sortBy === 'createdAt' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('isVerified')}
                  >
                    <div className="flex items-center">
                      Verified
                      {sortBy === 'isVerified' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th 
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black/20 divide-y divide-gray-800">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center">
                      <p className="text-gray-400 mb-1">No users found</p>
                      <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                            {user.image ? (
                              <img src={user.image} alt={user.name || 'User'} className="h-10 w-10 object-cover" />
                            ) : (
                              <span className="text-lg font-medium text-indigo-400">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-white">
                              {user.name || 'Unnamed User'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-700' 
                            : user.role === 'ORGANIZATION' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-700'
                              : 'bg-green-500/20 text-green-400 border border-green-700'
                        }`}>
                          <Shield className="w-3 h-3 mr-1" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.isVerified ? (
                          <span className="inline-flex items-center text-emerald-400">
                            <Check className="w-5 h-5 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-gray-400">
                            <X className="w-5 h-5 mr-1" />
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.city && user.country ? (
                          `${user.city}, ${user.country}`
                        ) : user.country ? (
                          user.country
                        ) : user.city ? (
                          user.city
                        ) : (
                          <span className="text-gray-500">Not specified</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-400 hover:text-indigo-300 p-1"
                            title="Edit User"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          
                          {!user.isVerified && (
                            <button
                              onClick={() => handleToggleVerified(user.id, user.isVerified)}
                              className="text-emerald-400 hover:text-emerald-300 p-1"
                              title="Verify User"
                            >
                              <UserCheck className="w-5 h-5" />
                            </button>
                          )}
                          
                          {user.isVerified && (
                            <button
                              onClick={() => handleToggleVerified(user.id, user.isVerified)}
                              className="text-rose-400 hover:text-rose-300 p-1"
                              title="Unverify User"
                            >
                              <UserX className="w-5 h-5" />
                            </button>
                          )}
                          
                          {/* Add Delete Button */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete User"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-black/40 px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">{(page - 1) * limit + 1}</span> to{' '}
              <span className="font-medium text-white">
                {Math.min(page * limit, total)}
              </span>{' '}
              of <span className="font-medium text-white">{total}</span> users
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:pointer-events-none flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:pointer-events-none flex items-center"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Edit User Modal */}
      <EditUserModal
        user={selectedUser}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveUser}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        user={userToDelete}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}