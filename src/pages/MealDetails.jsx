import React, { useEffect } from "react";
import { FaStar, FaMapMarkerAlt, FaClock, FaQuoteLeft } from "react-icons/fa";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { TbToolsKitchen3 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Rating from "react-rating";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Star } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import Reveal from "../components/Reveal";

const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: meal = [], isLoading } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  // get reviews data from database
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["meals-reviews", id],
    enabled: !!user?.email,   // ✅ VERY IMPORTANT
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals-reviews/${id}`);
      return res.data;
    },
  });

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
      rating: 0,
    },
  });

  const handleCustomerReviews = async (data) => {
    const reviewData = {
      mealId: meal._id,
      mealName: meal.foodName,
      userName: user?.displayName,
      userEmail: user?.email,
      UserPhoto: user?.photoURL,
      text: data.text,
      rating: data.rating,
    };

    const res = await axiosSecure.post("/meals-reviews", reviewData);
    console.log(res.data);
    toast.success("Review submitted successfully!");
    refetch();
    reset();
  };

  const handleAddFavorite = async () => {
    const favoriteData = {
      mealId: meal._id,
      userEmail: user?.email,
      mealName: meal.foodName,
      chefName: meal.chefName,
      chefId: meal.chefId,
      price: meal.price,
    };

    try {
      const res = await axiosSecure.post("/favorites", favoriteData);

      if (res.data.message === "Already in favorites") {
        toast.error("Already in favorites!");
      } else {
        toast.success("Added to favorites successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handlePayment = async () => {
    const paymentInfo = {
      price: meal.price,
      mealName: meal.foodName,
      orderId: meal._id,
      userEmail: user?.email,
    };
console.log(paymentInfo)
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      console.log(res.data);

     window.location.replace(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-11/12 md:max-w-9/12 mx-auto overflow-hidden">
      <Reveal>
        {/* Food Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          {/* Meal Info */}
          <div className="mt-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {meal.foodName}
            </h2>

            <div className="mt-2 space-y-2">
              <p className="text-lg font-semibold text-primary">
                Price: ${meal.price}
              </p>
              <p className="flex items-center mt-3 font-semibold">
                <FaStar className="mr-2 text-primary" /> Rating: {meal.rating}
              </p>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-primary" /> Delivery Area:{" "}
                {meal.deliveryArea}
              </p>
              <p className="flex items-center text-gray-600">
                <FaClock className="mr-2 text-primary" /> Estimated Delivery:{" "}
                <span className="text-primary ml-2 font-semibold">
                  {meal.estimatedDeliveryTime}
                </span>
              </p>

              <p className="text-gray-600 flex">
                <TbToolsKitchen3 className="mt-0.5 mr-2 text-2xl text-primary" />{" "}
                Ingredients: {meal.ingredients}
              </p>
            </div>

            {/* chef information */}
            <div className="mt-5 bg-orange-50 py-2 px-1 rounded space-y-1">
              <p className="text-gray-600 flex items-center">
                <SiCodechef className="mr-2 text-3xl font-bold text-primary" />{" "}
                {meal.chefName}{" "}
                <span className="text-primary ml-2 font-semibold">
                  ID: ({meal.chefId})
                </span>
              </p>
              <p className=" text-gray-600 ml-8">
                Chef Experience:{" "}
                <span className="font-semibold">{meal.chefExperience}</span>
              </p>
            </div>

            {/* Order Button */}
            <div className="grid grid-cols-2 gap-2 mt-5">
              <button className="mt-4 w-full primary-btn text-center"
              onClick={handlePayment}>
                Order Now
              </button>
              <button
                className="mt-4 w-full primary-btn"
                onClick={handleAddFavorite}
              >
                Add Favorite
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        {/* Review Section */}
        <div className="py-10 lg:p-6">
          <h3 className="text-xl font-semibold mb-2">Reviews</h3>
          <div className="space-y-2">
            <Tabs>
              {/* Tab Menu */}
              <TabList className="flex gap-3">
                <Tab
                  selectedClassName="-select-tab"
                  className="bg-orange-200 mt-3 text-orange-600 py-2.5 px-3.5  hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </Tab>
                <Tab
                  selectedClassName="-select-tab"
                  className="bg-orange-200 mt-3 text-orange-600 py-2.5 px-3.5  hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"
                >
                  Give Review
                </Tab>
              </TabList>

              {/* tab customer review */}
              <TabPanel>
                <div className="mt-5 space-y-3">
                  {reviews.length !== 0 ? (
                    reviews.map((review, idx) => (
                      <div key={idx} className="p-3 rounded bg-orange-50">
                        <p className="flex items-center gap-2">
                          <FaQuoteLeft className="text-primary text-xl" />{" "}
                          {review.text}
                        </p>

                        <div className="flex gap-1 my-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mt-5">
                          <div>
                            <img
                              src={review.UserPhoto}
                              alt="User"
                              className="h-12 w-12 rounded-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.userName}</h4>
                            <span>
                              <span>
                                {format(
                                  new Date(review.createdAt),
                                  "dd MMM yyyy, hh:mm a"
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>No reviews for this product</>
                  )}
                </div>
              </TabPanel>

              {/* tab-2 review from */}
              <TabPanel>
                <form
                  onSubmit={handleSubmit(handleCustomerReviews)}
                  className="mt-5 space-y-4"
                >
                  {/* Star Rating */}
                  <div>
                    <div className="flex items-center gap-2 mt-7">
                      <div>
                        <img
                          src={user?.photoURL}
                          alt="User"
                          className="h-12 w-12 rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{user?.displayName}</h4>
                        <span>{user?.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                      <span className="font-semibold">Your Rating:</span>
                      <Controller
                        name="rating"
                        control={control}
                        rules={{ required: "Rating is required" }}
                        render={({ field }) => (
                          <Rating
                            initialRating={field.value}
                            onChange={field.onChange}
                            emptySymbol={
                              <MdOutlineStarOutline className="text-primary text-2xl mt-1.5" />
                            }
                            fullSymbol={
                              <MdOutlineStarPurple500 className="text-primary text-2xl mt-1.5" />
                            }
                          />
                        )}
                      />
                      {errors.rating && (
                        <p className="text-red-500 text-sm">
                          {errors.rating.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Input textarea */}
                  <textarea
                    className="w-full border p-3 rounded"
                    rows="4"
                    placeholder="Write your review..."
                    {...register("text", {
                      required: "Review text is required",
                    })}
                  />
                  {errors.text && (
                    <p className="text-red-500 text-sm">
                      {errors.text.message}
                    </p>
                  )}

                  <button type="submit" className="primary-btn">
                    Give Review
                  </button>
                </form>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default MealDetails;
