import { Link } from "react-router-dom";


const Login = () => {

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#000000] to-[#7F7F7F]">
        <div className="bg-[#FBFBFB]/76 p-8 rounded-lg shadow-2xs border border-gray-200 w-106 flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-center  text-gray-800">
            LOG IN
          </h2>
          <form className="flex flex-col gap-4">
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
               
                className={`w-full px-4 py-2 border border-white rounded-lg `}
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
               
                className="w-full px-4 py-2 border border-white rounded-lg "
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