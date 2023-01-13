import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useBuyer from "../../../hooks/useBuyer";
import useSeller from "../../../hooks/useSeller";
import "./DashboardSidebar.css";

const DashboardSidebar = () => {
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [open, setOpen] = useState(false);
  return (
    <div className=" min-h-screen md:flex" data-dev-hint="container">
      <aside
        id="sidebar"
        className=" text-gray-800 bg-white md:w-64 w-44 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transhtmlForm md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between hidden overflow-y-auto"
        data-dev-hint="sidebar; px-0 htmlFor frameless; px-2 htmlFor visually inset the navigation md:block"
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div htmlFor having an extra footer navigation"
        >
          {isSeller && (
            <>
              <Link
                to="/dashboard/addproduct"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                Add A Product
              </Link>
              <Link
                to="/dashboard/myproducts"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                My Products
              </Link>
              <Link
                to="/dashboard/mybuyers"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                My Buyers
              </Link>
            </>
          )}
          {isBuyer && (
            <>
              <Link
                to="/dashboard/myorders"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                My Orders
              </Link>
              <Link
                to="/dashboard/wishlist"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                My Wishlist
              </Link>
            </>
          )}
          {isAdmin && (
            <>
              <Link
                to="/dashboard/allseller"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                All Sellers
              </Link>
              <Link
                to="/dashboard/allbuyer"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                All Buyers
              </Link>
              <Link
                to="/dashboard/myorders"
                className="pl-10 font-semibold hover:bg-gray-100 py-2 rounded-xl"
              >
                Reported Items
              </Link>
            </>
          )}
        </div>
      </aside>

      <main id="content" className="flex-1 p-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardSidebar;
