import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loader from "../../Shared/Loader/Loader";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { loading, setLoading, gLoading, setGloading, signIn, providerLogin } =
    useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        fetch(`http://localhost:5000/jwt?email=${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            const token = data.accessToken;
            localStorage.setItem("accessToken", token);
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        // navigate(from, {replace: true})

        const user = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          role: "Buyer",
        };

        fetch(`http://localhost:5000/users/${loggedUser?.email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            fetch(`http://localhost:5000/jwt?email=${loggedUser?.email}`)
              .then((res) => res.json())
              .then((data) => {
                const token = data.accessToken;
                localStorage.setItem("accessToken", token);
                navigate(from, { replace: true });
              });
          });
      })
      .catch((err) => {
        console.log(err.message);
        setGloading(false);
      });
  };

  return (
    <div className="my-10 px-10">
      <h3 className="text-3xl font-bold text-center mb-8">Welcome Back!</h3>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="lg:max-w-md md:max-w-md max-w-sm mx-auto"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          />
          <button
            className={`${
              loading ? "bg-white" : "bg-black"
            } rounded-full text-white font-semibold text-xl -tracking-tight py-3`}
          >
            {loading ? <Loader /> : "Log In"}
          </button>
        </div>
        <p className="text-base text-center my-2">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Create
          </Link>
        </p>
      </form>

      <div className="lg:max-w-md md:max-w-md max-w-sm mx-auto mt-2.4">
        <button
          onClick={handleGoogleLogin}
          className="rounded-full text-black border border-black font-semibold text-xl -tracking-tight py-3 w-full"
        >
          {gLoading ? <Loader /> : "Login With Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;
