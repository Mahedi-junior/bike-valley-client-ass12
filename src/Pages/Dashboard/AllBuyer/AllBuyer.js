import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../Shared/Loader/Loader";

const AllBuyer = () => {
  const { user } = useContext(AuthContext);
  useTitle("All Buyer");
  const {
    data: allbuyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allbuyers", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://bike-valley-server.vercel.app/users/allbuyers?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.data;
      return data;
    },
  });

  const handleDeleteBuyer = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://bike-valley-server.vercel.app/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            console.log(data);
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {allbuyers.length === 0 ? (
        <h2 className="mb-4 text-4xl font-semibold leading-tight text-gray-800 text-center">
          Buyers Does Not Exists!
        </h2>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800">
            All Buyers
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="dark:bg-gray-700">
                <tr className="text-left">
                  <th className="p-3">No</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allbuyers.map((buyer, idx) => (
                  <tr
                    key={buyer._id}
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td className="p-3">
                      <p>{idx + 1}</p>
                    </td>
                    <td className="p-3">
                      <p>{buyer.name}</p>
                    </td>
                    <td className="p-3">
                      <p>{buyer.email}</p>
                    </td>
                    <td className="p-3">
                      <p>{buyer.role}</p>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteBuyer(buyer._id)}
                        className="bg-red-600 text-white py-1 px-2 rounded-xl hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBuyer;
