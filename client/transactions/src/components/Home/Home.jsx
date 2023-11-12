// Import the Table component
import Table from "../Table/Table";

// Functional component for the Home page
const Home = () => {
  
  // Render the Home component
  return (
    <div className="bg-zinc-900 flex items-start justify-start w-full h-full py-5">
      {/* Display the Table component */}
      <Table />
    </div>
  );
}

// Export the Home component
export default Home;
