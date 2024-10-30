import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Loader from "@/utlities/Loader";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; // Importing icons
import { EditTeam } from "../editTeam/EditTeam";

const MyTeam = () => {
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
    <div className="container mx-auto p-6">
    {currentUserTeams.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentUserTeams.map((team) => (
          <div
            key={team._id}
            className="relative rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 group overflow-hidden"
            style={{
              background: `linear-gradient(120deg, white 70%,#eafaf0 30%), linear-gradient(-300deg, white 70%,#eafaf0 30%)`,
              backgroundSize: "100% 50%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top left, bottom right",
            }}
          >
            <h3 className="text-2xl font-[500] mb-2 relative ">
              <Link
                to={`/dashboard/team/${team?.teamName}`}
                className="hover:underline uppercase"
              >
                {team?.teamName}
              </Link>
            </h3>
            <p className="opacity-80 text-[16px]">Admin: {team.displayName}</p>
            <p className="opacity-70 mb-4 text-[16px]">
              Members: {team.teamMembers.length}
            </p>
            <Link
                to={`/dashboard/team/${team?.teamName}`}
                className="hover:underline text-sm px-2 py-2 rounded-sm shadow-md bg-[#77dada]"
              >
                See Details
              </Link>
            {team.teamLeader === currentUser?._id && (
              <div className="flex justify-start mt-4 space-x-4 relative">
                <EditTeam
                  currentUserTeams={team}
                  refetch={refetch}
                  className="flex items-center [bg-[#77dada] text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <FaEdit className="mr-1" />
                </EditTeam>
                <button
                  className="flex items-center text-red-400 text-2xl"
                  onClick={() => handleDelete(team._id)}
                >
                  <FaTrash className="mr-1" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 text-2xl">
        {user?.email
          ? `No Board found, Please create boards ${user?.email}`
          : "Please log in to look at your boards."}
      </p>
    )}
  </div>
  
  );
};

export default MyTeam;


