import { Link, useNavigate } from "react-router-dom";
import signUpBg from "@/assets/signup.jpg";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  createUser,
  updateUserProfile,
  signInWithGoogle,
} from "../../redux/slices/authSlice";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const axiosCommon = UseAxiosCommon();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { password, confirmPassword, email, name, photo } = data;

    // Regular expression for password validation
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password must be the same!",
      });
      reset();
      return;
    }

    // Validate password against regex
    if (!regex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be at least 7 characters long!",
      });
      reset();
      return;
    }

    // Create user data object
    const userData = {
      email,
      password,
    };

    // Dispatch registration action
    dispatch(createUser(userData))
      .unwrap()
      .then(() => {
        // Dispatch updateUserProfile action with name and photo
        dispatch(updateUserProfile({ name, photo }))
          .unwrap()
          .then(() => {
            // Save user information to the database
            const userInfo = {
              email,
              name,
              role: "member",
              photo,
              status: "active",
              password,
              teamName: [],
            };

            axiosCommon
              .post("/users/create", userInfo)
              .then((res) => {
                console.log('Response from saving user:', res);

                if (res.data.insertedId) {
                  Swal.fire({
                    icon: "success",
                    title: "Congratulations",
                    text: "Your account has been created successfully!",
                  });
                  reset();
                  navigate(location?.state?.from || "/");
                }
              })
              .catch((error) => {
                console.error("Error saving user information:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Failed to save user information in the database!",
                });
                reset();
              });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message || "Profile update failed!",
            });
            reset();
          });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || "Registration failed!",
        });
        reset();
      });
  };

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

  return (
    <div className="">
      <section className="">
        <div className="flex justify-center">
          <div
            className="hidden bg-cover lg:block lg:w-[28%]"
            style={{
              backgroundImage:
                `url(${signUpBg})`,
            }}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-3 mx-auto lg:px-8 lg:w-[72%] ">
            <div className="w-full text">
              <img
                className="w-auto h-20 mx-auto"
                src="https://i.ibb.co.com/9ncLQzX/newlogo-removebg-preview.png"
                alt=""
              />
              <h1 className="text-2xl font-semibold tracking-wider  capitalize  text-center">
                Get your free account now.
              </h1>

              <p className="mt-4 text-justify">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
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

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 "
              >
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm  font-bold">Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="John Doe"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600   dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.name && <span>This field is required</span>}
                </div>

                <div>
                  <label className="block mb-2 text-sm ">Photo url</label>
                  <input
                    {...register("photo", { required: true })}
                    type="url"
                    placeholder="https://www.example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.photo && <span>This field is required</span>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="johnsnow@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && <span>This field is required</span>}
                </div>

                <div>
                  <label className="block mb-2 text-sm ">Password</label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && <span>This field is required</span>}
                </div>

                <div>
                  <label className="block mb-2 text-sm ">
                    Confirm password
                  </label>
                  <input
                    {...register("confirmPassword", { required: true })}
                    type="password"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.confirmPassword && (
                    <span>This field is required</span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="md:col-span-2 w-full  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00053d] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <span>Sign Up</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </form>
              <div className="text-amber-600 text-center my-3">
                Already have an account?
              </div>
              <div className="flex  items-center justify-between mt-4 ">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4 "></span>

                <Link
                  to={"/login"}
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or login in
                </Link>

                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
