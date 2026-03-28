import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-role", user?.email],

    enabled: !loading && !!user?.email,

    queryFn: async () => {
      if (!user?.email) return null;

      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },

    staleTime: 1000 * 60 * 60,
  });

  return [role, isRoleLoading, refetch];
};

export default useRole;
