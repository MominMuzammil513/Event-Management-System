import { Outlet, Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Root = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            Event Management
          </Link>
          <div className="flex gap-4">
            <Button asChild variant="ghost">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/events">Events</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;