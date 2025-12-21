import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Calendar, Mail, MapPin, Tag } from "lucide-react";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`clubs/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <p className="text-center mt-10">Loading..</p>;
  if (!club) return <p className="text-center mt-10">Club Not Found</p>;

  const handleJoin = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please login to join club", "warning");
      navigate("/login");
      return;
    }
    if (club.membershipFee > 0) {
      const paymentInfo = {
        clubId: club._id,
        clubName: club.clubName,
        memberEmail: user.email,
        amount: club.membershipFee,
      };
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      window.location.replace(res.data.url);
      return;
    }

    const res = await axiosSecure.post("/payments/success", {
      clubId: club._id,
    });

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Joined Club!",
        text: `You have successfully joined ${club.clubName}`,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full">
          <img
            src={club.bannerImage}
            alt="club banner"
            className="w-full h-70 md:h-full object-cover rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            {club.clubName}
          </h2>
          <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-teal-500">
            <p className="text-gray-700 leading-relaxed">
              Description: {club.description}
            </p>
          </div>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Category: </span>{" "}
              <span className="bg-teal-500 rounded-full px-4 text-white">
                {club.category}
              </span>
            </p>
          </div>
          <div className="flex justify-start items-center text-gray-500 text-sm gap-30 px-4 ">
            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-teal-500" />
              Location: {club.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-teal-500" />
              {new Date(club.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">
                  Manager
                </p>
                <p className="text-sm font-medium">{club.managerEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Tag size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">
                  Status
                </p>
                <p className="text-sm font-medium">{club.status}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-teal-600">
              Membership Fee:{" "}
              {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
            </p>
          </div>

          <button
            onClick={handleJoin}
            className="w-full mt-5 py-2 rounded-lg font-semibold  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all duration-300 cursor-pointer"
          >
            {club.membershipFee > 0 ? "Pay & Join Club" : "Join Club"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
