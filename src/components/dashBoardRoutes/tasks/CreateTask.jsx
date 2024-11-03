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
import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CreateTask({ boardName, teamName, team }) {
  // State to manage form inputs
  const [startDate, setStartDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [stage, setStage] = useState("");
  const [workerMail, setWorkerMail] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get users based on the team name from the backend
  const { data: users = [] } = useQuery({
    queryKey: ["filteredUsers", team?.teamMembers],
    queryFn: async () => {
      const res = await axiosCommon.get(`/users/team/${teamName}`);
      return res.data; // Assuming the response is an array of user objects
    },
    enabled: !!team?.teamMembers, // Only fetch when team members are available
  });
  // console.log(users); // Debugging line to check users fetched

  // Data post mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (taskData) => {
      const { data } = await axiosCommon.post(`/createTask`, taskData);
      return data;
    },
    onSuccess: () => {
      toast.success("Task Added Successfully!");
      setLoading(false);
      queryClient.invalidateQueries("tasks");
      navigate(`/dashboard/all-team`);
    },
    onError: () => {
      toast.error("Failed to create task");
      setLoading(false);
    },
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const taskData = {
      taskTitle,
      assignedTo,
      stage,
      priority,
      workerMail,
      startDate: startDate.toISOString(),
      email: user?.email,
      userName: user?.displayName,
      boardName,
      teamName,
    };

    try {
      await mutateAsync(taskData);
      // Clear form fields after successful submission
      setTaskTitle("");
      setAssignedTo("");
      setStage("");
      setPriority("");
      setStartDate(new Date());
      setWorkerMail("");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00053d] hover:bg-black text-white py-2 px-4 rounded" variant="outline">
          Create task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Here you are creating a task</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="grid gap-2">
                <Label htmlFor="assign">Assign Task To</Label>
                <Select
                  onValueChange={(value) => {
                    const selectedMember = users.find((member) => member.name === value);
                    if (selectedMember) {
                      setAssignedTo(selectedMember.name);
                      setWorkerMail(selectedMember.email);
                    } else {
                      setAssignedTo("");
                      setWorkerMail("");
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {users.map((member) => (
                        <SelectItem key={member._id} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="worker_mail">Worker Mail</Label>
                <Input
                  id="worker_mail"
                  type="email"
                  placeholder="example@gmail.com"
                  value={workerMail}
                  onChange={(e) => setWorkerMail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="grid gap-2 w-full">
                <Label htmlFor="stage">Select Stage</Label>
                <Select onValueChange={setStage} required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Stages</SelectLabel>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="done">Completed</SelectItem>
                      <SelectItem value="todo">Todo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="date">Task Date</Label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full p-2 border rounded"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">📅</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="grid text-start gap-2 w-full">
                <Label htmlFor="priority">Priority Level</Label>
                <Select onValueChange={setPriority} required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Priority Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="high">Higher</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Lower</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className='bg-[#00053d] hover:bg-black text-white' type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
