import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import DashBoard from "../layout/DashBoard";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signup/SignUp";
import AboutPage from "@/pages/aboutPage/AboutPage";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import DashBoardHome from "@/components/dashBoardRoutes/dashBoardHome/DashBoardHome";
import Team from "@/components/dashBoardRoutes/team/Team";
import Tasks from "@/components/dashBoardRoutes/tasks/Tasks";
import TaskDetails from "@/components/dashBoardRoutes/tasks/TaskDetails";
import PaymentHistory from "@/components/dashBoardRoutes/PaymentHistory/PaymentHistory";
import MyTeam from "@/components/dashBoardRoutes/myTeam/MyTeam";
import TeamCreate from "@/components/dashBoardRoutes/teamCreate/TeamCreate";
import TaskCard from "@/components/dashBoardRoutes/tasks/TaskCard";
import UpdateTask from "@/components/dashBoardRoutes/tasks/UpdateTask";
import TeamRequest from "@/components/dashBoardRoutes/teamRequest/TeamRequest";
import AdminDashboard from "@/components/admin/adminDashboard/AdminDashboard";
import DashBoardProfile from "@/components/dashBoardRoutes/dashBoardProfile/DashBoardProfile";
import BoardSystem from "@/components/dashBoardRoutes/dashBoardHome/boardSystem/BoardSystem";
import BoardDetails from "@/components/dashBoardRoutes/dashBoardHome/boardSystem/BoardDetails";

import PricingPlans from "@/components/PricingPlans";
import Contact from "@/components/contact/Contact";

import UserActivity from "@/components/dashBoardRoutes/userActivity/UserActivity";
import AllTeam from "@/components/dashBoardRoutes/dashBoardHome/allTeam/AllTeam";
import TeamTask from "@/components/dashBoardRoutes/dashBoardHome/teamTask/TeamTask";
import MyTask from "@/components/dashBoardRoutes/dashBoardHome/myTaskk/MyTask";
import TodoList from "@/components/dashBoardRoutes/tasks/TodoList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <PrivateRoutes>
            <AboutPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/pricing",
        element: <PricingPlans />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },

  // Dashboard routes
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        index: true,
        element: <DashBoardHome />,
      },
      {
        path: "user",
        element: (
          <PrivateRoutes>
            <DashBoardHome />
          </PrivateRoutes>
        ),
      },
      {
        path: "profilePage",
        element: <DashBoardProfile />,
      },
      {
        path: "admin",
        children: [
          {
            path: "dashboard/profilePage",
            element: <DashBoardProfile />,
          },
        ],
        element: (
          <PrivateRoutes>
            <AdminDashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "team/:teamName",
        element: <Team />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/team/${params.teamName}`),
      },

      // {
      //   path: "tasks",
      //   element: <Tasks />,
      // },
      {
        path: "taskDetails/:id",
        element: <TaskDetails />,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/createTask/${params.id}`
          ),
      },
     
        {
        path: "taskCard",
        element: <TaskCard />,
        
      },
      {
        path: "updateTask/:id",
        element: <UpdateTask />,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/createTask/${params.id}`
          ),
      },
    
      {
        path: "payment_history",
        element: <PaymentHistory />,
      },
      {
        path: "create-team",
        element: <TeamCreate />,
      },
      // {
      //   path: "my-team",
      //   element: <MyTeam />,
      // },
      {
        path: "team-request",
        element: <TeamRequest />,
      },
      {
        path: "boardSystem",
        element: <BoardSystem />,
      },
      {
        path: "createBoard/:id",
        element: <BoardDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/createBoard/${params.id}`),
      },

      {
        path: "userActivity",
        element: <UserActivity />,
      },
      {
        path: "all-team",
        element: <AllTeam/>,
      },
      {
        path: "teamTask/:teamName",
        element: <TeamTask />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/team/${params.teamName}`),
      },
      // {
      //   path: "my-task",
      //   element: <MyTask />,
      // },
      {
        path: "team-task/:teamName",
        element: <TodoList />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/team/${params.teamName}`),
      }
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);
