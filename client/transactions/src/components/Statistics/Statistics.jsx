import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Statistics = () => {


  const [totalSale, setTotalSale] = useState(0)
  const [numOfSoldItems, setNumOfSoldItems] = useState(0)
  const [numberOfUnsoldItems, setNumberOfUnsoldItems] = useState(0)

  const transationData = useSelector((state) => state.transactions.transactions)

  useEffect(() => {
    
    let totalSoldArr = transationData.filter((product) =>  product.sold === true);
    let totalSoldAmount = totalSoldArr.reduce((total, product) => total + product.price, 0)

    setNumOfSoldItems(totalSoldArr.length)
    setNumberOfUnsoldItems(transationData.length - totalSoldArr.length)
    setTotalSale(Math.floor(totalSoldAmount))

  }, [transationData])


  console.log(transationData);

  return (
    <div className="bg-zinc-900 w-full min-h-screen text-slate-400">
      <div className="max-w-7xl mx-auto pt-10">
        <h1 className="text-3xl mb-10 font-bold">Statistics</h1>
        <div className="flex flex-col items-start justify-start gap-5">
          <p className="text-xl">Total Sale: ${totalSale}</p>
          <p className="text-xl">Sold Items: {numOfSoldItems}</p>
          <p className="text-xl">Unsold Items: {numberOfUnsoldItems}</p>
        </div>
      </div>
    </div>
  )
}

export default Statistics