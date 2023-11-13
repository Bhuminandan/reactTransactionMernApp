// Import necessary dependencies from React and Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// Import the action to fetch bar chart data
import { fetchBarChartData } from "../../redux/features/chartDataSlice";
import Loader from "../Loaders/Loader";

// Functional component for the BarChart
const BarChart = () => {

  // Redux setup
  const dispatch = useDispatch();
  const { monthIndex, month } = useSelector((state) => state.currentMonth.currentMonth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const barchartData = useSelector(state => state.chartData);
  const { chartData, isLoading, error } = barchartData || {};

  console.log(barchartData);

  useEffect(() => {
    dispatch(fetchBarChartData({ monthIndex }));
  }, [monthIndex, dispatch]);

  // Getting inner width of the screen
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handling loading and error conditions
  if (isLoading) {
    return (
      <div className="bg-zinc-900 w-full min-h-screen text-slate-400 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  // Render the BarChart component
  return (
    <div className="w-screen min-h-screen bg-zinc-900 text-green-50 flex items-center justify-start gap-5">
      <div className="md:w-[800px] w-[400px] m-auto flex flex-col items-start justify-start gap-5 px-5">
        {/* Display the selected month */}
        <h1 className="text-xl font-bold text-slate-600">Transactions for : <span className="text-2xl uppercase font-bold text-slate-400">{month}</span></h1>
        {/* BarChart container */}
        <div className="w-full m-auto bg-zinc-950 md:p-10 p-5 rounded-3xl border flex items-center justify-center">
          {barchartData?.length !== 0 ? (
            // Render the BarChart
            <ResponsiveContainer width={screenWidth < 500 ? 300 : 400} height={screenWidth < 500 ? 200 : 300}>
              {/* ReBarChart component with XAxis, YAxis, Tooltip, and Bar */}
              <ReBarChart width={500} height={300} data={chartData}>
                {/* X-axis displaying pricerange */}
                <XAxis dataKey="_id" />
                {/* Y-axis */}
                <YAxis dataKey="numofitems" />
                {/* Tooltip for data points */}
                <Tooltip />
                {/* Bar representing the number of items */}
                <Bar dataKey="solditems" fill="#8884d8" />
              </ReBarChart>
            </ResponsiveContainer>
          ) : (
            // Display message if no data found
            <div className="w-full h-full flex items-center justify-center">
              <p>No data found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the BarChart component
export default BarChart;
