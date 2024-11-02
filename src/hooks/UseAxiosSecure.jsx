import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/redux/slices/authSlice";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401 || errorStatus === 403) {
          dispatch(clearUser());
        }
        return Promise.reject(error);
      }
    );
  }, [token, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;
// Hello
