import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({ url }) {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "Salad",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", Number(data.price));
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: 0,
                    category: "Salad",
                });
                setImage(null);
                toast.success("Food Added", { autoClose: 1000 });
            } else {
                toast.error(response.data.error, { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Error submitting the form", { autoClose: 1000 });
        }
    };

    return (
        <div className="add w-[70%] ml-[max(5vw,25px)] mt-12 text-gray-800 font-[Raleway]">
            <h1 className="text-4xl my-4 text-center font-semibold">Add Item Details</h1>
            <form className="gap-4 flex-col flex" onSubmit={handleOnSubmit}>
                <div className="add-image-upload flex-col flex">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            className="w-[120px] cursor-pointer"
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-prod-name flex-col flex w-[max(40%,280px)]">
                    <p>Product Name</p>
                    <input
                        onChange={handleOnChange}
                        value={data.name}
                        name="name"
                        className="py-2 px-3 border border-gray-300 rounded"
                        type="text"
                        placeholder="Type Here"
                    />
                </div>
                <div className="add-prod-desc flex-col flex w-[max(40%,280px)]">
                    <p>Description</p>
                    <textarea
                        onChange={handleOnChange}
                        value={data.description}
                        className="py-2 px-3 border border-gray-300 rounded"
                        name="description"
                        placeholder="Write here"
                        rows="3"
                    />
                </div>
                <div className="add-category-price gap-6 flex">
                    <div className="add-category flex flex-col">
                        <p>Product Category</p>
                        <select
                            className="max-w-[120px] p-2 border border-gray-300 rounded"
                            name="category"
                            value={data.category}
                            onChange={handleOnChange}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={handleOnChange}
                            value={data.price}
                            name="price"
                            className="max-w-[120px] p-2 border border-gray-300 rounded"
                            type="number"
                            placeholder="$10"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="add-btn max-w-[120px] bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Add;
