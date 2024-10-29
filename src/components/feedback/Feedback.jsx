import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useState } from "react";

export function Feedback() {
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    const userEmail = user?.email;
    console.log(userEmail);
    if (!userEmail) {
      console.error("User email is not available");
      return;
    }

    try {
      const response = await fetch(
        `https://flowmate-a-team-collaboration-tool.vercel.app/feedback?email=${userEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            feedback,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Feedback submitted:", data);
      } else {
        console.error("Error submitting feedback:", data.message);
      }
    } catch (error) {
      console.error("Error posting feedback:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full bg-transparent text-white border-none text-left"
        >
          Share Feedback
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share Your Valuable Feedback</AlertDialogTitle>
          <AlertDialogDescription>
            We appreciate your feedback. It helps us improve our product.
          </AlertDialogDescription>
          <Label htmlFor="rating">Rating</Label>
          <Select onValueChange={setRating}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 ⭐</SelectItem>
              <SelectItem value="2">2 ⭐⭐</SelectItem>
              <SelectItem value="3">3 ⭐⭐⭐</SelectItem>
              <SelectItem value="4">4 ⭐⭐⭐⭐</SelectItem>
              <SelectItem value="5">5 ⭐⭐⭐⭐⭐</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="feedback">Your Feedback</Label>
          <Textarea onChange={(e) => setFeedback(e.target.value)} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
