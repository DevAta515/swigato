import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { cartAtom, foodlistAtom, setBill, billAtom, urlAtom, tokenAtom } from "../store/atoms";

function PlaceOrder() {
    const foodlist = useRecoilValue(foodlistAtom);
    const cartList = useRecoilValue(cartAtom);
    const url = useRecoilValue(urlAtom);
    const token = localStorage.getItem("token");

    const updateBill = useSetRecoilState(setBill);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const bill = useRecoilValue(billAtom);
    const navigate = useNavigate();

    useEffect(() => {
        updateBill();
    }, [cartList, updateBill]);

    useEffect(() => {
        if (!token || bill === 0) {
            navigate('/cart');
        }
    }, [token, bill, navigate]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        const orderItems = foodlist
            .filter(item => cartList[item._id] > 0)
            .map(item => ({ ...item, quantity: cartList[item._id] }));

        const orderData = {
            address: data,
            items: orderItems,
            amount: bill + 2,
        };

        try {
            const response = await axios.post(
                `${url}/api/order/place`,
                orderData,
                { headers: { "authorization": token } }
            );

            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order");
        }
    };

    return (
        <form
            className="place-order flex items-start justify-between gap-12 mt-24 font-[Outfit]"
            onSubmit={placeOrder}
        >
            <div className="place-order-left w-full max-w-[max(30%,500px)]">
                <p className="text-4xl font-semibold mb-12">Delivery Information</p>
                <div className="multi-fields flex gap-2">
                    <input
                        required
                        name="firstName"
                        onChange={handleOnChange}
                        value={data.firstName}
                        type="text"
                        className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                        placeholder="First Name"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={handleOnChange}
                        value={data.lastName}
                        type="text"
                        className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                        placeholder="Last Name"
                    />
                </div>
                <input
                    required
                    name="email"
                    onChange={handleOnChange}
                    value={data.email}
                    type="email"
                    className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                    placeholder="Your email"
                />
                <input
                    required
                    name="street"
                    onChange={handleOnChange}
                    value={data.street}
                    type="text"
                    className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                    placeholder="Street"
                />
                <div className="multi-fields flex gap-2">
                    <input
                        required
                        name="city"
                        onChange={handleOnChange}
                        value={data.city}
                        type="text"
                        className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                        placeholder="City"
                    />
                    <input
                        required
                        name="state"
                        onChange={handleOnChange}
                        value={data.state}
                        type="text"
                        className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields flex gap-2">
                    <input
                        required
                        name="zipcode"
                        onChange={handleOnChange}
                        value={data.zipcode}
                        type="text"
                        className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                        placeholder="Pincode"
                    />
                    <input
                        required
                        name="country"
                        onChange={handleOnChange}
                        value={data.country}
                        type="text"
                        className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    name="phone"
                    onChange={handleOnChange}
                    value={data.phone}
                    type="text"
                    className="w-full p-2 border-r-2 border-l-2 border-b-2 outline-none text-black focus:border-2 focus:border-amber-700 border-amber-700 rounded-[4px] mb-3 text-sm shadow-sm shadow-red-800"
                    placeholder="Phone"
                />
            </div>
            <div className="place-order-right w-full max-w-[max(40%,500px)]">
                <div className="cart-total flex-1 flex flex-col gap-5">
                    <h2 className="text-4xl font-semibold">Total</h2>
                    <div className="cart-total-details flex justify-between text-gray-800">
                        <p>SubTotal</p>
                        <p>${bill}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="cart-total-details flex justify-between text-gray-800">
                        <p>Delivery Fee</p>
                        <p>$2</p>
                    </div>
                    <hr className="my-2" />
                    <div className="cart-total-details flex justify-between text-gray-800">
                        <p>Total</p>
                        <p>${bill + 2}</p>
                    </div>
                    <button
                        type="submit"
                        className="hover:bg-amber-300 hover:text-amber-900 duration-700 text-white bg-amber-700 w-[max(15vw,200px)] py-3 rounded-[4px] cursor-pointer mt-7"
                    >
                        Proceed to payment
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
