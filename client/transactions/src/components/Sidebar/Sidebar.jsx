import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/features/sideBarSlice";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; 
import { useEffect, useRef } from "react";


const Sidebar = () => {

    const dispatch = useDispatch();
    const sideRef = useRef();

        // Toggle side menu on click of anywhere outside the side menu
        useEffect(() => {

            // Add event listener to body to detect clicks outside the side menu
            const bodyListener = document.body.addEventListener('click', (e) => {
    
                // checking if the event contains the sidebar, if so then toggling the sidemenu
                if (e.target.contains(sideRef.current)) {
                    dispatch(toggleSidebar())
                }
    
            })
    
            // Clean up
            return bodyListener;
        }, [sideRef, dispatch])


    const handleToggleSideBar = () => {
        dispatch(toggleSidebar());
    }

  return (
    <div
    className="bg-zinc-950 w-screen min-h-screen absolute bg-opacity-50 z-20 cursor-pointer">
        <motion.div 
            ref={sideRef}

            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 0.3 }}
        className="w-2/3 min-h-screen bg-zinc-900 flex flex-col items-start justify-start p-10">
            <div className="w-full flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold text-slate-200">T.IO</h1>
                </div>
                <div 
                onClick={handleToggleSideBar}
                className="cursor-pointer p-2 rounded-full hover:bg-slate-600 duration-300 transition-all">
                    <IoCloseSharp className="text-3xl text-slate-400"/>
                </div>
            </div>
            <div>
            <div className="w-full flex flex-col items-start justify-start gap-5 text-xl font-medium text-slate-400 mt-5">
                <NavLink onClick={() => dispatch(toggleSidebar())} to='/' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Table</NavLink>

                <NavLink onClick={() => dispatch(toggleSidebar())} to='/statistics' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Statistics</NavLink>

                <NavLink onClick={() => dispatch(toggleSidebar())} to='/barchart' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Bar Chart</NavLink>

                <NavLink onClick={() => dispatch(toggleSidebar())} to='/piechart' className={({ isActive }) => isActive ? "text-slate-300" : "text-slate-500"}>Pie Chart</NavLink>
            </div>
            </div>
        </motion.div>
    </div>
  )
}

export default Sidebar