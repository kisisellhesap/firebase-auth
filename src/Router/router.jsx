import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Intro from "../pages/Intro";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
