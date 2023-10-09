import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Handle Change Function
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    if (!data.email || !data.passwordHash) {
      toast("Please fill out all fields.");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:8082/api/v1/login", data)

      .then((response) => {
        console.log(response.data);
        toast("User Login Successfully");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Something went wrong", error);
        toast("Something went wrong");
        setLoading(false);
        setError(error);
      });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold  my-7">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          name="passwordHash"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75 cursor-pointer"
          type="submit"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have account?</p>
        <Link to="/register" className="text-blue-700">
          Register
        </Link>
      </div>
      {error && (
        <p className="text-red-700 text-xl underline">{error.message}</p>
      )}
    </div>
  );
};

export default Login;
