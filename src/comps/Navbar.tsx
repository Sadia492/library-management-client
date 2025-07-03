import { Link, NavLink } from "react-router";
import logo from "../../public/Books-Flat--Streamline-Fluent-Emoji.svg";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = window.location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Navbar will slide in when scrolled more than 50px
      } else {
        setIsScrolled(false); // Navbar will slide out when scroll is less than 50px
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`w-full fixed top-0 z-10 transition-all duration-500 ease-in-out text-white ${
        pathname === "/"
          ? isScrolled
            ? "bg-black/50 backdrop-blur-md" // Background color when scrolled on homepage
            : "bg-transparent" // Transparent background on homepage
          : "bg-black/80 backdrop-blur-md" // Non-transparent background on other pages
      }`}
    >
      <div className="navbar w-11/12 mx-auto">
        <div className="flex-1">
          <Link to={"/"} className="text-2xl font-bold flex">
            <img src={logo} alt="logo" />
            LibraryFlow
          </Link>
        </div>
        <div className="flex-none">
          <ul className="flex justify-center align-middle gap-4 px-1">
            <li>
              <NavLink to={"/"}>All Books</NavLink>
            </li>
            <li>
              <NavLink to={"/create-book"}>Add Book</NavLink>
            </li>
            <li>
              <NavLink to={"/borrow-summary"}>Borrow Summary</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
