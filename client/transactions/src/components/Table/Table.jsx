// Import nessary dependencies
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monthData, categoryData } from "../../data";
import { fetchTransactions } from "../../redux/features/transactionsSlice";
import { nanoid } from "@reduxjs/toolkit";
import debounce from "../utils/debounce";
import Loader from "../Loaders/Loader";
import { setCurrentCategory, setCurrentMonth, setCurrentSoldFilter } from "../../redux/features/currentDataSlice";


// Debouncing the fetch
const debouncedFetch = debounce((dispatch, currentPage, searchedTerm, currentCategory, currentMonth, currentSoldFilter) => {
  dispatch(fetchTransactions({ currentPage, searchedTerm, currentCategory, currentMonth, currentSoldFilter }));
}, 1000);

const Table = () => {

  // Define state variables
  const [searchedTerm, setSearchedTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false)
  const [isNextDisabled, setIsNextDisabled] = useState(false)
  const [selectedSoldFilter, setSeletedSoldFilter] = useState('all')

  // Get the transactions data from the Redux store
  const currentCategory = useSelector((state)=> state.currentData.currentCategory);
  const { monthIndex, month } = useSelector((state) => state.currentData.currentMonth);
  const currentSoldFilter = useSelector((state)=> state.currentData.currentSoldFilter)
  const transactionsData = useSelector((state) => state.transactions)
  const { transactions, isLoading, error } = transactionsData || {};
  const {totalItemsFound, filteredData} = transactions || {};

  console.log(currentSoldFilter);


  // Get the current month from the Redux store
  const dispatch = useDispatch();

  // Fetch transactions on component mount
  useEffect(() => {

    // deboucing fetch funciton to reduce number of API calls while seaching
    debouncedFetch(dispatch, currentPage, searchedTerm, currentCategory, monthIndex,currentSoldFilter)

    // Calculating total number of pages
    const numberOfPages = Math.ceil(totalItemsFound / 10);

    // Setting the total number of pages after checking 
    setTotalPages(numberOfPages <= 10 ? numberOfPages : 10);

  }, [dispatch, currentCategory, searchedTerm, currentPage, monthIndex, totalItemsFound,currentSoldFilter ]);


  // Handle month selection
  const handleSelectedMonth = (e) => {

    // Get the selected month name and index
    const selectedMonthName = e.target.value;
    const selectedMonthIndex = e.target.options[e.target.selectedIndex].dataset.index;
  
    console.log(selectedMonthName);
    console.log(selectedMonthIndex);

    // Dispatch the action with the selected month information
    dispatch(setCurrentMonth({ month: selectedMonthName, monthIndex: selectedMonthIndex }));
  
  };

  // Handle page change
  const handlePageClick = useCallback((e) => {
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
  }, [isNextDisabled, isPreviousDisabled, totalPages])



  const handleSelectCategory = useCallback( (e) => {
    dispatch(setCurrentCategory(e.target.value))

  }, [dispatch])

  const handleSoldSelectChange = useCallback((e) => {
    setSeletedSoldFilter(e.target.value);
    dispatch(setCurrentSoldFilter(e.target.value))
  }, [dispatch])

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

      {/* Right side filters div */}
      <div className="flex items-center justify-center gap-2">

        {/* Selection for sold and available */}
        <div className="text-white flex items-center justify-center gap-2 ">
          <input checked={ selectedSoldFilter === 'all' ? true : false} onChange={handleSoldSelectChange} type="radio" className="soldselection" name="soldselection" value={'all'}/> All
          <input checked={ selectedSoldFilter === 'Sold' ? true : false} onChange={handleSoldSelectChange} type="radio" className="soldselection" name="soldselection" value={'Sold'}/> Sold
          <input checked={ selectedSoldFilter === 'Available' ? true : false} onChange={handleSoldSelectChange} type="radio" className="soldselection" name="soldselection" value={'Available'}/> Available
        </div>

        {/* Category Selection */}
        <div>
          <select 
          value={currentCategory}
          onChange={handleSelectCategory}
          name="month" id="month" className="border outline-none py-2 px-2 rounded-lg cursor-pointer bg-slate-200">
            <option key={'defaultOption'} value={''}>Select Category</option>

            {
              categoryData.map((category) => {
                return (
                  <option key={nanoid()} value={category} 
                  >
                    {category}
                  </option>
                )
              })
            }
          </select>
        </div>

        {/* Month Selection */}
        <div>
          <select 
          value={month}
          onChange={handleSelectedMonth}
          name="month" id="month" className="border outline-none py-2 px-2 rounded-lg cursor-pointer bg-slate-200">
            <option key={'defaultOption'} value={0} data-index={0}>Select Month</option>
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

    </div>

    {
      // Display message if no data found
          filteredData &&
          filteredData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>No data found, try something else</p>
            </div>
      )
      :
      (
            <>
            {/* Else Render the table */}

              {/* Table */}
              <table className="w-full text-slate-500 px-5">

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
                  filteredData?.length == 0 ?
                  
                  // Display a message if no data is found
                    (
                      <div>
                        No data found...
                      </div>
                    )

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

            </>
      )
    }

    {/* Pagination */}
    {
      filteredData?.length !== 0 && 
    <div className="w-full my-20 px-2">
      <ul className="flex justify-center gap-5 py-2 px-2 bg-slate-500 rounded-2xl">

          {
            // Disable previous button if currentPage is 1
            !isPreviousDisabled && (
            <li 
            className={`rounded-full md:px-4 px-2 py-2 active:translate-y-1 duration-300 hover:bg-gray-600 cursor-pointer font-bold text-slate-200`}
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
            className={`rounded-full md:px-4 px-2 py-2 active:translate-y-1 duration-300 hover:bg-gray-600 cursor-pointer font-bold text-slate-200 ${index + 1 === currentPage ? "bg-slate-700" : "bg-slate-500"} `}
            onClick={handlePageClick}
            key={index} value={index + 1}>{index + 1}</li>
          ))

        }

          {

            // Disable next button if currentPage is totalPages
            !isNextDisabled && (
              <li 
              className={`rounded-full pt-2 md:px-4 px-2 active:translate-y-1 duration-300 hover:bg-gray-600 cursor-pointer font-bold text-slate-200`}
              onClick={handlePageClick}
              value={currentPage + 1}
              >  
              {'>'}
            </li>
            )
          }
      </ul>
    </div>
    }
  </div>
)
}

export default Table