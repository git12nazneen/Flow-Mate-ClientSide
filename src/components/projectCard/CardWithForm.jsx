
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import CommonButton from "../commonButton/CommonButton";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CardWithForm({ closeForm }) {
  const [loading, setLoading] = useState(false);
  const axiosCommon = UseAxiosCommon();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;
  const { data = {} } = useQuery({
    queryKey: ['data', email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/users?email=${email}`);
      return res.data;
    },
    enabled: !!email
  });

  const queryClient = useQueryClient();

  // data post
  const { mutateAsync } = useMutation({
    mutationFn: async (boardData) => {
      const { data } = await axiosCommon.post(`/create-team`, boardData);
      return data;
    },
    onSuccess: async () => {
      console.log("Data Saved Successfully");
      toast.success("Project Created Successfully!");
      setLoading(false);
      await queryClient.invalidateQueries("boards"); // Refetch the boards query
      navigate('/dashboard/boardSystem'); // Navigate after refetching
    },
  });

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const boardData = {
      date: new Date().toLocaleString(),
      teamLeader: data._id,
      teamMembers: [data._id],
      pendingMembers: [],
      boardName: e.target.boardName.value,
      teamName: e.target.teamName.value,
      email: user?.email,
      displayName: user?.displayName,
    };
    try {
      console.log("Sending boardData to /createBoard");
      const response = await mutateAsync(boardData);
      console.log(response);
    } catch (error) {
      console.error("Error creating board:", error);
      toast.error("Failed to create board");
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Create project</CardTitle>
          <div onClick={closeForm}>
            <CommonButton text="x" />
          </div>
        </div>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <img
              className="h-40 w-72 mx-auto"
              src="https://images.pexels.com/photos/6373875/pexels-photo-6373875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Board Name</Label>
              <Input id="boardName" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="teamName">Team Name</Label>
              <Input id="teamName" placeholder="Team Name for your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Visibility</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="workspace">Workspace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between mt-6">
            <Button variant="outline" type="button" onClick={closeForm}>
              Cancel
            </Button>
            <CommonButton type="submit" text="Create" />
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

