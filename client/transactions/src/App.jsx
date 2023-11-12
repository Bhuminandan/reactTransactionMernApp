// Import necessary dependencies and components
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './components/Home/Home';
import Statistics from './components/Statistics/Statistics';
import BarChart from './components/BarChart/BarChart';

function App() {
  return (
    <div className='w-sceen min-h-screen overflow-x-hidden'>
      {/* Define the routes using React Router */}
      <Routes>
        {/* Route for the root path */}
        <Route path='/' element={<Layout />}>
          {/* Index route under the Layout component, rendering the Home component */}
          <Route index element={<Home />} />

          {/* Route for the '/statistics' path, rendering the Statistics component */}
          <Route path='/statistics' element={<Statistics />} />

          {/* Route for the '/barchart' path, rendering the BarChart component */}
          <Route path='/barchart' element={<BarChart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
