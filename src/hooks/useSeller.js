import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/users/seller?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.isSeller);
        setIsSeller(data.isSeller);
        setSellerLoading(false);
      });
  }, [email]);

  return [isSeller, sellerLoading];
};

export default useSeller;
