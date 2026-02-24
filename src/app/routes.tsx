import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./pages/app/AppLayout";
import Home from "./pages/app/Home";
import AIChat from "./pages/app/AIChat";
import SymptomScan from "./pages/app/SymptomScan";
import MentalWellbeing from "./pages/app/MentalWellbeing";
import CityIntelligence from "./pages/app/CityIntelligence";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "chat",
        Component: AIChat,
      },
      {
        path: "scan",
        Component: SymptomScan,
      },
      {
        path: "mind",
        Component: MentalWellbeing,
      },
      {
        path: "map",
        Component: CityIntelligence,
      },
    ],
  },
]);
