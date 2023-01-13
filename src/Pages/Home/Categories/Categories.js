import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="my-28 mx-auto container">
      <h2 className="text-4xl font-bold text-center mb-6">
        All Bikes Categories
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-y-3">
        {categories.map((c) => (
          <div
            key={c._id}
            className="mx-auto p-8 rounded-md cursor-pointer shadow-md border-black"
          >
            <Link to={`/categories/${c.category}`}>
              <img
                className="w-28 rounded-md mx-auto mb-2"
                src={c.categoryImage}
                alt=""
              />
              <h3 className="text-xl font-semibold ">{c.categoryName}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
