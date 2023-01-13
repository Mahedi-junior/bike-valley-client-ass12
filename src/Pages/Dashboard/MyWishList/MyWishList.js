import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/wishlist?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(wishlist);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {wishlist.length === 0 ? (
        <h2 className="mb-4 text-4xl font-semibold leading-tight text-gray-800 text-center">
          You Won't Have Any Wishlist Yet!
        </h2>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800">
            My Wishlist
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
                  <th className="p-3">Status</th>
                  <th className="p-3">Payment</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((list, idx) => (
                  <tr
                    key={list._id}
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td className="p-3">
                      <p>{idx + 1}</p>
                    </td>
                    <td className="p-3">
                      <img
                        className="w-10 rounded-md"
                        src={list.image}
                        alt=""
                      />
                    </td>
                    <td className="p-3">
                      <p>{list.name}</p>
                    </td>
                    <td className="p-3">
                      <p>${list.resalePrice}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.location}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.date}</p>
                    </td>
                    <td className="p-3">
                      <span className="bg-white text-gray-800 py-1 px-2 rounded-xl hover:bg-gray-200">
                        Available
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="bg-indigo-600 text-white py-1 px-2 rounded-xl hover:bg-indigo-700">
                        Pay
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

export default MyWishList;
