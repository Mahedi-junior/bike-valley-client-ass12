import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [buyerLoading, setBuyerLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/users/buyer?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsBuyer(data.isBuyer);
        setBuyerLoading(false);
      });
  }, [email]);

  return [isBuyer, buyerLoading];
};

export default useBuyer;
