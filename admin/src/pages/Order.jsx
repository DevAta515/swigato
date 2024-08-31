import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

function Order({ url }) {
    const [orders, setOrders] = useState([]);

    const fetchAll = async () => {
        try {
            const response = await axios.get(`${url}/api/order/listOrders`);
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error("Error fetching orders", { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Error fetching orders", { autoClose: 1000 });
        }
    };

    const handleStatus = async (e, orderId) => {
        const newStatus = e.target.value;
        try {
            const response = await axios.post(`${url}/api/order/status`, { orderId, status: newStatus });
            if (response.data.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                toast.success("Order status updated successfully", { autoClose: 1000 });
            } else {
                toast.error("Failed to update order status", { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Error updating order status", { autoClose: 1000 });
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="order add p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Order Page</h3>
            <div className="order-list grid gap-8">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="order-item grid grid-cols-order items-start gap-7 border-2 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out"
                    >
                        <img
                            src={assets.parcel_icon}
                            alt="Parcel Icon"
                            className="w-16 h-16 object-contain"
                        />
                        <div className="flex flex-col">
                            <p className="order-item-food font-semibold text-lg text-gray-800">
                                {order.items.map((item, idx) =>
                                    idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                )}
                            </p>
                            <p className="order-item-name font-semibold mt-4 mb-2 text-gray-700">
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <div className="order-item-address mb-2 text-gray-600">
                                <p>{order.address.street},</p>
                                <p>
                                    {order.address.city}, {order.address.state},{" "}
                                    {order.address.country}, {order.address.zipcode}
                                </p>
                            </div>
                            <p className="order-item-phone text-gray-700">
                                {order.address.phone}
                            </p>
                        </div>
                        <div className="flex flex-col justify-between text-gray-700">
                            <p>Items: {order.items.length}</p>
                            <p>Amount: ${order.amount}</p>
                        </div>
                        <div>
                            <select
                                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-amber-700 focus:bg-white transition duration-200 ease-in-out"
                                onChange={(e) => handleStatus(e, order._id)}
                                value={order.status}
                            >
                                <option value="Food Processing" className="text-gray-700">
                                    Food Processing
                                </option>
                                <option value="Out For Delivery" className="text-gray-700">
                                    Out For Delivery
                                </option>
                                <option value="Delivered" className="text-gray-700">
                                    Delivered
                                </option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Order;
