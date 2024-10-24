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
import axios from "axios"; // Make sure you have axios installed

export function Feedback() {
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    const userEmail = user?.email;
    if (!userEmail) {
      console.error("User email is not available");
      return;
    }

    let imageUrl = null;

    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        // Upload image to imgbb
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOSTING_KEY
          }`,
          formData
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.display_url
        ) {
          imageUrl = response.data.data.display_url; // Extract the image URL correctly
          console.log("Image URL:", imageUrl); // Log the image URL for debugging
        } else {
          console.error("Failed to get image URL from imgbb response");
        }
      }

      // Ensure the image URL is correctly sent in the feedback request
      console.log("Sending feedback with image URL:", imageUrl);

      const feedbackResponse = await fetch(
        `http://localhost:5000/feedback?email=${userEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            feedback,
            imageUrl, // Include the image URL in the feedback payload
          }),
        }
      );

      const data = await feedbackResponse.json();
      console.log(data);

      if (feedbackResponse.ok) {
        console.log("Feedback submitted successfully:", data);
      } else {
        console.error("Error submitting feedback:", data.message);
      }
    } catch (error) {
      console.error("Error during feedback submission:", error);
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
          <Select onValueChange={(value) => setRating(Number(value))}>
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

          <Label htmlFor="image-upload">Attach Image (optional)</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
