// Import NavLink from react-router-dom for navigation links
import { NavLink } from "react-router-dom";

// Functional component for the Navbar
const Navbar = () => {
  // Render the Navbar with navigation links
  return (
    <div className="bg-zinc-950 flex items-center justify-between md:h-20 h-16 md:px-20 px-10 text-slate-300 overflow-hidden">
      {/* Display the application name */}
      <div className="md:text-3xl text-xl font-bold">T.io</div>
      {/* Navigation links with NavLink for active styling */}
      <div className="flex gap-4 font-bold">
        <NavLink to='/' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Table</NavLink>
        <NavLink to='/statistics' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Statistics</NavLink>
        <NavLink to='/barchart' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Bar Chart</NavLink>
      </div>
    </div>
  );
}

// Export the Navbar component
export default Navbar;
