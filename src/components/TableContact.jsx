import React from "react";
import { Table } from "@mantine/core";
import Cookies from "js-cookie";
import {
  useGetContactQuery,
  useGetDeleteMutation,
} from "../store/api/contactApi";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Input } from "@mantine/core";

const TableContact = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  console.log(data);
  const nav = useNavigate();
  const [getDelete] = useGetDeleteMutation();

  if (isLoading)
    return (
      <div className=" flex h-screen justify-center items-center">
        <Loader size="xl" color="grey" variant="bars" />
      </div>
    );

  return (
    <>
      <div className=" my-5 flex gap-6">
        <button
          onClick={() => nav("/create")}
          className=" bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Create +
        </button>
        <Input variant="filled" className=" w-40" placeholder="Search"/>
      </div>
      <Table className=" mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data?.contacts.data.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.email === null ? "example@gamil.com" : d.email}</td>
              <td>{d.phone}</td>
              <td>{d.address === null ? "Yangon" : d.address}</td>
              <td
                className=" cursor-pointer text-red-600"
                onClick={() => console.log(`delete ${d.name}`)}
              >
                delete
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableContact;
