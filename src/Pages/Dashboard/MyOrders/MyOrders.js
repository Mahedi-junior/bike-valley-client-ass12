import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: myorders, isLoading } = useQuery({
    queryKey: ["myorders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myorders?email=${user?.email}`
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {myorders.length === 0 ? (
        <h2 className="mb-4 text-4xl font-semibold leading-tight text-gray-800 text-center">
          Sellers Does Not Exists!
        </h2>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-800">
            My Orders
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Payment</th>
                </tr>
              </thead>
              <tbody>
                {myorders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td className="p-3">
                      <p>{idx + 1}</p>
                    </td>
                    <td className="p-3">
                      <img src={order.image} className="w-10" alt="" />
                    </td>
                    <td className="p-3">
                      <p>{order.productName}</p>
                    </td>
                    <td className="p-3">
                      <p>{order.price}</p>
                    </td>
                    <td className="p-3">
                      {!order.paid && (
                        <Link to={`/dashboard/payment/${order.bookingId}`}>
                          <button className="bg-indigo-600 text-white py-1 px-2 rounded-xl hover:bg-indigo-700">
                            Pay
                          </button>
                        </Link>
                      )}
                      {order.paid && (
                        <button className="bg-green-600 text-white py-1 px-2 rounded-xl hover:bg-green-700">
                          Paid
                        </button>
                      )}
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

export default MyOrders;
