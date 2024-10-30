import PageHeader from '@/components/pageHeader/PageHeader';
import React, { useEffect, useState } from 'react';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' }),
      });
      setUsers(users.map(user => user.id === id ? { ...user, role: 'admin' } : user));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      const userToUpdate = users.find(user => user.id === id);
      const newStatus = userToUpdate.status === 'blocked' ? 'active' : 'blocked';

      await fetch(`http://localhost:5000/users/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <PageHeader title='Show user data' breadcrumb='See all the user information' />
      <div className="container mx-auto p-10">
        {/* Make this div always visible and maintain responsiveness */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#00053d] text-white">
                <th className="p-3 border border-gray-300 text-left">Photo</th>
                <th className="p-3 border border-gray-300 text-left">Name</th>
                <th className="p-3 border border-gray-300 text-left">Email</th>
                <th className="p-3 border border-gray-300 text-left">Role</th>
                <th className="p-3 border border-gray-300 text-left">Status</th>
                <th className="p-3 border border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-blue-50 transition duration-200">
                  <td className="p-3 border border-gray-200">
                    <img
                      src={user.photo}
                      alt={`${user.name}'s avatar`}
                      className="rounded-full object-cover w-6 h-6 lg:w-10 lg:h-10 md:w-10 md:h-10 border-2 border-gray-300"
                    />
                  </td>
                  <td className="p-3 border border-gray-200">{user?.name}</td>
                  <td className="p-3 border border-gray-200">{user?.email}</td>
                  <td className="p-3 border border-gray-200">{user?.role}</td>
                  <td className="p-3 border border-gray-200">{user?.status || 'inactive'}</td>
                  <td className="p-3 border border-gray-200 space-x-2">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="bg-[#00053d] text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleBlockUser(user.id)}
                      className={`px-3 py-1 rounded text-white hover:bg-red-600 transition duration-200 ${user.status === 'blocked' ? 'bg-gray-500' : 'bg-red-500'}`}
                    >
                      {user.status === 'blocked' ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#00053d] text-white' : 'bg-gray-200 hover:bg-gray-300 transition duration-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUser; 
