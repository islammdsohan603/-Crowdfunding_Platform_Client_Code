'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const result = await apiRequest('/api/users');
    setUsers(result.data || []);
  };

  useEffect(() => {
    loadUsers().catch(() => {});
  }, []);

  const updateRole = async (id, role) => {
    await apiRequest(`/api/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) });
    toast.success('Role updated.');
    loadUsers();
  };

  const removeUser = async id => {
    if (!window.confirm('Remove this user?')) return;
    await apiRequest(`/api/users/${id}`, { method: 'DELETE' });
    toast.success('User removed.');
    loadUsers();
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-gray-400"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Credits</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t border-gray-800">
                <td className="p-3">{user.displayName}</td><td className="p-3">{user.email}</td>
                <td className="p-3">
                  <select value={user.role} onChange={e => updateRole(user._id, e.target.value)} className="rounded-lg bg-[#0B0F19] p-2">
                    <option>Admin</option><option>Creator</option><option>Supporter</option>
                  </select>
                </td>
                <td className="p-3">{user.credits}</td>
                <td className="p-3"><button onClick={() => removeUser(user._id)} className="rounded-lg bg-red-600 px-3 py-2">Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;
