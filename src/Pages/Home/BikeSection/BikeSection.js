import React from "react";
import banner from "../../../assets/bike.jpg";

const BikeSection = () => {
  return (
    <div
      className="h-[90vh] flex justify-center items-center mb-20 bg-fixed"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-semibold text-gray-100">
          Bikes take you places where cars cannot... <br />{" "}
        </h1>

        <button className="px-10 py-3 bg-gray-100 rounded hover:bg-slate-300 font-semibold">
          View More
        </button>
      </div>
    </div>
  );
};

export default BikeSection;
