import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="w-11/12 mx-auto">
      <div className="navbar bg-base-100 ">
        <div className="flex-1">
          <Link to={"/"} className="text-2xl font-bold">
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
