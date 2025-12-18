import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div>
      <img
        className="w-100%"
        src="https://images.unsplash.com/photo-1765410845769-9c931a7728b7?q=80&w=2569&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="online 404 image"
      />
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
