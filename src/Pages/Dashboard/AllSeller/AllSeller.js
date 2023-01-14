import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../Shared/Loader/Loader";

const AllSeller = () => {
  useTitle("All Seller");

  const {
    data: allseller = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allsellers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bike-valley-server.vercel.app/users/allsellers"
      );
      const data = await res.data;
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const handleDeleteSeller = (id) => {
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

  const handleVerify = (seller) => {
    fetch(
      `https://bike-valley-server.vercel.app/verifySeller?email=${seller?.email}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${seller.name} is a verified seller!`);
        console.log(data);
        refetch();
      });
  };

  return (
    <div>
      {allseller.length === 0 ? (
        <h2 className="mb-4 text-4xl font-semibold leading-tight text-gray-800 text-center">
          Sellers Does Not Exists!
        </h2>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800">
            All Seller
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
                  <th className="p-3">Verify</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allseller.map((seller, idx) => (
                  <tr
                    key={seller._id}
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td className="p-3">
                      <p>{idx + 1}</p>
                    </td>
                    <td className="p-3">
                      <p>{seller.name}</p>
                    </td>
                    <td className="p-3">
                      <p>{seller.email}</p>
                    </td>
                    <td className="p-3">
                      <p>{seller.role}</p>
                    </td>
                    <td className="p-3">
                      {seller.status === "verified" ? (
                        <button className="bg-green-600 text-white py-1 px-2 rounded-xl hover:bg-green-700">
                          Verified
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(seller)}
                          className="bg-indigo-600 text-white py-1 px-2 rounded-xl hover:bg-indigo-700"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteSeller(seller._id)}
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

export default AllSeller;
