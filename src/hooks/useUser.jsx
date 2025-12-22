import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/email?email=${user.email}`);
      return res.data;
    },
  });

  return {
    chefId: users?.chefId,
    users,
    isLoading,
    refetch,
  };
};

export default useUser;
