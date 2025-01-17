import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
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

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        console.log(response.data)
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location}</p>
          <p>Category: {event.category}</p>
          <p>Attendees: {event.attendees.length}</p>
          <img src={event.image} alt={event.name} className="mt-4 w-full max-w-md" />
        </CardContent>
      </Card>
      <Button asChild className="mt-4">
        <Link to="/events">Back to Events</Link>
      </Button>
    </div>
  );
};

export default EventDetails;