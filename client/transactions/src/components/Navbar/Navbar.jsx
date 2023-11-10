import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-zinc-950 flex items-center justify-between md:h-20 h-16 md:px-20 px-10 text-slate-300">
      <div className="text-3xl font-bold">TansacData</div>
      <div className="flex gap-4 font-bold">
        <NavLink to='/' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Table</NavLink>
        <NavLink to='/statistics' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Statistics</NavLink>
        <NavLink to='/barchart' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Bar Chart</NavLink>
      </div>
    </div>
  )
}

export default Navbar