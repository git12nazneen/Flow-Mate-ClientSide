import { useState, useEffect } from "react"; // Import useState and useEffect
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";

export function EditTeam({ refetch, currentUserTeams }) {
  const axiosCommon = UseAxiosCommon();
  const [teamName, setTeamName] = useState("");

  
  useEffect(() => {
    if (currentUserTeams) {
      setTeamName(currentUserTeams.teamName || ""); 
    }
  }, [currentUserTeams]);

  const handleChange = (e) => {
    setTeamName(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    if (!currentUserTeams?._id) {
      console.error("No valid team ID found.");
      return;
    }

    try {
      const response = await axiosCommon.patch(`/update/${currentUserTeams._id}`, { 
        teamName 
      });

      if(response.data){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Team Name Updated Success",
          showConfirmButton: false,
          timer: 1500
        });
      }
      refetch();
    } catch (error) {
      console.error("Error updating team name:", error);

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00053d] text-white rounded-lg shadow-md transition-transform transform hover:scale-105" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="team-name" className="text-sm font-medium text-gray-700">
                Team Name
              </Label>
              <Input
                id="team-name"
                name="team-name"
                value={teamName} 
                onChange={handleChange} 
                className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                placeholder="Enter team name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="flex justify-center items-center w-full bg-[#00053d] hover:bg-black text-white  py-2 px-4 rounded hover:text-white transition duration-200 p-2"
            >
              Edit Team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
