import React from "react";
import Reveal from "../../../components/Reveal";
//import Reveal from "../../../components/Reveal";

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "How can I place an order on Local Chef Bazzar?",
      answer:
        "Browse meals from your nearby home chefs, choose the dish you like, and tap 'Order Now'. Add your items to the cart and confirm your delivery or pickup time. Super simple!",
    },
    {
      question: "What type of foods can I find here?",
      answer:
        "Local Chef Bazzar offers everything from traditional Bangladeshi home-style dishes to modern and fusion items. Every chef has their own special menu, so there’s always something new to try.",
    },
    {
      question: "Are the meals freshly cooked?",
      answer:
        "Absolutely! Your meal is prepared only after you place your order. Our home chefs cook fresh, hygienic, homemade food—just like you’d get in a family kitchen.",
    },
    {
      question: "Can I request customizations?",
      answer:
        "Yes! You can leave special instructions for the chef—like less spicy, no oil, extra gravy, or dietary preferences. If the chef supports it, they’ll prepare it just the way you want.",
    },
  ];

  return (
    <Reveal>
      <div className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition">
        <img
          className="max-w-sm w-full rounded-xl h-96 object-cover justify-items-center"
          src="/src/assets/juicy-cheeseburger-rustic-wooden-board.jpg"
          alt="Delicious Homemade Meals"
        />

        <div>
          <p className="text-orange-600 text-sm font-medium">
            Frequently Asked Questions
          </p>

          <h1 className="text-3xl font-semibold text-slate-800">
            Homemade Food. Hassle-Free Experience.
          </h1>

          <p className="text-sm text-slate-500 mt-2 pb-4 max-w-sm">
            We’re here to help you enjoy safe, fresh, and authentic homemade
            meals — crafted by trusted local chefs.
          </p>

          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="border-b border-slate-200 py-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-slate-800">
                  {faq.question}
                </h3>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-all duration-500 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p
                className={`text-sm text-slate-500 max-w-md transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default FAQ;
