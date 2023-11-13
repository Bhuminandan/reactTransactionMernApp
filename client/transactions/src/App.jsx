// Import necessary dependencies and components
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import Loader from './components/Loaders/Loader';

// Lazy importing components
const Layout = lazy(() => import('./components/layout/Layout'));
const Home = lazy(() => import('./components/Home/Home'));
const Statistics = lazy(() => import('./components/Statistics/Statistics'));
const BarChart = lazy(() => import('./components/BarChart/BarChart'));

function App() {
  return (
    <div className='w-sceen min-h-screen overflow-x-hidden'>

      {/* Render the Suspense component with component */}

      <Suspense fallback={<div className='w-screen min-h-screen flex items-center justify-center'><Loader /></div>}>

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
      </Suspense>
    </div>
  );
}

export default App;
