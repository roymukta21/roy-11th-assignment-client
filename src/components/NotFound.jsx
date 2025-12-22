import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-orange-50 text-white px-4">
       <title>NotFound this page</title>
      {/* Animated container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="p-6 sm:p-10 w-full max-w-md sm:max-w-xl text-center rounded-xl shadow-2xl "
      >
        <div className="flex flex-col items-center justify-center">
          {/* Big glowing 404 */}
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-black"
          >
            404
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 rounded bg-gradient-to-r from-orange-500 to-orange-400 my-4 sm:my-6"
          ></motion.div>

          {/* Title */}
          <p className="text-lg sm:text-2xl md:text-3xl font-bold text-black">
            Page Not Found
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base mt-3 sm:mt-4 text-gray-400 max-w-sm sm:max-w-md">
            The page you are looking for might have been removed, renamed, or is
            temporarily unavailable.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
            <Link
              to={"/"}
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300 text-center"
            >
              Return Home
            </Link>
            <Link
              to={"/contact"}
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Decorative footer */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-10 text-gray-400 text-xs sm:text-sm tracking-wider px-2 text-center"
      >
      
      </motion.p>
    </div>
  );
};

export default NotFound;
