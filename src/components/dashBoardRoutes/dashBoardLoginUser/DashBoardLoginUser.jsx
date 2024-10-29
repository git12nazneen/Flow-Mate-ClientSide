import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdTurnSharpLeft } from "react-icons/md";
const DashBoardLoginUser = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  // Fetching user data
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosCommon.get("users/get");
      return res.data;
    },
    onError: (err) => setError(err.message),
  });

  // Loading state while fetching user data
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  // Error state handling

  if (isError) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-6">
      {user ? (
        <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-300 w-64">
          <Card className="shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="text-start space-x-4">
                <CardTitle className="text-lg font-semibold pb-7 text-gray-800">
                  Logged-in{" "}
                </CardTitle>
                <p className="text-5xl font-bold text-black">{data.length}</p>
              </div>
            </CardHeader>
            <CardContent className="flex">
              <span className="text-blue-500 font-bold text-2xl">
                {" "}
                <MdTurnSharpLeft />
              </span>
              <p className="text-lg font-semibold">Total Logged-in Users</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>No user logged in.</div>
      )}
    </div>
  );
};

export default DashBoardLoginUser;
