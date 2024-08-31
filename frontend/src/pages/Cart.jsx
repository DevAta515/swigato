import { foodlistAtom, cartAtom, removeCart, billAtom, setBill } from "../store/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const foodlist = useRecoilValue(foodlistAtom);
    const cartList = useRecoilValue(cartAtom);
    const updateBill = useSetRecoilState(setBill);
    const bill = useRecoilValue(billAtom);
    const navigate = useNavigate();

    useEffect(() => {
        updateBill();
    }, [cartList, updateBill]);

    return (
        <div className="cart font-[Outfit] mt-24">
            <div className="cart-items">
                <div className="cart-items-title grid grid-cols-cart items-center text-gray-400 text-[max(1vw,12px)]">
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr className="h-[1px] bg-[#e2e2e2]" />
                {foodlist.map((item) => {
                    const setRemoveFromCart = useSetRecoilState(removeCart(item._id));

                    if (cartList[item._id] > 0) {
                        return (
                            <div key={item._id} className="cart-items-item my-2 text-black grid grid-cols-cart items-center text-[max(1vw,12px)]">
                                <img className="w-12" src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{cartList[item._id]}</p>
                                <p>${item.price * cartList[item._id]}</p>
                                <p
                                    onClick={() => setRemoveFromCart()}
                                    className="cross cursor-pointer"
                                >
                                    X
                                </p>
                                <hr className="h-[1px] bg-[#e2e2e2]" />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom mt-20 flex justify-between gap-[max(12vw,20px)]">
                <div className="cart-total flex-1 flex flex-col gap-5">
                    <h2 className="text-4xl font-semibold">Total</h2>
                    <div className="cart-total-details flex justify-between text-gray-900">
                        <p>SubTotal</p>
                        <p>${bill}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="cart-total-details flex justify-between text-gray-900">
                        <p>Delivery Fee</p>
                        <p>$2</p>
                    </div>
                    <hr className="my-2" />
                    <div className="cart-total-details flex justify-between text-gray-900">
                        <p>Total</p>
                        <p>${bill + 2}</p>
                    </div>
                    <button
                        className="hover:bg-amber-300 hover:text-amber-900 duration-700 text-white bg-amber-700 w-[max(15vw,200px)] py-3 rounded-[4px] cursor-pointer"
                        onClick={() => {
                            if (bill > 0) {
                                navigate("/place-order");
                            }
                        }}
                    >
                        Proceed to place
                    </button>
                </div>
                <div className="cart-promocode flex-1">
                    <div>
                        <p className="text-gray-500">If you have a promo code, enter it here</p>
                        <div className="cart-promocode-input mt-2 flex justify-between items-center bg-white rounded-[4px]">
                            <input
                                className="bg-gray-200 py-2 outline-none pl-2"
                                type="text"
                                placeholder="PromoCode"
                            />
                            <button
                                className="hover:bg-amber-300 hover:text-amber-900 duration-700 w-[max(10vw,150px)] py-2 px-1 bg-amber-700 text-white rounded-[4px]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
