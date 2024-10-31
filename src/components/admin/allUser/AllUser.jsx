import PageHeader from '@/components/pageHeader/PageHeader';
import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  const axiosCommon = UseAxiosCommon();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users");
      return data;
    },
  });

  // Mutation to handle admin role toggling
  const toggleAdminMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      return await axiosCommon.patch(`/users/admin-toggle/${email}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });


  const handleToggleAdmin = (email, currentRole) => {
    toggleAdminMutation.mutate({ email, role: currentRole === 'admin' ? 'user' : 'admin' });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <PageHeader title='Show user data' breadcrumb='See all the user information' />
      <div className="container mx-auto p-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#00053d] text-white">
                <th className="p-3 border border-gray-300 text-left">Photo</th>
                <th className="p-3 border border-gray-300 text-left">Name</th>
                <th className="p-3 border border-gray-300 text-left">Email</th>
                <th className="p-3 border border-gray-300 text-left">Role</th>
                <th className="p-3 border border-gray-300 text-left">Status</th>
                <th className="p-3 border border-gray-300 text-left">Admin Actions</th>
                <th className="p-3 border border-gray-300 text-left">User Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-blue-50 transition duration-200">
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
                    <button
                      onClick={() => handleToggleAdmin(user.email, user.role)}
                      className={`px-3 py-1 rounded text-white transition duration-200 ${user.role === 'admin' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#00053d] hover:bg-green-600'
                        }`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                  <td className="p-3 border border-gray-200 space-x-2">
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
