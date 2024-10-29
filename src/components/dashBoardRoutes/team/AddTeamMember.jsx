import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function AddTeamMember({ refetch, reset, team }) {
  const [search, setSearch] = useState("");
  const _id = team?._id;
  const axiosCommon = UseAxiosCommon();

  const { data = [], isLoading } = useQuery({
    queryKey: ["data", search],
    queryFn: async () => {
      if (search) {
        const res = await axiosCommon.get(`/search?name=${search}`);
        return res.data;
      }
      return [];
    },
    enabled: !!search,
  });

  const handleAddMember = async (e) => {
    e.preventDefault();
    const newMember = {
      userId: data._id,
    };

    try {
      const res = await axiosCommon.patch(
        `/teams/${_id}/add-pending-member`,
        newMember
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Member Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refetch the team data to show the new member
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Team Member",
        text: error?.response?.data?.message || "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" px-4 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1d4ed8] rounded-lg hover:bg-blue-400  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 hover:text-white"
          variant="outline"
        >
          Add New Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to your team by filling in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddMember}>
          <div className="grid gap-4 py-4 text-start justify-start">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="search" className="text-start">
                Search
              </Label>
              <Input
                id="search"
                name="search"
                className="col-span-3"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-start">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                defaultValue={data?.name}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="email" className="text-start">
                Email Address
              </Label>
              <Input
                name="email"
                id="email"
                className="col-span-3"
                defaultValue={data?.email}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="flex justify-start items-start">
              Add Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
