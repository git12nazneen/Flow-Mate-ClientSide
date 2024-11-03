import CommonButton from "@/components/commonButton/CommonButton";
import { AddTeamMember } from "./AddTeamMember";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Loader from "@/utlities/Loader";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CreateTask } from "../tasks/CreateTask";
import UpperNavigation from "@/components/admin/elements/upperNavigation/UpperNavigation";

const Team = () => {
  const axiosCommon = UseAxiosCommon();
  const initialTeam = useLoaderData();

  const { boardName, teamName } = initialTeam;

  const [team, setTeam] = useState(initialTeam); // Use state to manage team data
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;

  // Fetch users
  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users");
      return res.data;
    },
  });

  // Fetch the current logged-in user
  const { data: userss = {}, isLoading: loading } = useQuery({
    queryKey: ["data", email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/users?email=${email}`);
      return res.data[0];
    },
    enabled: !!email,
  });

  // Fetch user teams
  const {
    data: teams = [],
    refetch: ref,
    isLoading: loadingTeam,
  } = useQuery({
    queryKey: ["teams", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/teams`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Filter members of the team
  const filteredMembers = team?.teamMembers
    ?.map((memberId) => users.find((user) => user?._id === memberId))
    ?.filter((member) => member !== undefined) || [];


  // Remove member logic
  const handleRemoveMember = async (id) => {
    try {
      // Show confirmation alert before proceeding
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove the member!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Proceed to remove the member if confirmed
          await axiosCommon.delete(`/delete/${team._id}/${id}`);

          // Update the team members in state
          setTeam((prevTeam) => ({
            ...prevTeam,
            teamMembers: prevTeam.teamMembers.filter(
              (memberId) => memberId !== id
            ),
          }));

          // Show success alert
          Swal.fire({
            title: "Deleted!",
            text: "The member has been removed.",
            icon: "success",
            position: "top-center",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (err) {
      console.error("Error removing member:", err.message);
    }
  };

  // Loading state
  if (isLoading || loading || loadingTeam) {
    return <Loader />;
  }

  // Error handling
  if (isError) {
    return <div className="text-red-500">Error loading members....</div>;
  }
console.log(team?.teamLeader === userss[0]?._id)
  return (
    <>
      <UpperNavigation />
      <div className="md:w-[1050px] mx-auto mt-8">
        <section className="container p-10 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-x-3 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 ">
              Team {team?.teamName} Members
            </h2>

            <div className="justify-end space-x-2">
              <CreateTask
                team={team}
                boardName={boardName}
                teamName={teamName}
              />

              {team?.teamLeader === userss[0]?._id && (
                <AddTeamMember refetch={refetch} team={team} />
              )}
            </div>
          </div>
          <div>
            {filteredMembers.length === 0 ? (
              <div className="flex justify-center items-center min-h-screen">
                <div className="text-4xl font-bold text-center text-red-600">
                  No team members added!
                </div>
              </div>
            ) : (
              <div className="overflow-hidden border border-gray-200 md:rounded-lg shadow-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">
                        Name
                      </th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">
                        Role
                      </th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">
                        Email
                      </th>
                      {team?.teamLeader === userss[0]?._id &&
                        <th className="py-4 px-4 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">
                          Actions
                        </th>
                      }
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMembers && filteredMembers?.map((member) => (
                      <tr
                        key={member._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={
                                member?.photo
                              }
                              alt={member.name}
                            />
                            <span className="font-medium">
                              {member?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {member?.role}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {member.email}
                        </td>

                        {team?.teamLeader === userss[0]?._id && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <button
                                onClick={() => handleRemoveMember(member._id)}
                                disabled={member?.role === "team-admin"} // Disable button if the member is a 'team-admin'
                                className={`text-white p-2 rounded-md bg-red-500 hover:bg-red-600 duration-75 
                              ${member?.role === "team-admin" ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Team;