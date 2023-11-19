import { useEffect } from "react"
import { Pie, ResponsiveContainer, PieChart as RePieChart, Tooltip } from "recharts"
import { useDispatch, useSelector } from "react-redux"
import { fetchPieChartData } from "../../redux/features/pieChartDataSlice";
import Loader from "../Loaders/Loader";

const PieChart = () => {


  const dispatch = useDispatch();

  const { monthIndex, month } = useSelector((state) => state.currentData.currentMonth);
  const pieChartDataObj = useSelector(state => state.pieChartData);
  const { chartData, isLoading, error } = pieChartDataObj || {};

  console.log("pieChartDataObj", pieChartDataObj);

  console.log("pieChartData", chartData);
 
  useEffect(() => {
    dispatch(fetchPieChartData({ monthIndex }));
  }, [month, dispatch]);

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
        <p>{error}</p>
      </div>
    )
  }


  return (
  <div className="w-screen min-h-screen bg-zinc-900 text-green-50 flex items-center justify-start gap-5">
    <div className="md:w-[800px] w-[400px] m-auto flex flex-col items-start justify-start gap-5 px-5">
      
      {/* Display the selected month */}
      <h1 className="text-xl font-bold text-slate-600">Category Wise : <span className="text-2xl uppercase font-bold text-slate-400">{month}</span></h1>
      {/* Pie chart component */}
      <div className="w-full m-auto bg-zinc-950 md:p-10 p-5 rounded-3xl border flex items-center justify-center">
        {chartData?.length !== 0 ? (
            // Render the BarChart
            <ResponsiveContainer width={730} height={250}>
            <RePieChart width={730} height={250}>
              <Pie data={chartData} dataKey="count" nameKey="_id" cx="50%" cy="50%" fill="#8884d8" label/>
              <Tooltip />
            </RePieChart>
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
  )
}

export default PieChart