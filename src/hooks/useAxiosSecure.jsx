import axios from "axios";
import React, { useContext, useEffect } from "react";
import useAuth from "./useAuth"

const axiosInstance = axios.create({
 //baseURL: "http://localhost:5000",
 baseURL: "https://local-chef-bazaar-server-wine.vercel.app",

});

const useAxiosSecure = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            console.log("logged out")
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosInstance;
};

export default useAxiosSecure;