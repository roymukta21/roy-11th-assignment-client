import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">LocalChefBazaar</h2>
            <p className="mt-4 text-sm leading-relaxed">
              A trusted marketplace connecting local home chefs with food
              lovers. Fresh, homemade meals — delivered with care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Meals</li>
              <li className="hover:text-white cursor-pointer">Dashboard</li>
              <li className="hover:text-white cursor-pointer">
                Login / Register
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +880 1234‑567890
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@localchefbazaar.com
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/"
                className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://twitter.com/"
                className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
