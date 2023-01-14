import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

import BookingModal from "../../../Shared/BookingModal/BookingModal";
import Loader from "../../../Shared/Loader/Loader";
import ItemsCard from "../../CategoryItems/ItemsCard";

const AdvertisedItems = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [adsProduct, setAdsProduct] = useState(null);
  const { user } = useContext(AuthContext);
  // console.log(user);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const config = {
    headers: {
      authorization: `bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const email = user?.email;

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads", email],
    queryFn: async () => {
      if (email) {
        const res = await axios.get(
          `http://localhost:5000/ads?email=${email}`,
          config
        );
        const data = await res.data;
        return data;
      }
    },
  });

  if (isLoading || !email) {
    return <Loader />;
  }

  return (
    <>
      {ads.length === 0 ? (
        ""
      ) : (
        <div className="my-20 px-10">
          <h3 className="text-4xl font-bold text-gray-800 text-center">
            Bikes For Advertising
          </h3>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {ads
              .filter((a) => !a.paid)
              .map((phone) => (
                <ItemsCard
                  phone={phone}
                  key={phone._id}
                  openModal={openModal}
                  setBookingProduct={setAdsProduct}
                />
              ))}
          </div>

          {adsProduct && (
            <BookingModal
              isOpen={isOpen}
              closeModal={closeModal}
              bookingProduct={adsProduct}
              setBookingProduct={setAdsProduct}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdvertisedItems;
