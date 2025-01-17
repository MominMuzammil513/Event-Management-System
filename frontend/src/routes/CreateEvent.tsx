import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import api from "../api/axios";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    category: "",
    image: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("location", formData.location);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }
    console.log(formData,"YYYYYYYYYYYYYYYYYYYY")

    try {
      const response = await api.post("/events", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
console.log(response,"RRRRRRRRRRRRR")
      toast({
        title: "Event Created",
        description: "Your event has been successfully created.",
      });
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;