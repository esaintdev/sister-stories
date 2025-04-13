
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
              Sister Stories
            </h2>
            <p className="text-gray-600 mb-4 max-w-md">
              Empowering women through stories, podcasts, documentaries, and community. Join us in creating a world where every woman's voice matters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-brand-purple" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-purple" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-purple" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-purple" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-purple" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-brand-purple">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-brand-purple">About Us</Link></li>
              <li><Link to="/podcasts" className="text-gray-600 hover:text-brand-purple">Podcasts</Link></li>
              <li><Link to="/documentaries" className="text-gray-600 hover:text-brand-purple">Documentaries</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-brand-purple">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-purple">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to receive updates on our latest content.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border rounded focus:ring-2 focus:ring-brand-purple focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-brand-purple hover:bg-brand-deep-purple text-white px-4 py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 text-center text-gray-600">
          <p>© {currentYear} Sister Stories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
