
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Podcasts", path: "/podcasts" },
    { name: "Documentaries", path: "/documentaries" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
            Sister Stories
          </span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-foreground"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <div className="flex gap-2">
            <Button className="bg-brand-purple hover:bg-brand-deep-purple text-white">
              Subscribe
            </Button>
          </div>
        </ul>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-enter">
            <ul className="flex flex-col items-center space-y-6 pt-10">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-lg font-medium"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <Button className="bg-brand-purple hover:bg-brand-deep-purple text-white w-40">
                Subscribe
              </Button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
