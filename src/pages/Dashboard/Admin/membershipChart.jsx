import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const MembershipChart = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data = [], isLoading } = useQuery({
    queryKey: ["membership-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/memberships-per-club");
      return res.data;
    },
  });

  // Premium Colors
  const COLORS = isDark
    ? ["#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981"]
    : ["#0d9488", "#2563eb", "#7c3aed", "#db2777", "#ea580c"];

  if (isLoading)
    return <div className="p-10 text-center opacity-50">Loading Chart...</div>;

  // If no data is available
  if (data.length === 0)
    return (
      <div className="p-10 text-center border rounded-[32px] opacity-50 italic">
        No membership data available to display.
      </div>
    );

  return (
    <div
      className={`p-8 rounded-[32px] border transition-all duration-500 ${
        isDark
          ? "bg-[#0b0514] border-white/5 shadow-2xl shadow-pink-500/5"
          : "bg-white border-gray-100 shadow-xl"
      }`}
    >
      <h2
        className={`text-xl font-black uppercase tracking-tight mb-6 ${isDark ? "text-white" : "text-gray-800"}`}
      >
        Memberships{" "}
        <span className={isDark ? "text-pink-500" : "text-teal-600"}>
          Distribution
        </span>
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // Custom label to show club name and percentage
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="members"
            nameKey="clubName"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              backgroundColor: isDark ? "#1a1025" : "#fff",
              border: "none",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              color: isDark ? "#fff" : "#000",
            }}
          />
          <Legend iconType="diamond" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MembershipChart;
