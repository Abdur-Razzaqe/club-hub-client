import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
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
          <XAxis dataKey="clubName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="members" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MembershipChart;
