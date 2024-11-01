import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { signInWithEmail, signInWithGoogle } from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginBg from "@/assets/login.jpg";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosCommon = UseAxiosCommon();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle())
      .unwrap()
      .then((userCredential) => {
        const user = userCredential;
        // console.log("User credentials:", user);

        // Prepare user information for the database
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "member",
          photo: user.photoURL,
          status: "active",
          password: "",
          teamName: [],
        };

        // Log the userInfo object for debugging purposes
        console.log("User Info:", userInfo);

        // Save user information to the database
        axiosCommon
          .post("/users/create", userInfo)
          .then((res) => {
            console.log("Response from saving user:", res);

            if (res.data) {
              Swal.fire({
                icon: "success",
                title: "Congratulations",
                text: `Welcome ${user.displayName}! You have successfully! Login with Google`,
              });

              navigate(location?.state?.from || "/");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to create user account. Please try again!",
              });
            }
          })
          .catch((error) => {
            console.error("Error saving user information:", error);

            if (
              error.response &&
              error.response.data.message === "User already exists"
            ) {
              Swal.fire({
                icon: "success",
                title: "Welcome back!",
                text: `You Were already registered ${user.displayName}!`,
              });
              navigate("/");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to save user information!",
              });
            }
          });

        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: `Welcome back ${user.displayName}!`,
        });

        navigate("/");
      })
      .catch((err) => {
        console.error("Error signing in with Google:", err);

        const errorMessage = err.message || "Google Sign-In failed!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };

  const onSubmit = async (data) => {
    try {

      const userCredential = await dispatch(signInWithEmail(data)).unwrap();

      const response = await axiosCommon.post("/users/login", data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Signed in successfully with email!",
        });
        navigate("/"); // Navigate after successful login
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message || "Sign-In failed!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Sign-In failed!",
      });
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen text-[#07101b]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden  rounded-lg shadow-lg  lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/JHM1Nd1/2304-i203-047-S-m004-c13-keys-locks-realistic.jpg')",
            }}
          ></div>

          <div className="w-full px-6 lg:py-8 py-3 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-20"
                src="https://i.ibb.co.com/9ncLQzX/newlogo-removebg-preview.png"
                alt=""
              />
            </div>

            <p className="mt-3 text-xl text-center text-[#132f50] font-bold">
              Welcome back!
            </p>

            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center mt-4  transition-colors duration-300 transform border rounded-lg dark:border-gray-700  hover:bg-gray-50 dark:hover:bg-gray-600 w-full "
            >
              <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>

              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Google
              </span>
            </button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or login with email
              </a>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-[#112A46]"
                  htmlFor="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2  border rounded-lg  dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required </span>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-[#112A46]"
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    Forget Password?
                  </a>
                </div>

                <input
                  id="loggingPassword"
                  {...register("password", { required: true })}
                  className="block w-full px-4 py-2   border rounded-lg dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00053d] rounded-lg hover:bg-blue-400  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <Link
                to={"/signup"}
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or sign up
              </Link>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
