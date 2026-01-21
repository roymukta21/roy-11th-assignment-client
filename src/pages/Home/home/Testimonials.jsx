import React from "react";
import Marquee from "react-fast-marquee";
import { Quote, Star } from "lucide-react";
import Reveal from "../../../components/Reveal";
import { format } from "date-fns";

const Testimonials = ({ reviews }) => {
  return (
    <section className="py-20 bg-gray-50 rounded-3xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold ">
              <span className="text-orange-600"> Loved by Everywhere</span>
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

                  <div className="flex items-center gap-4 dark:text-orange-600">
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
  );
};

export default Testimonials;
