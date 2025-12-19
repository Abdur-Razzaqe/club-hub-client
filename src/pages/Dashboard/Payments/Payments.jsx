import React, { useContext } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../Common/LoadingSpinner";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

const Payments = () => {
  const { clubId } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: club, isLoading } = useQuery({
    queryKey: ["clubs", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${clubId}`);
      return res.data;
    },
  });

  const handleCheckout = async () => {
    const paymentInfo = {
      clubId: club._id,
      clubName: club.clubName,
      amount: club.membershipFee || 50,
      memberEmail: user?.email,
    };
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      if (res.data.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Checkout error", error);
    }
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h2> Pay for: {club.clubName}</h2>
      <p>Membership Fee: ${club?.membershipFee || 50}</p>

      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

export default Payments;
