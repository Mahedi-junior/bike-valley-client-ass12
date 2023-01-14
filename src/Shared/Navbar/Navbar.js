import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useBuyer from "../../hooks/useBuyer";
import useSeller from "../../hooks/useSeller";
import MenuOptions from "./MenuOptions";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isAdmin] = useAdmin(user?.email);

  const menuItems = (
    <>
      <Link className="md:p-4 py-2 block" to="/">
        Home
      </Link>
      <Link className="md:p-4 py-2 block" to="/blogs">
        Blogs
      </Link>
      {user?.uid ? (
        <>
          <Link className="md:p-4 py-2 block" to="/dashboard">
            Dashboard
          </Link>
          <MenuOptions />

          <div className="md:hidden flex flex-col justify-center">
            {isSeller && (
              <>
                <Link
                  to="/dashboard/addproduct"
                  className=" font-semibold hover:bg-gray-100 rounded-xl"
                >
                  Add A Product
                </Link>
                <Link
                  to="/dashboard/myproducts"
                  className=" font-semibold hover:bg-gray-100 rounded-xl"
                >
                  My Products
                </Link>
                <Link
                  to="/dashboard/mybuyers"
                  className=" font-semibold hover:bg-gray-100 rounded-xl"
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
        </>
      ) : (
        <Link className="md:p-4 py-2 block" to="/login">
          Login
        </Link>
      )}
    </>
  );
  return (
    <div
      className={`flex flex-wrap w-full justify-between items-center px-10 py-3 bg-slate-300`}
    >
      <div>
        <Link to="/">
          <h3 className="text-3xl font-bold">Bike Valley</h3>
        </Link>
      </div>
      <svg
        onClick={() => setOpen(!open)}
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="h-6 w-6 cursor-pointer md:hidden flex"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <div
        className={`${
          open ? "flex" : "hidden"
        }  w-full md:flex md:items-center md:w-auto text-lg`}
      >
        <ul className="md:flex md:justify-between md:items-center md:pt-0">
          {menuItems}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
