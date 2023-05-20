import { PasswordInput, TextInput, Textarea } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { hasLength, useForm } from "@mantine/form";
import { Loader } from "@mantine/core";
import { useCreateContactMutation } from "../store/api/contactApi";
import Cookies from "js-cookie";

const CreateContact = () => {
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [createContact, { isLoading }] = useCreateContactMutation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }),
      address: (value) =>
        value.length < 3 ? "address must be above 3 letters" : null,
    },
  });

  return (
    <div className=" flex justify-center h-[650px] sm:h-screen items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await createContact({ token, data: values }); // must write {token , data: values}
            console.log(data);
            console.log(values);
            if (data?.success) nav("/dashboard");
          } catch (err) {
            console.error(err);
          }
        })}
        className="sm:w-96 w-full flex flex-col gap-6 shadow-lg p-10"
      >
        <h1 className=" text-2xl font-semibold">Create Contact</h1>
        <TextInput
          placeholder="Enter your name"
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />
        <TextInput
          placeholder="Enter your phone"
          {...form.getInputProps("phone")}
        />
        <Textarea
          placeholder="Enter your address"
          {...form.getInputProps("address")}
        />
        <button
          type="submit"
          disabled={isLoading && true}
          className=" border py-[6px] bg-blue-500 text-white rounded-md flex justify-center"
        >
          {isLoading ? <Loader color="grey" size="sm" /> : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
