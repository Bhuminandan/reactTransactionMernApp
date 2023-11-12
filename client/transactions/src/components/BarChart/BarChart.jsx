// Import necessary dependencies from React and Redux
import{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// Import the action to fetch bar chart data
import { fetchBarChartData } from "../../redux/features/chartDataSlice";
import Loader from "../Loaders/Loader";

// Functional component for the BarChart
const BarChart = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [chartData, setChartData] = useState([
    {
      'pricerange': '0 - 100',
      'solditems': 2
    },
    {
      'pricerange': '101 - 200',
      'solditems': 3
    },
    {
      'pricerange': '201 - 300',
      'solditems': 4
    },
    {
      'pricerange': '301 - 400',
      'solditems': 5
    },
    {
      'pricerange': '401 - 500',
      'solditems': 6
    },
    {
      'pricerange': '501 - 600',
      'solditems': 7

    },
    {
      'pricerange': '601 - 700',
      'solditems': 1
    },
    {
      'pricerange': '701 - 800',
      'solditems': 2
    },
    {
      'pricerange': '801 - 900',
      'solditems': 7
    },
    {
      'pricerange': '901 - above',
      'solditems': 2
    }
  ])

  // Getting inner width of the screen

  useEffect(() => {
    const handleResize = window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  // Redux setup
  const dispatch = useDispatch();
  const { monthIndex, month } = useSelector((state) => state.currentMonth.currentMonth);
  const { isLoading, error, chartData: data } = useSelector((state) => state.chartData);

  // Log the chart data received from Redux
  console.log(data);

  // Fetch chart data on component mount or when the monthIndex changes
  useEffect(() => {
    dispatch(fetchBarChartData({ monthIndex }));
  }, [monthIndex, dispatch]);

  // Handling loading condition
  if(isLoading) {
    return (
      <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
        <Loader/>
      </div>
    )
  }

  // Handling Error condition
  if (error) {
    return (
      <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
        <p>something went wrong: {error}</p>
      </div>
    )
  }


  // Render the BarChart component
  return (
    <div className="w-screen min-h-screen bg-zinc-900 text-green-50 flex items-center justify-start gap-5">
      <div className="md:w-[800px] w-[400px] m-auto flex flex-col items-start justify-start gap-5 px-5">
        {/* Display the selected month */}
        <h1 className="text-xl font-bold text-slate-600">Transactions for : <span className="text-2xl font-bold text-slate-400">{month}</span></h1>
        {/* BarChart container */}
        <div className="w-full m-auto bg-zinc-950 md:p-10 p-5 rounded-3xl border flex items-center justify-center">
          {/* ResponsiveContainer for dynamic size */}
          <ResponsiveContainer width={ screenWidth < 500 ? 300 : 400} height={ screenWidth < 500 ? 200 : 300}>
            {/* ReBarChart component with XAxis, YAxis, Tooltip, and Bar */}
            <ReBarChart
              width={500}
              height={300}
              data={chartData}
            >
              {/* X-axis displaying pricerange */}
              <XAxis dataKey="pricerange" />
              {/* Y-axis */}
              <YAxis />
              {/* Tooltip for data points */}
              <Tooltip />
              {/* Bar representing the number of items */}
              <Bar dataKey="solditems" fill="#8884d8" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Export the BarChart component
export default BarChart;
