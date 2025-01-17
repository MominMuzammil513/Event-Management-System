import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Event Management Platform</h1>
      <Button asChild>
        <Link to="/events">View Events</Link>
      </Button>
    </div>
  );
};

export default Home;