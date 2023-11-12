// Import necessary dependencies from React and Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../../redux/features/statisticsSlice";
import Loader from "../Loaders/Loader";

// Functional component for the Statistics page
const Statistics = () => {

  // Redux setup
  const dispatch = useDispatch();
  const { monthIndex, month } = useSelector((state) => state.currentMonth.currentMonth);
  const statisSticsObj = useSelector((state) => state.statistics);
  const { isLoading, error, statisStics } = statisSticsObj || {};
  const { totalSoldItems, totalNotSoldItems, totalSaleAmount } = statisStics || {};

  // Fetch statistics on component mount or when the monthIndex changes
  useEffect(() => {
    dispatch(fetchStatistics({ monthIndex }));
  }, [month, dispatch]);

  // Render loading state if data is still loading
  if (isLoading) {
    return (
      <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
        <Loader />
      </div>
    );
  }

  // Render error state if there's an issue fetching data
  if (error) {
    return (
      <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
        <p>something went wrong: {error}</p>
      </div>
    );
  }

  // Render the Statistics page with fetched data
  return (
    <div className="bg-zinc-900 w-full min-h-screen text-slate-400 px-5">
      <div className="max-w-7xl mx-auto pt-10">
        <h1 className="md:text-3xl text-xl mb-10 font-bold uppercase">Statistics for <span className="text-slate-300">{month}</span></h1>
        <div className="flex flex-col items-start justify-start gap-5">
          <p className="md:text-xl text-sm text-slate-100 capitalize font-medium">Total Sale: ${totalSaleAmount}</p>
          <p className="md:text-xl text-sm text-slate-100 capitalize font-medium">Sold Items: {totalSoldItems}</p>
          <p className="md:text-xl text-sm text-slate-100 capitalize font-medium">Unsold Items: {totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
}

// Export the Statistics component
export default Statistics;
