import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const axiosCommon = UseAxiosCommon();
  const [teamData, setTeamData] = useState([]);

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosCommon.get(`/users?email=${user?.email}`);
        return res.data;
      }
      return {};
    },
    enabled: !!user?.email,
  });

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

  const matchingTeams = teamData.filter((team) =>
    team.pendingMembers?.includes(userData._id)
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
      >
        <MdNotificationsActive className="text-3xl text-slate-900" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80 dark:bg-gray-800"
        >
          <div>
            {matchingTeams.length > 0 ? (
              matchingTeams.map((team) => (
                <div
                  key={team._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="size-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-muted-foreground">
                      {team.displayName} invite you to join {""}
                      <strong> {team.teamName}</strong>
                    </p>
                    <hr />
                  </div>

                  <Link
                    to={`/dashboard/team-request`}
                    className="inline-flex items-center justify-center w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  >
                    <FaEye />
                  </Link>
                </div>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
