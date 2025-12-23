import React from "react";
 import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import MealCard from "../components/MealCard";
import Reveal from "../components/Reveal";
import Loading from "../components/Loading";
import { ChefHat, Clock10, HeartIcon, ShareIcon, Sparkles, UsersIcon } from "lucide-react";
import { Link } from "react-router";

/* ---------------- animations ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ================= HOME ================= */
const Home = () => {
  const axiosSecure = useAxiosSecure();

  /* latest meals */
  const { data: meals = [] } = useQuery({
    queryKey: ["latest-meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-meals");
      return res.data;
    },
  });

  /* testimonials */
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["testimonial"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-reviews");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const features = [
    {
      icon: <Clock10 className="w-10 h-10 text-orange-600" />,
      title: "Save Time in the Kitchen",
      desc: "Quick & easy recipes — ready in 30 minutes or less.",
    },
    {
      icon: <HeartIcon className="w-10 h-10 text-orange-600" />,
      title: "Save Your Favorites",
      desc: "Build your personal cookbook with one click.",
    },
    {
      icon: <ChefHat className="w-10 h-10 text-orange-600" />,
      title: "Add Your Own Recipes",
      desc: "Share your signature dishes with the community.",
    },
    {
      icon: <ShareIcon className="w-10 h-10 text-orange-600" />,
      title: "Share with Friends",
      desc: "Send recipes instantly to friends & family.",
    },
    {
      icon: <UsersIcon className="w-10 h-10 text-orange-600" />,
      title: "Foodie Community",
      desc: "Discover meals from real home cooks.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-orange-600" />,
      title: "Always Fresh",
      desc: "New recipes added daily.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto min-h-screen space-y-24">

      {/* ================= HERO ================= */}
      <section className="w-full">
        <div className="relative overflow-hidden  h-[40vh] md:h-[75vh]">
          <img
            src="/localChefBazaar.png"
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            className="relative z-10 flex h-full items-end px-6 md:px-20 pb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-xl text-white">
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-6xl font-black leading-tight mb-4"
              >
                Fresh <span className="text-orange-500">Homemade</span> 
                Meals
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-gray-200 mb-6"
              >
                Order healthy & delicious meals prepared by local chefs


              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  to="/meals"
                  className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold "
                >
                  Explore Meals
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= LATEST MEALS ================= */}
      <section>
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-6xl font-extrabold">
            Fresh & New <span className="text-orange-600">Recipes</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Latest creations from our home cooks
          </p>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        </Reveal>

        <div className="text-center">
          <Link to="/meals" className="primary-btn">
            View More
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Why You'll Love
              <span className="text-orange-600"> Cooking With Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition"
              >
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-20 bg-gray-50 rounded-3xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Loved by Home Cooks
              <span className="text-orange-600"> Everywhere</span>
            </h2>
          </div>

          <Marquee pauseOnHover speed={40} gradient={false}>
            <div className="flex gap-10 px-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="min-w-[350px] bg-white rounded-3xl shadow p-8"
                >
                  <Quote className="w-10 h-10 text-orange-200 mb-4" />

                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-orange-500 text-orange-500"
                      />
                    ))}
                  </div>

                  <p className="italic mb-6">"{review.text}"</p>

                  <div className="flex items-center gap-4">
                    <img
                      src={review.UserPhoto}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{review.userName}</h4>
                      <span className="text-sm text-gray-500">
                        {format(new Date(review.createdAt), "dd MMM yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
