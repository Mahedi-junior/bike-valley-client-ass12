import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: myBikes, isLoading } = useQuery({
    queryKey: ["myBikes", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/myBikes?email=${user?.email}`
      );
      const data = await res.data;
      return data;
    },
  });

  const handleRunAds = (phone) => {
    const url = `http://localhost:5000/ads?id=${phone?._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.upsertedCount > 0) {
          toast.success("Ads Campaign Running!");
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {myBikes.length === 0 ? (
        <h2 className="mb-4 text-4xl font-semibold leading-tight text-gray-800 text-center">
          You Won't Have Any Product Yet!
        </h2>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800">
            My Products
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
                  <th className="p-3">Image</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date Added</th>
                  <th className="p-3">Advertise</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {myBikes.map((phone, idx) => (
                  <tr
                    key={phone._id}
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td className="p-3">
                      <p>{idx + 1}</p>
                    </td>
                    <td className="p-3">
                      <img
                        className="w-10 rounded-md"
                        src={phone.image}
                        alt=""
                      />
                    </td>
                    <td className="p-3">
                      <p>{phone.name}</p>
                    </td>
                    <td className="p-3">
                      <p>${phone.resalePrice}</p>
                    </td>
                    <td className="p-3">
                      <p>{phone.location}</p>
                    </td>
                    <td className="p-3">
                      <p>{phone.date}</p>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleRunAds(phone)}
                        className="bg-white text-gray-800 py-1 px-2 rounded-xl hover:bg-gray-200"
                      >
                        Run Ads
                      </button>
                    </td>
                    <td className="p-3">
                      <span className="bg-white text-gray-800 py-1 px-2 rounded-xl hover:bg-gray-200">
                        Available
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="bg-red-600 text-white py-1 px-2 rounded-xl hover:bg-red-700">
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

export default MyProducts;
