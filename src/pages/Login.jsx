import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Invalid Email or Password",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-600">Email is required</p>}

        <input
          type="password"
          className="input input-bordered w-full mb-3"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-600">Password is required</p>
        )}

        <button className="btn btn-primary w-full">Login</button>

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
