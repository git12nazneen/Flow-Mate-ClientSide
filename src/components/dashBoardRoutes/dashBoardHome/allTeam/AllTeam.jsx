
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Loader from "@/utlities/Loader";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; // Importing icons

import PageHeader from "@/components/pageHeader/PageHeader";
import { EditTeam } from "../../editTeam/EditTeam";

const AllTeam = () => {
  const user = useSelector((state) => state.auth.user);
  const axiosCommon = UseAxiosCommon();

  // Fetch user teams using react-query
  const {
    data: teams = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teams", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/teams`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: users = [], isError } = useQuery({
    queryKey: ["data", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/users?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
    enabled: !!user?.email,
  });

  const currentUser = users.length > 0 ? users[0] : null;

  // Handle team deletion
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosCommon.delete(`/create-team/${id}`);
        Swal.fire("Deleted!", "Your team has been deleted.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      Swal.fire("Error!", "There was an error deleting the team.", "error");
    }
  };
  // Show loader or error message
  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const userId = currentUser?._id;

  const currentUserTeams = teams.filter((team) =>
    team.teamMembers.includes(userId)
  );

  return (
  
<div>
  <PageHeader title='This all are your teams' breadcrumb='See and find your task clicking the team name'/>
<div className="container mx-auto px-10 py-10 ">
  {currentUserTeams.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-2xl border border-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-[#1e43b8] ">
          <tr>
            <th className="p-4 text-left text-gray-200 font-semibold uppercase">Team Name</th>
            <th className="p-4 text-left text-gray-200 font-semibold uppercase">Admin</th>
            <th className="p-4 text-left text-gray-200 font-semibold uppercase">Members</th>
            <th className="p-4 text-left text-gray-200 font-semibold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUserTeams.map((team) => (
            <tr key={team._id} className="border-b transition-colors duration-200">
              <td className="p-4">
                <Link
                  to={`/dashboard/teamTask/${team?.teamName}`}
                  className="hover:underline  text-gray-800 text-md"
                >
                  {team?.teamName}
                </Link>
              </td>
              <td className="p-4 text-gray-700 text-base opacity-90">{team.displayName}</td>
              <td className="p-4 text-gray-700 text-base opacity-80">{team.teamMembers.length}</td>
              <td className="p-4">
                {team.teamLeader === currentUser?._id && (
                  <div className="flex space-x-3">
                    <EditTeam
                      currentUserTeams={team}
                      refetch={refetch}
                      className="flex items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </EditTeam>
                    <button
                      className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200"
                      onClick={() => handleDelete(team._id)}
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center text-gray-500 text-2xl">
      {user?.email
        ? `No Board found, Please create boards ${user?.email}`
        : "Please log in to see your boards."}
    </p>
  )}
</div>
</div>


  );
};

export default AllTeam;
