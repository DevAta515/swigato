
import { foodlistAtom } from "../store/atoms"
import { useRecoilValue } from "recoil"
import FoodItem from "./FoodItem"
function FoodDisplay({ category }) {
    const foodList = useRecoilValue(foodlistAtom);
    return (
        <div className="food-display mt-8 font-[Outfit]" id="food-display">
            <h2 className="font-[max(2vw,24px)] font-semibold text-3xl">Top Dishes near you.</h2>
            <div className="food-display-list grid grid-cols-15 mt-7 gap-7 gap-x-10">
                {foodList.map((item, index) => {
                    if (category === 'All' || category === item.category) {
                        // console.log(item._id);
                        return (<FoodItem id={item._id} key={index} description={item.description} price={item.price} name={item.name} image={item.image}></FoodItem>
                        )
                    }
                })}
            </div>
        </div >
    )
}


export default FoodDisplay