import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await login(loginInfo);
    if (response.status === 201) {
      const data = await response.json();
      const accessToken = data.accessToken;
      const user = data.user;
      handleLogin(accessToken, user);
      navigate("/main");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-[#000000] to-[#7F7F7F]">
        <div className="bg-[#FBFBFB]/76 p-8 rounded-lg shadow-2xs border border-gray-200 w-106 flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-center  text-gray-800">
            LOG IN
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginInfo.username}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg `}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginInfo.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-800/50 hover:text-white transition cursor-pointer "
            >
              Let's Start!
            </button>
          </form>
          <p className="w-full flex justify-center gap-2 text-sm">
            Don't have an account?
            <Link to="/">
              <span className="text-stone-700">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
