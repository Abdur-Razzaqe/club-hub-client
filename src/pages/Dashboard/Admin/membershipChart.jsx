import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MembershipChart = () => {
  const axiosSecure = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["membership-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/memberships-per-club");
      return res.data;
    },
  });
  return (
    <div className="bg-white p-6 shadow rounded-xl ">
      <h2 className="text-xl font-bold mb-4"> Memberships per Club</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <defs>
            <linearGradient id="membersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <XAxis dataKey="clubName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="members" />
          fill="url(#membersGradient)" radius={[6, 6, 0, 0]}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MembershipChart;
