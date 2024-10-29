import PageHeader from "@/components/pageHeader/PageHeader";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const TeamRequest = () => {
  const user = useSelector((state) => state.auth.user);
  const axiosCommon = UseAxiosCommon();
  const [teamData, setTeamData] = useState([]);

  // Fetch user data using react-query
  const { data: userData = {} } = useQuery({
    queryKey: ['userData', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosCommon.get(`/users?email=${user?.email}`);
        return res.data;
      }
      return {};
    },
    enabled: !!user?.email,
  });

  // Fetch all team data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        if (user?.email) {
          const res = await axiosCommon.get(`/teams`);
          setTeamData(res.data);
        }
      } catch (error) {
        console.error("Error fetching team:", error.message);
      }
    };

    fetchTeam();
  }, [axiosCommon, user?.email]);

  // Filter matching teams with pending members
  const matchingTeams = teamData.filter(team => team.pendingMembers?.includes(userData._id));

// Accept member function
const acceptMember = async (teamId) => {
  try {
    const payload = {
      userId: userData._id,
    };
    await axiosCommon.patch(`/create-team/${teamId}/accept-member`, payload);
    setTeamData(prevData => 
      prevData.map(team => 
        team._id === teamId
          ? {
              ...team,
              pendingMembers: team.pendingMembers.filter(id => id !== userData._id),
              teamMembers: [...team.teamMembers, userData._id],
            }
          : team
      )
    );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Member accepted successfully",
  });


    console.log(`Accepted member for team ${teamId}`);
  } catch (error) {
    console.error("Error accepting member:", error.message);
  }
};


  return (
    <div className="container mx-auto p-4">
          <PageHeader title="Requested teams"  breadcrumb="All the requested teams here show"/>
      <h2 className="text-3xl font-bold mb-6 text-start opacity-80 text-gray-600"></h2>
      {matchingTeams.length > 0 ? (
        <table className="min-w-full text-center mt-12 w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Team Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Team Admin</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matchingTeams.map((team) => (
              <tr key={team._id}>
                <td className="border px-4 py-2">{team.teamName}</td>
                <td className="border px-4 py-2">{team.email}</td>
                <td className="border px-4 py-2">{team.displayName}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => acceptMember(team._id)}
                    className=" px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 text-2xl">No pending team requests found.</p>
      )}
    </div>
  );
};

export default TeamRequest;
