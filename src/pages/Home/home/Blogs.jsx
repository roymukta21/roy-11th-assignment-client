import React from "react";
import Reveal from "../../../components/Reveal";

const blogData = [
  {
    id: 1,
    title: "The Secret Behind Local Chef Bazzar’s Signature Home-Style Curry",
    category: "Local Flavors",
    img: "https://plus.unsplash.com/premium_photo-1695582868702-5b0f91584d00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Healthy Eating at Home: 6 Easy Meal Ideas for Busy Families",
    category: "Healthy Living",
    img: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "How Our Home Chefs Pick Fresh Ingredients Every Morning",
    category: "Chef Stories",
    img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Zero-Waste Cooking: Smart Ways to Use Every Ingredient",
    category: "Kitchen Tips",
    img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&auto=format&fit=crop&q=60",
  },
];

const Blogs = () => {
  return (
    <Reveal>
      <section  className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition">
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Local Chef Bazzar
            <span className="text-orange-600"> Blog & Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover cooking inspiration, tips, and stories from our talented
            home chefs. Fresh ideas for your daily meals!
          </p>
        </div>

        {/* Blog Cards */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
          {blogData.map((post) => (
            <div
              key={post.id}
              className="max-w-72 w-full group cursor-pointer transition"
            >
              <div className="overflow-hidden rounded-xl shadow hover:shadow-lg duration-300">
                <img
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                  src={post.img}
                  alt={post.title}
                />
              </div>

              <p className="text-xs text-orange-600 font-bold mt-4 uppercase tracking-widest">
                {post.category}
              </p>

              <h3 className="text-base text-slate-900 font-bold mt-2 leading-tight group-hover:text-orange-600 transition duration-300">
                {post.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
};

export default Blogs;
