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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3">
                  <img
                    src={user.photo}
                    alt={`${user.name}'s avatar`}
                    className="rounded-full object-cover w-10 h-10 md:w-16 md:h-16 border-2 border-gray-300"
                  />
                </td>
                <td className="p-3 md:px-4 md:py-2">{user?.name}</td>
                <td className="p-3 md:px-4 md:py-2">{user?.email}</td>
                <td className="p-3 md:px-4 md:py-2">{user?.role}</td>
                <td className="p-3 md:px-4 md:py-2">{user?.status || 'inactive'}</td>
                <td className="p-3 md:px-4 md:py-2 space-x-2">
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleMakeAdmin(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleBlockUser(user.id)}
                    className={`px-3 py-1 rounded ${user.status === 'blocked' ? 'bg-gray-500' : 'bg-red-500'} text-white hover:bg-red-600`}
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
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
