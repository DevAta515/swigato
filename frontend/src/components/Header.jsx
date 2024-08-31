function Header() {

    return (
        <div className="header h-[34vw] my-7 mx-auto bg-header-image bg-no-repeat relative bg-contain">
            <div className="header-content flex absolute flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-[fadeIn_2.5s_ease-in] font-[Outfit] ">
                <h2 className="text-[max(3.5vw,22px)] font-[500] text-white ">Order from your favourite restaurants from here.</h2>
                <p className="text-white text-[1.2vw]" >Choose from a diverse menu featuring a delicious array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining.</p>
                <button className=" text-[#747474] font-semibold py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-3xl">View Menu</button>
            </div>
        </div>
    )
}


export default Header