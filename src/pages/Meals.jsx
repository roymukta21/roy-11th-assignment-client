import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeals();
  }, [sortOrder]);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/meals?sort=${sortOrder}`
      );
      setMeals(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeDetails = (id) => {
    if (!user) {
      navigate("/login", { state: { from: `/meals/${id}` } });
    } else {
      navigate(`/meals/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daily Meals</h1>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="h-48 w-full object-cover rounded-t-xl"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-semibold">{meal.foodName}</h2>
              <p className="text-sm text-gray-500">
                Chef: {meal.chefName} ({meal.chefId})
              </p>
              <p className="text-sm">Delivery Area: {meal.deliveryArea}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600">৳ {meal.price}</span>
                <span className="text-yellow-500">⭐ {meal.rating}</span>
              </div>

              <button
                onClick={() => handleSeeDetails(meal._id)}
                className="w-full mt-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

