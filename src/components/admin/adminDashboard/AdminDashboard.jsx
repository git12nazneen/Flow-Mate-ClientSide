import UpperNavigation from "../elements/upperNavigation/UpperNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import SmallBarChart from "../elements/upperNavigation/lineChart/SmallLineChart";
import PieChartInteraction from "../elements/pieChart/PieChartInteraction";
import { useSelector } from "react-redux";
import PageHeader from "@/components/pageHeader/PageHeader";
import one from '../../../assets/icon/1.png';
import two from '../../../assets/icon/2.png';
import three from '../../../assets/icon/3.png';
import four from '../../../assets/icon/4.png';
import five from '../../../assets/icon/5.png';
import six from '../../../assets/icon/6.png';
import seven from '../../../assets/icon/7.png';
import eight from '../../../assets/icon/8.png';
import AllUsersLineChart from "@/components/dashBoardRoutes/dashBoardHome/allUsersLineChart/allUsersLineChart";

const AdminDashboard = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  // Fetch data using React Query
  const { data: paid = [], error: paidError } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosCommon.get("/payments/payment");
      return res.data;
    },
  });

  const { data: loggedInUsers = [], error: loggedInError } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosCommon.get("users/get");
      return res.data;
    },
  });

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
    paidUsers: paid.length,
    loggedInUsers: loggedInUsers.length,
    subscriptionUsers: subscription.length,
  };

  const userInteractionData = {
    contactUs: contactUs.length,
    tasks: tasks.length,
    teams: teams.length,
  };

  return (
    <div className="mx-auto lg:pb-5">
      <UpperNavigation />
      <div className="lg:my-8">
        <div className="mx-5">
          <PageHeader title="FlowMate Admin Dashboard" breadcrumb={`Hello ${user.displayName}, Welcome to the admin dashboard`} />
        </div>
        
        <div className="flex lg:flex-row flex-col justify-between px-10 mx-auto me-5">
          <div className="lg:w-2/3 w-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-3 text-center mx-5 my-10">
              <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900 mb-10 lg:mb-0">
                <CardHeader className="flex items-center">
                  <img src={seven} className="h-12 w-12" alt="" />
                  <CardTitle>Paid Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    Count: {userGrowthData.paidUsers}
                  </p>
                </CardContent>
              </Card>

              {/* Login User Section */}
              <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900 shadow-xl mb-10 lg:mb-0">
                <CardHeader className="flex items-center">
                  <img src={five} className="h-12 w-12" alt="" />
                  <CardTitle>Login Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    Count: {userGrowthData.loggedInUsers}
                  </p>
                </CardContent>
              </Card>

              {/* Subscription User Section */}
              <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900 mb-10 lg:mb-0">
                <CardHeader className="flex items-center">
                  <img src={eight} className="h-12 w-12" alt="" />
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
                  <img src={six} className="h-12 w-12" alt="" />
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
          <div className="lg:w-1/3 w-auto h-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-6 gap-3 text-center lg:my-10 my-3 mx-5 lg:mx-0">
              <div className="transition-transform transform hover:scale-105 bg-white text-slate-900 h-auto lg:h-[385px] py-5 px-5 lg:px-10 rounded-xl shadow-xl border flex flex-col justify-center items-center">
                <div className="flex flex-col items-center space-y-4">
                  <img src={four} className="h-12 lg:h-40 w-auto" alt="" />
                  <CardTitle>All Team Tasks</CardTitle>
                </div>
                <div>
                  <p className="text-lg font-semibold text-center pt-5">
                    Count: {tasks.length}
                  </p>
                </div>
              </div>           
            </div>
          </div>
        </div>
      
        {/* Chart Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 my-10 mx-16 gap-5">
          <div className="bg-white rounded-xl shadow-md mb-10 lg:mb-0">

            <SmallBarChart data={userGrowthData} /> {/* Use the Bar chart */}
          </div>
          <PieChartInteraction data={userInteractionData} />
        </div>
        <div className="me-[60px] bg-white py-10 rounded-lg shadow-md mx-10">
          <AllUsersLineChart
            subscriptionUsers={userGrowthData.subscriptionUsers}
            loggedUsers={userGrowthData.loggedInUsers}
            paidUsers={userGrowthData.paidUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
