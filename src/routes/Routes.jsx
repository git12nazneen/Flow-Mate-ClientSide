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
import AllUser from "@/components/admin/allUser/AllUser";

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

          <AboutPage />

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
    element:
      <DashBoard />
    ,
    children: [
      {
        index: true,
        element: <PrivateRoutes>
          <DashBoardHome />
        </PrivateRoutes>,
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
        element: <PrivateRoutes>
          <DashBoardProfile />
        </PrivateRoutes>,
      },
      {
        path: "admin",
        children: [
          {
            path: "dashboard/profilePage",
            element: <PrivateRoutes>
              <DashBoardProfile />
            </PrivateRoutes>,
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


      {
        path: "taskDetails/:id",
        element: <PrivateRoutes>
          <TaskDetails />
        </PrivateRoutes>,
        loader: ({ params }) =>
          fetch(
            `https://flowmate-a-team-collaboration-tool.vercel.app/createTask/${params.id}`
          ),
      },

      {
        path: "taskCard",
        element: <PrivateRoutes>
          <TaskCard />
        </PrivateRoutes>,

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
        element: <PrivateRoutes>
          <PaymentHistory />
        </PrivateRoutes>,
      },
      {
        path: 'all_users',
        element: <PrivateRoutes>
          <AllUser />
        </PrivateRoutes>
      },
      {
        path: "create-team",
        element: <PrivateRoutes>
          <TeamCreate />
        </PrivateRoutes>,
      },
      // {
      //   path: "my-team",
      //   element: <MyTeam />,
      // },
      {
        path: "team-request",
        element: <PrivateRoutes>
          <TeamRequest />
        </PrivateRoutes>,
      },
      {
        path: "boardSystem",
        element: <PrivateRoutes>
          <BoardSystem />
        </PrivateRoutes>,
      },
      {
        path: "createBoard/:id",
        element: <PrivateRoutes>
          <BoardDetails />
        </PrivateRoutes>,
        loader: ({ params }) =>
          fetch(`https://flowmate-a-team-collaboration-tool.vercel.app/createBoard/${params.id}`),
      },

      {
        path: "userActivity",
        element: <PrivateRoutes>
          <UserActivity />
        </PrivateRoutes>,
      },
      {
        path: "all-team",
        element: <PrivateRoutes>
          <AllTeam />
        </PrivateRoutes>,
      },
      {
        path: "teamTask/:teamName",
        element: <PrivateRoutes>
          <TeamTask />
        </PrivateRoutes>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/team/${params.teamName}`),
      },
      // {
      //   path: "my-task",
      //   element: <MyTask />,
      // },
      {
        path: "team-task/:teamName",
        element: <PrivateRoutes>
          <TodoList />
        </PrivateRoutes>,
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
