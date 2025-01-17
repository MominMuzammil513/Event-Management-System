// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import api from "../api/axios";
// import { useToast } from "@/hooks/use-toast";

// const Login = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await api.post("/auth/login", formData);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);
//       toast({
//         title: "Login Successful",
//         description: "You have been successfully logged in.",
//       });
//       navigate("/events");
//     } catch (error) {
//       console.error("Error logging in:", error);
//       toast({
//         title: "Error",
//         description: "Invalid email or password. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             required
//           />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <div className="mt-4 text-center">
//         <span className="text-sm text-gray-600">Don't have an account? </span>
//         <Link to="/register" className="text-sm text-primary hover:underline">
//           Register
//         </Link>
//       </div>
//       <div className="mt-4 text-center">
//         <Button variant="outline" className="w-full" onClick={() => handleGuestLogin()}>
//           Login as Guest
//         </Button>
//       </div>
//     </div>
//   );

//   const handleGuestLogin = async () => {
//     setIsLoading(true);

//     try {
//       const response = await api.post("/auth/guest-login");
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);
//       toast({
//         title: "Guest Login Successful",
//         description: "You have logged in as a guest.",
//       });
//       navigate("/events");
//     } catch (error) {
//       console.error("Error logging in as guest:", error);
//       toast({
//         title: "Error",
//         description: "Failed to log in as guest. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
// };
// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from "../api/axios";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      navigate("/events");
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/guest-login");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      toast({
        title: "Guest Login Successful",
        description: "You have logged in as a guest.",
      });
      navigate("/events");
    } catch (error) {
      console.error("Error logging in as guest:", error);
      toast({
        title: "Error",
        description: "Failed to log in as guest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <Link to="/register" className="text-sm text-primary hover:underline">
          Register
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGuestLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in as guest..." : "Login as Guest"}
        </Button>
      </div>
    </div>
  );
};

export default Login;