import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  // fetch meals
  useEffect(() => {
    fetch("https://local-chef-bazaar-server-wine.vercel.app/meals")
      .then((res) => res.json())
      .then((data) => setMeals(data.slice(0, 6)));
       fetch("https://local-chef-bazaar-server-wine.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  
  return (
    <div className="space-y-20">
      {/*HERO SECTION*/}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <img
          className="h-[420px] md:h-[540px] w-full object-cover"
          src="/src/assets/banner.jpg"
          alt="Banner"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
          <div className="text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              Fresh Homemade Meals
            </h1>
            <p className="max-w-xl mx-auto">
              Order healthy & delicious meals prepared by local chefs
            </p>
            <button className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600">
              Explore Meals
            </button>
          </div>
        </div>
      </motion.div>

      {/* DAILY MEALS */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Daily Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <motion.div
              key={meal._id}
              whileHover={{ scale: 1.05 }}
              className="border rounded-xl shadow p-4"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="h-48 w-full object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-3">{meal.name}</h3>
              <p className="text-gray-600">{meal.description}</p>
              <p className="font-bold mt-2">৳ {meal.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews?.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow
                     text-gray-700 dark:text-gray-200"
              >
                <p className="italic">“{review.comment}”</p>
                <h4 className="font-semibold mt-4 text-gray-900 dark:text-gray-100">
                  — {review.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*EXTRA SECTION*/}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-xl">Healthy Food</h3>
            <p className="text-gray-600 mt-2">
              Fresh ingredients & balanced meals
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-xl">Local Chefs</h3>
            <p className="text-gray-600 mt-2">Support talented home chefs</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-xl">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Hot meals delivered on time</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
