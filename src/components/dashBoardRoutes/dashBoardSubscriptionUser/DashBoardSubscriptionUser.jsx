// import UseAxiosCommon from "@/hooks/UseAxiosCommon";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { MdTurnSharpLeft } from "react-icons/md";

// const DashBoardSubscriptionUser = () => {
//   const axiosCommon = UseAxiosCommon();
//   const user = useSelector((state) => state.auth.user);

//   // Fetching subscription user data
//   const { data: subscription = [], isLoading, isError } = useQuery({
//     queryKey: ["subscription"],
//     queryFn: async () => {
//       const res = await axiosCommon.get("/newsletters");
//       return res.data;
//     },
//   });

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading subscription user data...</div>;
//   }

//   // Handle error state
//   if (isError) {
//     return <div>Error fetching subscription user data.</div>;
//   }

//   return (
//     <div className="p-6">
//       {user ? (

//         <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-300 w-64">

//         <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-300 w-72">

//           <Card className="shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
//             <CardHeader>
//               <div className="text-start space-x-4">

//                 <CardTitle className="text-lg font-semibold pb-7 text-gray-800">Logged-in </CardTitle>

//                 <CardTitle className="text-lg font-semibold pb-7 text-gray-800">Subscription </CardTitle>

//                 <p className="text-5xl font-bold text-black">
//                   {subscription.length}
//                 </p>

//               </div>
//             </CardHeader>
//             <CardContent className='flex'>
//               <span className='text-blue-500 font-bold text-2xl'> <MdTurnSharpLeft /></span>

//               <p className="text-lg font-semibold">Total Logged-in Users</p>

//               <p className="text-lg font-semibold">Total subscription user</p>

//             </CardContent>
//           </Card>

//         </div>
//       ) : (

//         <div>No user logged in.</div>

//       )}
//     </div>
//   );
// };

// export default DashBoardSubscriptionUser;

import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdTurnSharpLeft } from "react-icons/md";

const DashBoardSubscriptionUser = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);


  // Fetching subscription user data
  const {
    data: subscription = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosCommon.get("/newsletters");
      return res.data;
    },
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading subscription user data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching subscription user data.</div>;
  }

  return (
    <div className="p-6">
      {user ? (
        <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-300 w-72">
          <Card className="shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="text-start space-x-4">


                <CardTitle className="text-lg font-semibold pb-7 text-gray-800">Subscription</CardTitle>
                <p className="text-5xl font-bold text-black">{subscription.length}</p>

                <CardTitle className="text-lg font-semibold pb-7 text-gray-800">
                  Subscription
                </CardTitle>
                <p className="text-5xl font-bold text-black">
                  {subscription.length}
                </p>

              </div>
            </CardHeader>
            <CardContent className="flex">
              <span className="text-blue-500 font-bold text-2xl">
                <MdTurnSharpLeft />
              </span>
              <p className="text-lg font-semibold">Total subscription users</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>No user logged in.</div>
      )}
    </div>
  );
};

export default DashBoardSubscriptionUser;
