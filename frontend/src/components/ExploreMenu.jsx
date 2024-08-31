import { menu_list } from "../assets/frontend_assets/assets"

function ExploreMenu({ category, setCategory }) {

    return (
        <>
            <div className='explore-menu flex flex-col gap-5 font-[Outfit] ' id="explore-menu">
                <h1 className="text-3xl font-semibold text-[#262626] ">Explore our menu</h1>
                <p className="explore-menu-text max-w-[60%] text-[#808080]" >Choose from a diverse menu featuring a delicious array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining.</p>
                <div className="explore-menu-list flex justify-between items-center gap-8 text-center my-5 overflow-x-scroll scrollbar-hide">
                    {menu_list.map((item, index) => {
                        return (
                            <div key={index} className="explore-menu-list-item"
                                onClick={() =>
                                    setCategory(prev => prev == item.menu_name ? "All" : item.menu_name)
                                }>
                                <img src={item.menu_image} className={`w-[7.5vw] min-w-[80px] cursor-pointer rounded-[50%] duration-200 ${category == item.menu_name ? "border-4 border-red-300 p-1" : ""}`} alt="" />
                                <p className="mt-3 text-[#747474] font-[max(1.4vw,16px)] cursor-pointer">{item.menu_name}</p>
                            </div>
                        )
                    })}

                </div>
                <hr className="my-3 h-1 bg-[#e2e2e2]" />
            </div>

        </>
    )
}


export default ExploreMenu