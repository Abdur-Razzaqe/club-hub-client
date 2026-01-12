import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaUserCheck,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { data } from "react-router";

const HomeStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/home/stats").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  if (!stats) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          ClubHub in Numbers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCard
            icon={<FaUsers />}
            label="Members"
            value={stats.totalUsers}
          />
          <StatCard
            icon={<FaBuilding />}
            label="Clubs"
            value={stats.totalClubs}
          />
          <StatCard
            icon={<FaCalendarAlt />}
            label="Events"
            value={stats.totalEvents}
          />
          <StatCard
            icon={<FaUserCheck />}
            label="Memberships"
            value={stats.totalMemberships}
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="text-4xl text-lime-500 mb-3">{icon}</div>
    <h3 className="text-2xl font-bold">{value}+</h3>
    <p className="text-gray-500">{label}</p>
  </div>
);

export default HomeStatistics;
