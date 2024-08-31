import { assets } from "../assets/admin_assets/assets"
import { NavLink } from "react-router-dom"
function SideBar() {

    return (
        <div className="sidebar w-[18%] min-h-screen border-2 border-gray-600 border-t-0 text-[max(1vw,10px)] font-[Raleway] text-lg">
            <div className="sidebar-options pt-12 pl-[20%] flex flex-col gap-5">
                <NavLink to="/add" className="sidebar-option  focus:bg-gray-300 focus:border-2 hover:bg-gray-400 focus:border-amber-800 flex items-center gap-3 border-2 border-gray-600 border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer">
                    <img src={assets.add_icon} alt="" />
                    <p className="">Add Items</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option  focus:bg-gray-300 focus:border-2 hover:bg-gray-400 focus:border-amber-800 flex items-center gap-3 border-2 border-gray-600 border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to="/order" className="sidebar-option focus:bg-gray-300  focus:border-2 hover:bg-gray-400 focus:border-amber-800  flex items-center gap-3 border-2 border-gray-600 border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
            </div>

        </div>
    )
}


export default SideBar