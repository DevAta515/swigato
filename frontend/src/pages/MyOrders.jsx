import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { urlAtom, tokenAtom } from "../store/atoms";
import { assets } from "../assets/frontend_assets/assets";

function MyOrders() {
    const [data, setData] = useState([]);
    const url = useRecoilValue(urlAtom);
    const token = useRecoilValue(tokenAtom);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userOrders`,
                {},
                { headers: { "authorization": token } }
            );
            setData(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleTrack = () => {
        fetchOrders();
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders my-12 font-[Outfit]">
            <h2 className="text-4xl font-semibold">My Orders</h2>
            <div className="container flex flex-col gap-5 mt-7">
                {data.map((order, index) => (
                    <div
                        key={index}
                        className="my-orders-order grid grid-cols-my-order items-center gap-7 py-2 px-5 text-lg text-gray-800 border-2 border-amber-950"
                    >
                        <img
                            src={assets.parcel_icon}
                            className="w-12"
                            alt="Parcel Icon"
                        />
                        <p>
                            {order.items.map((item, index) => (
                                <span key={index}>
                                    {item.name} x {item.quantity}
                                    {index < order.items.length - 1 && " , "}
                                </span>
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p>
                            <span className="text-amber-400">&#x25fc;</span>
                            <b>{order.status}</b>
                        </p>
                        <button
                            className="p-2 bg-pink-100 text-sm font-gray-800 hover:bg-pink-200 rounded-lg"
                            onClick={handleTrack}
                        >
                            Track Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
