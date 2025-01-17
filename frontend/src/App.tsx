import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import Events from "./routes/Events";
import EventDetails from "./routes/EventDetails";
import CreateEvent from "./routes/CreateEvent";
import Register from "./routes/Register";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "events", element: <Events /> },
      { path: "events/:eventId", element: <EventDetails /> },
      { path: "events/create", element: <CreateEvent /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;