import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function List({ url }) {
    const [foodList, setFoodList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.list);
            } else {
                toast.error(response.data.error, { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Failed to fetch the list", { autoClose: 1000 });
        }
    };

    const removeFood = async (id) => {
        try {
            await axios.delete(`${url}/api/food/remove`, { data: { id } });
            await fetchList();
            toast.success("Item Removed", { autoClose: 1000 });
        } catch (error) {
            toast.error("Failed to remove the item", { autoClose: 1000 });
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="flex flex-col gap-5 list add font-[Raleway] w-full px-10">
            <h1 className="text-3xl text-center font-semibold mt-8 mb-2">All Food List</h1>
            <div className="list-table">
                <div className="list-table-format title bg-gray-300 grid grid-cols-list items-center gap-3 py-3 px-4 border-2 border-t-2 border-gray-500 text-lg w-full ">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {foodList.length > 0 ? (
                    foodList.map((item, index) => (
                        <div key={index} className="list-table-format grid grid-cols-list items-center gap-3 py-3 px-4 border-2 border-t-0 border-gray-500 text-lg w-full">
                            <img src={`${url}/images/` + item.image} alt="" className="w-14" />
                            <p>{item.name}</p>
                            <p className="c">{item.category}</p>
                            <p className="c">${item.price}</p>
                            <p className="cursor-pointer text-red-500" onClick={() => removeFood(item._id)}>X</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-4">No items available</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default List;
