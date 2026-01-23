import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-16 mb-20 px-4 lg:px-0">
      <title>Local Chef Bazaar | About Us</title>

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          About Local Chef Bazaar
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover authentic homemade meals prepared by talented local chefs.
          Local Chef Bazaar connects food lovers with passionate home cooks —
          delivering fresh, flavorful meals right to your doorstep.
        </p>
      </div>

      {/* Mission Section */}
      <section className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        <img
          src="https://images.unsplash.com/photo-1610935592122-dc658d298670?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvdmUlMjBmb29kfGVufDB8fDB8fHww"
          alt="Our Mission"
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-semibold mb-4 text-orange-600">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is simple — give home chefs a platform to shine and
            allow customers to enjoy authentic, homemade food anytime. We
            believe homemade meals carry love, tradition, and unmatched taste,
            and we are here to make that experience easily accessible.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-orange-600 mb-8">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">Homemade Delicacies</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Taste authentic dishes from home chefs who pour passion into every
              recipe.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">Earn as a Chef</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Home cooks can turn their cooking skills into income with zero
              setup cost.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse meals, order instantly, and enjoy doorstep delivery —
              simple and hassle-free.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">Fresh & Quality Food</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Meals are prepared fresh with love, ensuring quality and hygiene.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy safe and smooth transactions through trusted payment
              gateways.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our support team is always ready to help you whenever needed.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-orange-600">
            Why Choose Local Chef Bazaar?
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✔ 100% homemade food experience</li>
            <li>✔ Trusted chefs from your community</li>
            <li>✔ Affordable meals compared to restaurants</li>
            <li>✔ Transparency in ingredients & preparation</li>
            <li>✔ Great for students, busy workers, and families</li>
          </ul>
        </div>

        <img
          src="https://images.unsplash.com/photo-1501747188-61c00b3d8ba0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Why Choose Us"
          className="rounded-xl shadow-lg"
        />
      </section>
    </div>
  );
};

export default AboutUs;
