import PageHeader from '@/components/pageHeader/PageHeader';
import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import UpperNavigation from '../elements/upperNavigation/UpperNavigation';

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

  // Mutation to handle blocking/unblocking user using email
  const blockUserMutation = useMutation({
    mutationFn: async ({ email, status }) => {
      return await axiosCommon.patch(`/users/toggleBlockUser/${email}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const handleToggleAdmin = (email, currentRole) => {
    Swal.fire({
      title: "Do you want to make this change?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Do",
      denyButtonText: `Don't`,
    }).then((result) => {
      if (result.isConfirmed) {
        toggleAdminMutation.mutate(
          { email, role: currentRole === 'admin' ? 'user' : 'admin' },
          {
            onSuccess: () => {
              Swal.fire("Saved!", "User role updated successfully!", "success");
            },
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleBlockUser = (email, currentStatus) => {
    Swal.fire({
      title: "Do you want to make this change?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Do",
      denyButtonText: `Don't`,
    }).then((result) => {
      if (result.isConfirmed) {
        blockUserMutation.mutate(
          { email, status: currentStatus === 'blocked' ? 'active' : 'blocked' },
          {
            onSuccess: () => {
              Swal.fire("Saved!", `User has been ${currentStatus === 'blocked' ? 'unblocked' : 'blocked'} successfully!`, "success");
            },
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleExportToExcel = () => {
    const filteredUsers = users.map(user => ({
      Photo: user.photo,
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Status: user.status || 'inactive',
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "UsersData.xlsx");
  };


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <UpperNavigation />
      <PageHeader title='Show user data' breadcrumb='See all the user information' />
      <div className="container mx-auto p-10">
        <div className='flex justify-end my-4'>
          <Button className='bg-[#00053d]' onClick={handleExportToExcel} >
            Export to Excel
          </Button>
        </div>
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
                      className={`font-bold px-3 py-1 rounded text-white transition duration-200 ${user.role === 'admin' ? 'bg-blue-900 hover:bg-blue-700' : 'bg-[#00053d] hover:bg-blue-950'}`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                  <td className="p-3 border border-gray-200 space-x-2">
                    <button
                      onClick={() => handleBlockUser(user.email, user.status)}
                      className={`font-bold px-3 py-1 rounded hover:bg-slate-500 transition duration-200 ${user.status === 'blocked' ? 'bg-slate-300 text-blue-950' : 'bg-black text-white'}`}
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