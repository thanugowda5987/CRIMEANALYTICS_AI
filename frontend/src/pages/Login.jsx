import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Mail } from "lucide-react";

import Button from "../components/common/Button";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../api/authApi";


const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  // Demo account autofill
  const fillDemoLogin = () => {
    setEmail("admin@ksp.com");
    setPassword("123456");
    setError("");
  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const res = await loginUser({
        email,
        password
      });


      const { token, user } = res.data.data;


      login(user, token);


      navigate("/dashboard");


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed. Check your credentials."
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-bgLight dark:bg-gray-900 px-4">


      <motion.div

        initial={{
          opacity:0,
          y:12
        }}

        animate={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:0.4
        }}

        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-card shadow-soft border border-borderLight dark:border-gray-700 p-8"

      >


        {/* Logo */}

        <div className="flex flex-col items-center mb-6">


          <div className="w-14 h-14 rounded-2xl bg-button-gradient text-white flex items-center justify-center mb-3">

            <Shield size={26}/>

          </div>



          <h1 className="font-heading text-xl font-semibold text-textDark dark:text-white">

            KSP Crime Analytics Login

          </h1>


          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

            Authorized personnel only

          </p>


        </div>




        {/* Error */}

        {error && (

          <div className="bg-danger/10 text-danger text-sm px-4 py-2.5 rounded-xl mb-4">

            {error}

          </div>

        )}




        <form onSubmit={handleSubmit} className="space-y-4">



          {/* Email */}

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />


            <input

              type="email"

              required

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              placeholder="Email address"

              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLight dark:border-gray-700 bg-bgLight dark:bg-gray-700 text-sm text-textDark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"

            />


          </div>




          {/* Password */}

          <div className="relative">


            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />


            <input

              type="password"

              required

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              placeholder="Password"

              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLight dark:border-gray-700 bg-bgLight dark:bg-gray-700 text-sm text-textDark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"

            />


          </div>




          {/* Login Button */}

          <Button

            type="submit"

            variant="primary"

            className="w-full"

            disabled={loading}

          >

            {loading ? "Signing in..." : "Sign In"}

          </Button>



        </form>




        {/* Demo Login */}

        <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100">


          <p className="text-sm font-semibold text-gray-700 mb-2">

            Demo Account

          </p>



          <p className="text-sm text-gray-600">

            Email:

            <span className="ml-1 font-semibold text-blue-700">

              admin@ksp.com

            </span>

          </p>



          <p className="text-sm text-gray-600">

            Password:

            <span className="ml-1 font-semibold text-blue-700">

              123456

            </span>

          </p>




          <button

            type="button"

            onClick={fillDemoLogin}

            className="mt-3 w-full py-2 rounded-lg bg-white border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition"

          >

            Use Demo Account

          </button>



        </div>



      </motion.div>


    </div>

  );

};


export default Login;