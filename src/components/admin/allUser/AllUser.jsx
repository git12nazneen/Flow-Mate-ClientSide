import React, { useEffect, useState } from 'react';

const AllUser = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>

      {/* Responsive Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-left">photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <img
                  src={user.photo} // Default placeholder image if no src provided

                  className="rounded-full object-cover
                   w-16 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-20 lg:h-20
                   border-2 border-gray-300"
                />
                <td className="p-3 md:px-4 md:py-2">{user.name}</td>
                <td className="p-3 md:px-4 md:py-2">{user.email}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="block md:hidden">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-200">
            <img
              src={user.photo} // Default placeholder image if no src provided

              className="rounded-full object-cover
                   w-16 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-26 lg:h-20
                   border-2 border-gray-300"
            />
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
