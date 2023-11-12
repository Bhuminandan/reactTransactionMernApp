// Import nessary dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monthData } from "../../data";
import { fetchTransactions } from "../../redux/features/transactionsSlice";
import { nanoid } from "@reduxjs/toolkit";
import debounce from "../utils/debounce";
import Loader from "../Loaders/Loader";
import { setCurrentMonth } from "../../redux/features/currentMonthSlice";


// Debouncing the fetch
const debouncedFetch = debounce((dispatch, currentPage, searchedTerm) => {
  dispatch(fetchTransactions({ currentPage, searchedTerm }));
}, 1000);

const Table = () => {

  // Define state variables
  const [searchedTerm, setSearchedTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  // Get the transactions data from the Redux store
  const transactionsData = useSelector((state) => state.transactions)
  const { transactions, isLoading, error } = transactionsData || {};
  const {totalItemsFound, filteredData} = transactions || {};

  // Get the current month from the Redux store
  const dispatch = useDispatch();
  const { monthIndex} = useSelector((state) => state.currentMonth.currentMonth);

  // Fetch transactions on component mount
  useEffect(() => {
    debouncedFetch(dispatch, currentPage, searchedTerm)
    setTotalPages(Math.ceil(totalItemsFound / 10))
  }, [dispatch, currentPage, searchedTerm])


  // Handle month selection
  const handleSelectedMonth = (e) => {

    // Get the selected month name and index
    const selectedMonthName = e.target.value;
    const selectedMonthIndex = e.target.options[e.target.selectedIndex].dataset.index;
  
    // Dispatch the action with the selected month information
    dispatch(setCurrentMonth({ month: selectedMonthName, monthIndex: selectedMonthIndex }));
  
  };

  // Handle page change
  const handlePageClick = (e) => {
    if (e.target.value <= 1) {
      setCurrentPage(e.target.value)
      setIsPreviousDisabled(true)
      return;
    }
    
    if (e.target.value >= totalPages) {
      setCurrentPage(e.target.value)
      setIsNextDisabled(true)
      return;
    }

    if (isNextDisabled || isPreviousDisabled) {
      setIsNextDisabled(false)
      setIsPreviousDisabled(false) 
    }
    setCurrentPage(e.target.value)
  }

  // Handling if the data is loading
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader/>
      </div>
    )
  }

  // Handling if there is an error
  if(error) {
    return (
      <div>
        {error}
      </div>
    )
  }

  // Render the table
 return (
  <div className="bg-zinc-950 border rounded-2xl py-5 shadow-xl shadow-zinc-500 m-auto max-w-[1050px] min-h-screen px-10  overflow-x-scroll">


    {/* Search bar and month selection div */}
    <div className="flex flex-wrap gap-5 justify-between w-full py-5">

      {/* Search Bar */}
      <div>
        <input 
        type="text"
        placeholder="search for transaction"
        className="border outline-none py-2 px-2 rounded-xl font-semibold w-96 bg-slate-200"
        onChange={(e) => setSearchedTerm(e.target.value)}
        value={searchedTerm}
        />
      </div>

      {/* Month Selection */}
      <div>
        <select 
        value={monthData[monthIndex-1].month}
        onChange={handleSelectedMonth}
        name="month" id="month" className="border outline-none py-2 px-2 rounded-lg cursor-pointer bg-slate-200">

          {
            monthData.map(({ monthIndex, month }, index) => {
              return (
                <option key={index} value={month} data-index={monthIndex}
                >
                  {month}
                </option>
              )
            })
          }
        </select>
      </div>

    </div>

    {/* Table */}
    <table className="w-full text-slate-500">

      {/* Table Header */}
      <thead>

        {/* Table Row */}
        <tr className="overflow-hidden text-slate-800 uppercase hover:bg-slate-300 duration-300 ">
          <th className=" bg-slate-200 px-4 py-2 hover:bg-slate-300 rounded-tl-md duration-300 ">Id</th>
          <th className="bg-slate-200 px-4 py-2 hover:bg-slate-300 duration-300 ">Title</th>
          <th className="bg-slate-200 px-4 py-2 hover:bg-slate-300 duration-300 ">Description</th>
          <th className="bg-slate-200 px-4 py-2 hover:bg-slate-300 duration-300 w-24">Price</th>
          <th className="bg-slate-200 px-4 py-2 hover:bg-slate-300 duration-300 ">Category</th>
          <th className="bg-slate-200 px-4 py-2 hover:bg-slate-300 duration-300 ">Sold</th>
          <th className=" hover:bg-slate-300 duration-300 rounded-tr-md bg-slate-200 px-4 py-2">Image</th>
        </tr>

      </thead>

      {/* Table Body */}
      <tbody className="text-slate-200 p-4">

        {
          filteredData?.length === 0 ?
          
          // Display a message if no data is found
          <div className="flex items-center justify-center w-full mt-10">
            <p className="md:text-xl text-md font-semibold text-slate-500">No data found, Try searching for something else...</p>
          </div>

          :

          // Mapping the data to create rows
          filteredData?.map((transaction) => {
            return (
              <tr key={nanoid()} className="p-4 text-start">
                <td className="border-2 border-zinc-700 p-4 text-xl font-bold">{transaction.id}</td>
                <td className="border-2 border-zinc-700 p-4 font-semibold w-56">{transaction.title}</td>
                <td className="border-2 border-zinc-700 p-4 text-xs">{transaction.description}</td>
                <td className="border-2 border-zinc-700 text-center w-20 font-semibold">${transaction.price}</td>
                <td className="border-2 border-zinc-700 p-4">{transaction.category}</td>
                <td className={`border-2 border-zinc-700 p-4 text-center ${ !transaction.sold ? "text-green-500 " : "text-red-500 " }`}>

                  <p className={!transaction.sold ? "rounded-full text-white p-2 font-bold bg-green-500 " : "rounded-full text-white p-2 font-bold bg-red-500 "}>{transaction.sold ? "SOLD" : "AVAILABLE"}</p>

                </td>
                <td className="border-2 border-zinc-700 p-4 w-56">
                  <img src={transaction.image} alt="transaction img" className="w-full object-cover rounded-lg"/>
                </td>
              </tr>
            )
          })
        }


      </tbody>

    </table>

    {/* Pagination */}
    <div className="w-full my-20">
      <ul className="flex justify-center gap-5 py-2 px-4 bg-slate-500 rounded-2xl">

          {
            // Disable previous button if currentPage is 1
            !isPreviousDisabled && (
            <li 
            className={`rounded-full px-4 py-2 active:translate-y-1 duration-300 hover:bg-gray-600 cursor-pointer font-bold text-slate-200`}
            onClick={handlePageClick}
            value={currentPage - 1}
            >  
            {'<'}
          </li>
            )
          }
        {

          // Create pagination buttons
          Array.from({ length: totalPages }, (_, index) => (
            <li 
            className={`rounded-full px-4 py-2 active:translate-y-1 duration-300 hover:bg-gray-600 cursor-pointer font-bold text-slate-200 ${index + 1 === currentPage ? "bg-slate-700" : "bg-slate-500"} `}
            onClick={handlePageClick}
            key={index} value={index + 1}>{index + 1}</li>
          ))

        }

          {

            // Disable next button if currentPage is totalPages
            !isNextDisabled && (
              <li 
              className={`rounded-full px-4 py-2 active:translate-y-1 duration-300 hover:bg-gray-600 cursor-pointer font-bold text-slate-200`}
              onClick={handlePageClick}
              value={currentPage + 1}
              >  
              {'>'}
            </li>
            )
          }
      </ul>
    </div>


  </div>
)
}

export default Table