import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import slider1 from "../../assets/slider/slider-1.png";
import slider2 from "../../assets/slider/slider-2.png";
import slider3 from "../../assets/slider/slider-3.png";

const Slider = () => {
  return (
    <div className="mb-12">
      <AwesomeSlider
        bullets={false}
        style={{ "--slider-height-percentage": "50%" }}
        fillParent={false}
      >
        <div
          style={{
            backgroundImage: `url(${slider1})`,
            backgroundSize: "cover",
          }}
          className="relative w-full"
        >
          <div className="absolute left-32 -top-28">
            <h1 className="lg:text-8xl md:text-6xl text-4xl lg:leading-[90px] leading-[40px] font-bold text-white">
              Love to Ride, <br /> Live to travel.
            </h1>
            <button className="lg:px-20 lg:py-3 px-6 py-2 bg-none hover:bg-slate-300 hover:text-black border-white border-2 text-white font-semibold mt-10">
              Shop Now
            </button>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${slider2})`,
            backgroundSize: "cover",
          }}
          className="relative w-full"
        >
          <div className="absolute left-32 -top-32">
            <h1 className="lg:text-8xl md:text-6xl text-4xl lg:leading-[90px] leading-[40px] font-bold text-white">
              Travel for fun <br /> not like work
            </h1>
            <button className="lg:px-20 lg:py-3 px-6 py-2 bg-none border-black hover:bg-slate-300 hover:text-black border-2 text-black font-semibold mt-10">
              Shop Now
            </button>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${slider3})`,
            backgroundSize: "cover",
          }}
          className="relative w-full"
        >
          <div className="absolute left-32 -top-32">
            <h1 className="lg:text-8xl md:text-6xl text-4xl lg:leading-[90px] leading-[40px] font-bold text-white">
              Do the right thing, <br /> do the ride thing
            </h1>
            <button className="lg:px-20 lg:py-3 px-6 py-2 bg-none border-white hover:bg-slate-300 hover:text-black border-2 text-white font-semibold mt-10">
              Shop Now
            </button>
          </div>
        </div>
      </AwesomeSlider>
    </div>
  );
};

export default Slider;
