import "./index.css";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
