import Event from "../models/Event.js";
import User from "../models/User.js";
import { uploadImage } from "../utils/cloudinary.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role === "guest") {
      return res.status(403).json({ message: "Guests cannot create events" });
    }

    const { name, description, date, location, category } = req.body;
    const image = req.file; // Access the uploaded file

    let imageUrl = null;
    if (image) {
      const uploadResponse = await uploadImage(image.path); // Upload image to Cloudinary
      imageUrl = uploadResponse.secure_url; // Get the URL of the uploaded image
    }

    const event = new Event({
      name,
      description,
      date,
      location,
      category,
      image: imageUrl, // Include the image URL in the event object
      createdBy: req.userId,
    });

    await event.save();
    res.status(201).json(event); // Return the event with the image URL
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get all events
export const getEvents = async (req, res) => {
  try {
    const { date, category } = req.query;
    let query = {};

    if (date) {
      query.date = { $gte: new Date(date) }; // Filter events after the specified date
    }
    if (category) {
      query.category = category;
    }

    const events = await Event.find(query)
      .populate("createdBy", "name")
      .populate("attendees", "name");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, category } = req.body;
  const image = req.file; // Access the uploaded file

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }
    // Upload new image if provided
    if (image) {
      const uploadResponse = await uploadImage(image.path);
      event.image = uploadResponse.secure_url;
    }
    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.category = category || event.category;
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }
    // Use deleteOne() or findByIdAndDelete() to delete the event
    await Event.deleteOne({ _id: id }); // Correct way to delete a document
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Join an event
export const joinEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Check if user is already attending
    if (event.attendees.includes(req.userId)) {
      return res.status(400).json({ message: "You are already attending this event" });
    }
    event.attendees.push(req.userId);
    await event.save();

    // Emit WebSocket event for real-time updates
    if (req.io) {
      req.io.to(eventId).emit("attendeeUpdate", { eventId, attendees: event.attendees });
    }

    res.status(200).json({ message: "Successfully joined the event", event });
  } catch (error) {
    console.error("Error joining event:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Leave an event
export const leaveEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Remove user from attendees
    event.attendees = event.attendees.filter(attendee => attendee.toString() !== req.userId);
    await event.save();

    // Emit WebSocket event for real-time updates
    req.io.to(eventId).emit("attendeeUpdate", { eventId, attendees: event.attendees });

    res.status(200).json({ message: "Successfully left the event", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId)
      .populate("createdBy", "name")
      .populate("attendees", "name");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};