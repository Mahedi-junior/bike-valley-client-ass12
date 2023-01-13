import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineReportGmailerrorred, MdVerified } from "react-icons/md";
import { TbJewishStar } from "react-icons/tb";
import { AuthContext } from "../../contexts/AuthProvider";

const ItemsCard = ({ phone, openModal, setBookingProduct }) => {
  const {
    name,
    image,
    location,
    resalePrice,
    originalPrice,
    used,
    date,
    sellerName,
  } = phone;
  const { user } = useContext(AuthContext);

  const handleWishlist = (phone) => {
    fetch(`http://localhost:5000/wishlist?id=${phone._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.upsertedCount) {
          toast.success("Added to your wishlist!");
        }
      });
  };

  return (
    <div className="mx-auto p-6 max-w-sm w-full rounded-xl shadow-xl">
      <div className="overflow-hidden">
        <img
          className="mx-auto hover:scale-110 duration-200 w-37"
          src={image}
          alt=""
        />
      </div>
      <div className="">
        <div className="mb-4">
          <h4 className="text-xl font-bold">{name}</h4>
          <p>
            Location:{" "}
            <span className="text-gray-800 font-semibold">{location}</span>
          </p>
          <p>
            Original Price:{" "}
            <span className="text-gray-800 font-semibold">
              ${originalPrice}
            </span>
          </p>
          <p>
            Resale Price:{" "}
            <span className="text-gray-800 font-semibold">${resalePrice}</span>
          </p>
          <p>
            Used: <span className="text-gray-800 font-semibold">{used}</span>
          </p>
          <p>
            Added on:{" "}
            <span className="text-gray-800 font-semibold">
              {date ? date : ""}
            </span>
          </p>
          <div className="flex items-center">
            <p className="inline">
              Seller:{" "}
              <span className="text-gray-800 font-semibold mr-1">
                {sellerName}
              </span>
            </p>
            <p>
              {phone.status === "verified" ? (
                <MdVerified color="#1C9CEA" />
              ) : (
                ""
              )}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              openModal();
              setBookingProduct(phone);
            }}
            className="bg-green-600 px-4 py-2 text-white rounded cursor-pointer flex justify-center items-center space-x-2 w-full"
          >
            <span>Book Now</span> <FaCartArrowDown />
          </button>
          <button
            onClick={() => handleWishlist(phone)}
            className="bg-orange-500 px-4 py-2 text-white rounded cursor-pointer flex justify-center items-center space-x-2 w-full"
          >
            <span>Add To Wishlist</span> <TbJewishStar />
          </button>
          <button className="bg-red-700 px-4 py-2 text-white rounded cursor-pointer flex justify-center items-center space-x-2 w-full">
            <span>Report To Admin</span> <MdOutlineReportGmailerrorred />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
