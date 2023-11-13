// Import NavLink from react-router-dom for navigation links
import { NavLink } from "react-router-dom";
import {AiOutlineMenu} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/features/sideBarSlice";

// Functional component for the Navbar
const Navbar = () => {

  const dispatch = useDispatch()

  const handleSidebarMenuClick = () => {
    dispatch(toggleSidebar())
  }



  // Render the Navbar with navigation links
  return (
    <div className="bg-zinc-950 flex items-center justify-between md:h-20 h-16 md:px-20 px-10 text-slate-300 overflow-hidden">
      {/* Display the application name */}
      <div className="md:text-3xl text-xl font-bold">T.IO</div>

      <div
        className="md:hidden cursor-pointer hover:bg-slate-500 transition-all duration-300 p-2 rounded-full"
        onClick={handleSidebarMenuClick}
      >
        <AiOutlineMenu className="text-3xl text-slate-400" />
      </div>

      {/* Navigation links with NavLink for active styling */}
      <div className="md:flex gap-4 font-bold hidden">
        <NavLink to='/' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Table</NavLink>

        <NavLink to='/statistics' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Statistics</NavLink>

        <NavLink to='/barchart' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Bar Chart</NavLink>

        <NavLink to='/piechart' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Pie Chart</NavLink>
      </div>
    </div>
  );
}

// Export the Navbar component
export default Navbar;
