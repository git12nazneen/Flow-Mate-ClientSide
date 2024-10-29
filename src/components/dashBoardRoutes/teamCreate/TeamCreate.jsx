import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const TeamCreate = () => {
  const [teamName, setTeamName] = useState("");
  const axiosCommon = UseAxiosCommon()
  const user = useSelector((state) => state.auth.user);
  const displayName = user?.displayName;
  const email = user?.email;
  const {data = {}} = useQuery({
    queryKey: ['data',email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/users?email=${email}`)
      return res.data
    },
    enabled: !!email
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: new Date().toLocaleString(),
      teamName,
      teamLeader: data._id,
      teamMembers: [data._id],
      pendingMembers: [],
      email,
      displayName,
    };

   // API call to create the team
axiosCommon
.post(`/create-team`, formData)
.then((response) => {
  const data = response.data; 
  if (data) {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Team Created Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    // Reset form fields
    setTeamName("");
  }
})
.catch((error) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "Failed to create team",
    text: error.message,
    showConfirmButton: true,
  });
});

  };

  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="card w-full max-w-lg shadow-2xl bg-white rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Team
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Fill in the details to create a new team for your project.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-[16px] font-semibold text-gray-700">Team Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter team name"
              className="input mt-3 w-full border-2 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00053d] rounded-lg hover:bg-blue-400  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamCreate;
