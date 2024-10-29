import React, { useEffect, useState } from 'react';

const AllUser = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7; // Show 10 users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Calculate users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>

      {/* Responsive Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Activity</th>
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
                <button className="mt-6 md:px-4 md:py-2 bg-blue-500 text-white rounded-md hover:bg-red-500">dectivate</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="block md:hidden">
        {currentUsers.map((user) => (
          <div key={user._id} className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-300">
            <img
              src={user.photo}
              alt={`${user.name}'s avatar`}
              className="rounded-full object-cover w-16 h-16 border-2 border-gray-300"
            />
            <p><span className="font-semibold">Name:</span> {user?.name}</p>
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <p><span className="font-semibold">Role:</span> {user?.role}</p>
            <p><span className="font-semibold">Status:</span> {user?.status}</p>

          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
