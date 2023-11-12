import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStatistics } from "../../redux/features/statisticsSlice";
import Loader from "../Loaders/Loader";


const Statistics = () => {

  const dispatch = useDispatch();
  
  const {monthIndex, month} = useSelector((state) => state.currentMonth.currentMonth);
  const statisSticsObj = useSelector((state) => state.statistics);
  const {isLoading, error, statisStics} = statisSticsObj || {};
  const {totalSoldItems, totalNotSoldItems, totalSaleAmount} = statisStics || {};
  
  
    useEffect(() => {
      dispatch(fetchStatistics({ monthIndex }))
    }, [ month, dispatch]);

  if (isLoading) {
    return (
        <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
          <Loader/>
        </div>
      )
  }

  if (error) {
    return (
        <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
          <p>something went wrong: {error}</p>
        </div>
      )
  }

  return (
    <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
      <div className="max-w-7xl mx-auto pt-10">
        <h1 className="text-3xl mb-10 font-bold">Statistics for {month}</h1>
        <div className="flex flex-col items-start justify-start gap-5">
          <p className="text-xl">Total Sale: ${totalSaleAmount}</p>
          <p className="text-xl">Sold Items: {totalSoldItems}</p>
          <p className="text-xl">Unsold Items: {totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  )
}

export default Statistics