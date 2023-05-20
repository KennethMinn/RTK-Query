import { PasswordInput, TextInput } from "@mantine/core";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useRegisterMutation } from "../store/api/authApi";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password_confirmation, setPasswordConfirmation] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  // const registerHandler = async (e) => {
  //   e.preventDefault();
  // try {
  //   const user = { name, email, password, password_confirmation };
  //   const { data } = await register(user);
  //   console.log(data);
  //   console.log(user);
  //   if (data?.success) nav("/login");
  // } catch (err) {
  //   console.error(err);
  // }
  // };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "password must have at least 8 characters" : null,
      password_confirmation: (value) =>
        value.length < 8 ? "password must have at least 8 characters" : null,
    },
  });

  return (
    <div className=" flex justify-center h-[650px] sm:h-screen items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            console.log(data);
            console.log(values);
            if (data?.success) nav("/login");
          } catch (err) {
            console.error(err);
          }
        })}
        className="sm:w-96 w-full flex flex-col gap-6 shadow-lg p-10"
      >
        <h1 className=" text-2xl font-semibold">Register</h1>
        <TextInput
          placeholder="Enter your name"
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Enter your password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="confirm password"
          {...form.getInputProps("password_confirmation")}
        />
        <div className=" flex gap-2 items-center">
          <p className=" text-sm opacity-70">Already have an account?</p>
          <Link to="/login">
            <span className="cursor-pointer opacity-80 text-sm">Log in</span>
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading && true}
          className=" border py-[6px] bg-blue-500 text-white rounded-md flex justify-center"
        >
          {isLoading ? <Loader color="grey" size="sm" /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
