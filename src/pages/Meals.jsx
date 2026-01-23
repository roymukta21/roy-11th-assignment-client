import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MealCard from "../components/MealCard";
import SearchNotFound from "../components/SearchNotFound";
import Reveal from "../components/Reveal";

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["meals", search, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meals?search=${search}&sort=${sort}&page=${page}&limit=${limit}`,
      );
      return res.data;
    },
  });

  const meals = data.meals || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <Reveal>
      <div className="w-11/12 mx-auto">
        <title>LocalChefBazaar::Pick Your Meals</title>
        {/* Header */}
        <div className="text-center mt-10 mb-20">
          <h2 className="text-4xl font-bold text-primary mb-3">
            Discover Your Next Favorite Recipe
          </h2>
          <p className="text-gray-600">
            Thousands of tried-and-tested recipes, from quick dinners to
            desserts.
          </p>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-12 gap-5 items-center mb-16">
          {/* Count */}
          <div className="col-span-4 md:col-span-3 lg:col-span-2">
            <h1 className="lg:font-bold text-primary lg:text-xl">
              ({total}) Available
            </h1>
          </div>

          {/* Search */}
          <div className="col-span-8 md:col-span-6 lg:col-span-8 mx-auto">
            <div className="flex items-center gap-2 border px-4 rounded-full h-[46px] bg-white dark:bg-gray-800 border-gray-400/40 dark:border-gray-600 w-full">
              <input
                type="text"
                placeholder="Search meals..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Sort */}
          <div className=" col-span-12 md:col-span-3 lg:col-span-2">
            <select
              className="select select-bordered cursor-pointer w-full"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="none">Sort by price</option>
              <option value="low">Low - High</option>
              <option value="high">High - Low</option>
            </select>
            {/* <select
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered cursor-pointer w-full"
            >
              <option value="">Sort By</option>
              <option value="experienceLevel"> Experience (High → Low)</option>
            </select> */}
          </div>
        </div>
        {/* <div>
          <input
          type="text"
          placeholder="Search by meal..."
          className="border p-2 rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          onChange={(e) => setSearch(e.target.value)}
        />
        </div> */}

        {/* Content */}
        {isLoading ? (
          <Loading />
        ) : meals.length > 0 ? (
          <>
            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {meals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mb-16 flex-wrap">
              {/* Previous Button */}
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`p-2 rounded transition ${
                  page === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-orange-700 cursor-pointer"
                }`}
              >
                <FaChevronLeft />
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num + 1)}
                  className={`px-4 py-2 rounded transition ${
                    page === num + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  }`}
                >
                  {num + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`p-2 rounded transition ${
                  page === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-orange-700 cursor-pointer"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        ) : (
          <div className="p-10">
            <SearchNotFound />
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default Meals;
