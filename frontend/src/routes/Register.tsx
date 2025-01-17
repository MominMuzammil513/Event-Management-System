import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from "../api/axios";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form Data:", formData); // Log the form data
      const response = await api.post("/auth/register", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      toast({
        title: "Registration Successful",
        description: "You have been successfully registered.",
      });
      navigate("/events");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error registering:", error.response?.data || error.message); // Log the error
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to register. Please try again.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link to="/login" className="text-sm text-primary hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;