import DashBoardNav from "@/components/dashBoardShared/dashBoardNav/DashBoardNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearUser, setLoading, setUser } from "../redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { PacmanLoader } from "react-spinners";




const DashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  console.log(user,loading);
  

  useEffect(() => {
    // Set loading to true initially
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      } else {
        dispatch(clearUser());
      }
      // Set loading to false once auth state is determined
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
   <PacmanLoader color="#2196F3" size={50} />
      </div>
    );
  }
  return (
    // flex lg:flex-row flex-col
    <div className="min-h-screen flex  bg-gray-100 ">
    
        <DashBoardNav />
      
      <div className="flex-1 overflow-y-auto h-screen">
  
        <Outlet context={{ loading }}  />
      </div>
    </div>
  );
};

export default DashBoard;
