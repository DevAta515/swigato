import ExploreMenu from "../components/ExploreMenu"
import Header from "../components/Header"
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";
import { useState } from "react"

function Home() {
    const [category, setCategory] = useState("All");
    return (
        <div>
            <Header></Header>
            <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
            <FoodDisplay category={category}></FoodDisplay>
            <AppDownload></AppDownload>
        </div>
    )
}


export default Home