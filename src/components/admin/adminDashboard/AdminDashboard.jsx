import UpperNavigation from "../elements/upperNavigation/UpperNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { FaDollarSign, FaUserFriends, FaNewspaper, FaTasks } from "react-icons/fa";
import SmallBarChart from "../elements/upperNavigation/lineChart/SmallLineChart";
import PieChartInteraction from "../elements/pieChart/PieChartInteraction";
import { useSelector } from "react-redux";
import PageHeader from "@/components/pageHeader/PageHeader";
import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";
import svgImg from '../../../assets/icon-user-male.svg'
const AdminDashboard = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  // Fetch paid users
  const { data: paid = [], error: paidError } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosCommon.get("/payments/payment");
      return res.data;
    },
  });

  // Fetch logged-in users
  const { data: loggedInUsers = [], error: loggedInError } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosCommon.get("users/get");
      return res.data;
    },
  });

  // Fetch subscription users
  const { data: subscription = [], error: subscriptionError } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosCommon.get("/newsletters");
      return res.data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //fetch all teams
  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await axiosCommon.get("/allTeams");
      return res.data;
    },
  });

  const { data: contactUs = [] } = useQuery({
    queryKey: ["contactUs"],
    queryFn: async () => {
      const res = await axiosCommon.get("/contacts/get");
      return res.data;
    },
  });
  //get all tasks created in our website
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosCommon.get("/createTask");
      return res.data;
    },
  });

  // Handle error states
  if (paidError || loggedInError || subscriptionError) {
    return (
      <div>
        Error:{" "}
        {paidError?.message ||
          loggedInError?.message ||
          subscriptionError?.message}
      </div>
    );
  }

  // Prepare data for the chart
  const userGrowthData = {
    paidUsers: paid.length, // Count of paid users
    loggedInUsers: loggedInUsers.length, // Count of logged-in users
    subscriptionUsers: subscription.length, // Count of subscription users
  };
  const userInteractionData = {
    contactUs: contactUs.length,
    tasks: tasks.length,
    teams: teams.length,
  };
  console.log(userInteractionData);

  return (
    <div className=" mx-auto lg:pb-5 ">
      <UpperNavigation />
      <div className="lg:my-8">
        <div className="mx-5">
          <PageHeader title="FlowMate Admin Dashboard"  breadcrumb={`Hello ${user.displayName}, Welcome to the admin dashboard`}   />
        </div>
        <div className="flex lg:flex-row flex-col justify-between px-10 mx-auto">
          <div className="lg:w-2/3 w-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-3 text-center mx-5 my-10">
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900">
            <CardHeader className="flex items-center">
              <FaDollarSign className="mr-2 text-3xl" />
              <CardTitle>Paid Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Count: {userGrowthData.paidUsers}
              </p>
            </CardContent>
          </Card>

          {/* Login User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900 shadow-xl">
            <CardHeader className="flex items-center">
              <FaUserFriends className="mr-2 text-3xl" />
              <CardTitle>Login Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Count: {userGrowthData.loggedInUsers}
              </p>
            </CardContent>
          </Card>

          {/* Subscription User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900">
            <CardHeader className="flex items-center">
              <FaNewspaper className="mr-2 text-3xl" />
              <CardTitle>Subscription Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Count: {userGrowthData.subscriptionUsers}
              </p>
            </CardContent>
          </Card>
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900">
            <CardHeader className="flex items-center">
              < PiMicrosoftTeamsLogoBold className="mr-2 text-3xl" />
              <CardTitle>Total Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-center">
              Count: {teams.length}
              </p>
            </CardContent>
          </Card>
        </div>
          </div>
          <div className="lg:w-1/3 w-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-6 gap-3 text-center lg:my-10 my-3 mx-5 lg:mx-0">
           {/* Card 2: All Team Tasks */}
           <div className="transition-transform transform hover:scale-105 bg-white text-slate-900 h-auto lg:h-[350px] py-5 lg:py-20 px-5 lg:px-10 rounded-xl shadow-xl border">
            <div className="flex flex-col items-center space-y-4">
              {/* < FaTasks className="mr-2 text-3xl" /> */}
              <img className="lg:h-32 h-20" src={ svgImg} alt="" />
              <CardTitle>All Team Tasks</CardTitle>
            </div>
            <div>
              <p className="text-lg font-semibold  text-center pt-5">
              Count: {tasks.length}
              </p>
            </div>
          </div>
         

          {/* Card 3: All Contact Mails */}
          {/* <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900">
            <CardHeader className="flex items-center">
              < FaTasks className="mr-2 text-3xl" />
              <CardTitle>All Contact Mails</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold  text-center">
              Count: {contactUs.length}
              </p>
            </CardContent>
          </Card> */}
          </div>
          </div>
        </div>
      

        {/* Chart Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 my-10 mx-16 gap-5">
          <div className="bg-white rounded-xl shadow-md">

          <SmallBarChart data={userGrowthData} /> {/* Use the Bar chart */}
          </div>
          <PieChartInteraction data={userInteractionData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
