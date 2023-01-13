import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loader from "../../Shared/Loader/Loader";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "Please Select Your Role",
  });

  const {
    createUser,
    updateUser,
    providerLogin,
    loading,
    setLoading,
    gLoading,
    setGloading,
  } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleName = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const handlePassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const handleRole = (e) => {
    setUserInfo({ ...userInfo, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = e.target.img.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const photo = data.data.display_url;

        // Create User Now
        createUser(userInfo.email, userInfo.password)
          .then((result) => {
            const loggedUser = result.user;
            updateUser(userInfo.name, photo)
              .then(() => {
                // navigate(from, {replace: true})

                const user = {
                  name: loggedUser.displayName,
                  email: loggedUser.email,
                  role: userInfo.role,
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
                    console.log(data);
                    fetch(
                      `http://localhost:5000/jwt?email=${loggedUser?.email}`
                    )
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
                setLoading(false);
              });
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
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
        setGloading(false);
      });
  };

  return (
    <div className="my-10 px-10">
      <h3 className="text-3xl font-bold text-center mb-8">Create an account</h3>

      <form
        onSubmit={handleSubmit}
        className="lg:max-w-md md:max-w-md max-w-sm mx-auto"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            required
            placeholder="Full Name"
            value={userInfo.name}
            onChange={handleName}
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={userInfo.email}
            onChange={handleEmail}
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={userInfo.password}
            onChange={handlePassword}
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          />
          <input
            type="file"
            name="img"
            required
            placeholder="Photo"
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          />
          <select
            value={userInfo.role}
            required
            onChange={handleRole}
            className="outline-none border border-gray-500 focus:border-black pl-4 py-3 rounded-full"
          >
            <option value="Please Select Your Role" selected disabled>
              Please Select Your Role
            </option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
          <button
            className={`${
              loading ? "bg-white" : "bg-black"
            } rounded-full text-white font-semibold text-xl -tracking-tight py-3 `}
          >
            {loading ? <Loader /> : "Create"}
          </button>
        </div>
        <p className="text-base text-center lg:mt-2 md:mt-2 my-4">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
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

export default Register;
