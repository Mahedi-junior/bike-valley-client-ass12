import React from "react";
import useTitle from "../../../hooks/useTitle";
import Slider from "../../Slider/Slider";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import Categories from "../Categories/Categories";
import BikeSection from "../BikeSection/BikeSection";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Slider />
      <AdvertisedItems />
      <Categories />
      <BikeSection />
    </div>
  );
};

export default Home;
