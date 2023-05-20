import React from "react";
import { Table } from "@mantine/core";
import Cookies from "js-cookie";
import { useGetContactQuery } from "../store/api/contactApi";
import { Loader } from "@mantine/core";

const TableContact = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  console.log(data);

  if (isLoading)
    return (
      <div className=" flex h-screen justify-center items-center">
        <Loader size="xl" color="grey" variant="bars" />
      </div>
    );

  return (
    <>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableContact;
