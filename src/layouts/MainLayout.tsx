import Footer from "@/comps/Footer";
import Navbar from "@/comps/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-117px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}
