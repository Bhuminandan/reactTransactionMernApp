// Import the Outlet component from react-router-dom
import { Outlet } from "react-router-dom";

// Import the Navbar component
import Navbar from "../Navbar/Navbar";

// Functional component for the layout
const Layout = () => {
  // Render the layout with Navbar and Outlet for nested routes
  return (
    <>
      {/* Display the Navbar component */}
      <Navbar />
      {/* Display the Outlet component for rendering nested routes */}
      <Outlet />
    </>
  );
}

// Export the Layout component
export default Layout;
