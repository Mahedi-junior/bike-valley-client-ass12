import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";

const AddAProduct = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookingPhone = (data) => {
    const phoneData = {
      ...data,
      sellerName: user?.displayName,
      email: user?.email,
    };
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const photo = data.data.display_url;
        const phone = {
          ...phoneData,
          image: photo,
          date: new Date().toISOString().slice(0, 10),
        };

        fetch("http://localhost:5000/bikes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(phone),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              toast.success("your phone successfully added!");
              setLoading(false);
              navigate("/dashboard/myproducts");
              // navigate("/");
            }
          });
      });
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">
        Fill this form to sell your bike
      </h3>

      <form
        onSubmit={handleSubmit(handleBookingPhone)}
        className="grid grid-cols-1 gap-4 mt-5 max-w-lg mx-auto p-4 rounded-xl shadow-xl"
      >
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Product Name"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        />

        <div>
          <label for="files" className="block">
            Select Image Please
          </label>
          <input
            {...register("image", { required: true })}
            id="files"
            type="file"
            className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg w-full"
            accept="image/*"
            title="Choose a Image Please"
          />
        </div>

        <input
          {...register("originalPrice", { required: true })}
          type="text"
          placeholder="Original Price"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        />
        <input
          {...register("resalePrice", { required: true })}
          type="text"
          placeholder="Resale Price"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        />
        <select
          {...register("condition", { required: true })}
          type="text"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        >
          <option value="Product Condition" selected disabled>
            Product Condition
          </option>
          <option value="Exelent">Exelent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>

        <input
          {...register("phone", { required: true })}
          type="text"
          placeholder="Phone Number"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        />
        <input
          {...register("location", { required: true })}
          type="text"
          placeholder="Location"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        />
        <select
          {...register("category", { required: true })}
          type="text"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        >
          <option value="Product Category" selected disabled>
            Product Category
          </option>
          <option value="Yamaha">Yamaha</option>
          <option value="Suzuki">Suzuki</option>
          <option value="Bajaj">Bajaj</option>
          <option value="Hero">Hero</option>
        </select>
        <textarea
          {...register("description", { required: true })}
          cols="30"
          rows="4"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
          placeholder="Product Description"
        ></textarea>
        <input
          {...register("used", { required: true })}
          type="text"
          placeholder="Purchase Year e.g. 1 Year"
          className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {loading ? <Loader /> : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddAProduct;
