import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";

const Newsletters = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosCommon = UseAxiosCommon();

  const onSubmit = (data) => {
    const { email } = data;
    axiosCommon
      .post("/newsletter", { email })
      .then((res) => {
        if (
          res.data.message ===
          "You have already been subscribed to our newsletter"
        ) {
          Swal.fire({
            icon: "info",
            title: "Already Subscribed",
            text: "You have already been subscribed to our newsletter.",
            showConfirmButton: true,
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Thank you for subscribing",
            text: "We will keep you updated with our latest news and updates.",
            showConfirmButton: true,
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });

    reset();
  };

  return (
    <div id="subscribe" className="lg:max-w-7xl mx-auto my-1 py-3">
      <div className="mx-auto max-w-3xl text-center pt-12 pb-5 md:pb-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Stay Connected <span className="text-blue-500">FlowMate</span>
        </h1>
        <p className="text-center text-gray-500">
          Sign up to receive our latest news, updates, and exclusive content.
        </p>
      </div>
      <div
        className="py-3 mt-4 bg-gray-500 transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
        style={{
          backgroundImage:
            "url('https://www.dooly.ai/wp-content/uploads/2023/11/Why-Sales-Team-Collaboration-Matters-for-Improving-Deal-Efficiency-1.jpg')",
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
        }}
      >
        <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
          <h1 className="text-5xl antialiased font-semibold leading-none text-center text-gray-100">
            Get Our Updates
          </h1>
          <p className="pt-2 pb-8 text-xl antialiased text-center text-gray-100">
            Subscribe to our newsletter and get our latest updates. Get
            collaborate with us.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
              aria-label="Email"
              placeholder="example@email.com"
              className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
            />
            <button
              type="submit"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-[#17ACAC] hover:bg-black text-white"
            >
              Subscribe
            </button>
          </form>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletters;
