import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import api from "../api/axios";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attendees: string[];
  createdBy: string;
  image: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleJoinEvent = async (eventId: string) => {
    try {
      await api.post(`/events/${eventId}/join`);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, attendees: [...event.attendees, localStorage.getItem("userId") || ""] }
            : event
        )
      );
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    try {
      await api.post(`/events/${eventId}/leave`);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, attendees: event.attendees.filter((id) => id !== localStorage.getItem("userId")) }
            : event
        )
      );
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <Button asChild className="mb-4">
        <Link to="/events/create">Create Event</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link to={`/events/${event._id}`}>View</Link>
                </Button>
                {event.attendees.includes(localStorage.getItem("userId") || "") ? (
                  <Button variant="destructive" onClick={() => handleLeaveEvent(event._id)}>
                    Leave
                  </Button>
                ) : (
                  <Button onClick={() => handleJoinEvent(event._id)}>Join</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Events;