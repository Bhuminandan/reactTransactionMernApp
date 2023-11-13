// Import the Outlet component from react-router-dom
import { Outlet } from "react-router-dom";

// Import the Navbar component
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

// Functional component for the layout
const Layout = () => {

  const isOpen = useSelector((state) => state.sideBar.isOpen);
  console.log(isOpen);


  // Render the layout with Navbar and Outlet for nested routes
  return (
    <div className="relative">
      
      {/* Display Sidebar */}
      {
        isOpen &&
        <Sidebar  />
      }

      {/* Display the Navbar component */}
      <Navbar />

      {/* Display the Outlet component for rendering nested routes */}
      <Outlet />
    </div>
  );
}

// Export the Layout component
export default Layout;
