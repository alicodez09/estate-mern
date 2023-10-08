import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const [data, setData] = useState({});
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
    console.log(data);

    axios
      .post("http://localhost:8082/api/v1/register", data)
      .then((response) => {
        console.log("User Created Successfully", response.data);
        toast("User Created Successfully");
      })
      .catch((error) => {
        console.error("Something went wrong", error);
        toast("Something went wrong");
      });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold  my-7">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          name="username"
          onChange={handleChange}
        />
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
          name="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75 cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/login" className="text-blue-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
