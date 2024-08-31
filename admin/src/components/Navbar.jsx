import { assets } from "../assets/admin_assets/assets"
function Navbar() {

    return (
        <div className="navbar flex justify-between items-center py-2 px-[4%]">
            <img src={assets.logo} alt="" className="logo w-[max(10%,80px)]" />
            <img src={assets.profile_image} alt="" className="profile w-10" />
        </div>
    )
}


export default Navbar