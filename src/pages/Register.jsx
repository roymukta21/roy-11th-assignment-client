import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Register = () => {
  useTitle("Register");
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-600">Email is required</p>}

        <input
          type="password"
          className="input input-bordered w-full mb-3"
          placeholder="Password (min 6 characters)"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <p className="text-red-600">
            Password must be at least 6 characters
          </p>
        )}

        <button className="btn btn-primary w-full">Register</button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
