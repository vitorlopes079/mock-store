import { loginUser } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authState = useSelector((state) => state.auth);
  const onSubmit = (data) => {
    const { email, password } = data;

    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="input-style peer"
          placeholder=" "
          autoComplete="username"
        />
        <label
          htmlFor="email"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Email:
        </label>
      </div>

      {/* Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="input-style peer"
          placeholder=" "
          autoComplete="current-password"
        />
        <label
          htmlFor="password"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Password:
        </label>
      </div>

      <div className="flex flex-col justify-start items-start">
        {/* Display error message */}
        {authState.error && (
          <div className="text-red-500 text-center mt-2">{authState.error}</div>
        )}
        {errors.email && (
          <span className="text-red-400 font-bold mt-2">
            {" "}
            Email field is required
          </span>
        )}
        {errors.password && (
          <span className="text-red-400 font-bold mt-2">
            Password field is required
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-1 transition ease-in duration-200  w-full rounded-lg hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
