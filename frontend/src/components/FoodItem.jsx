import { useEffect, useState, startTransition } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { cartAtom, tokenAtom, urlAtom, cartSelector } from "../store/atoms";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";

function FoodItem({ id, name, description, price, image }) {
    const [cartItem, setCart] = useRecoilState(cartAtom);  // Get the cart state
    const cartLoadable = useRecoilValueLoadable(cartSelector);  // Get the loadable state for cartSelector
    const token = useRecoilValue(tokenAtom);
    const url = useRecoilValue(urlAtom);

    useEffect(() => {
        if (cartLoadable.state === 'hasValue') {
            setCart(cartLoadable.contents);  // Set new cart data
        } else if (cartLoadable.state === 'loading') {
            console.log('Loading cart data...');
        } else if (cartLoadable.state === 'hasError') {
            console.error('Error loading cart data:', cartLoadable.contents);
        }
    }, [cartLoadable, setCart]);
    const updateAdd = async () => {
        if (token) {
            try {
                await axios.post(`${url}/api/cart/addCart`, { id }, { headers: { "authorization": token } });
                startTransition(() => {
                    setCart(prevCart => ({
                        ...prevCart,
                        [id]: (prevCart[id] || 0) + 1
                    }));
                });
                console.log("Item added to cart");
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    const handleRemoveFromCart = async () => {
        if (token) {
            try {
                await axios.post(`${url}/api/cart/removeCart`, { id }, { headers: { "authorization": token } });
                startTransition(() => {
                    setCart(prevCart => {
                        const newCart = { ...prevCart };
                        if (newCart[id] > 1) {
                            newCart[id] -= 1;
                        } else {
                            delete newCart[id];
                        }
                        return newCart;
                    });
                });
                console.log("Item removed from cart");
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    return (
        <div className="food-item w-full m-auto rounded-[15px] shadow-sm shadow-[#000015] duration-300 animate-[fadeIn_1s_ease-in] font-[Outfit]">
            <div className="food-item-img-container relative">
                <img src={image} alt="" className="food-item-image rounded-tr-xl rounded-tl-xl w-full" />
                {
                    !cartItem[id] ? (
                        <img
                            src={assets.add_icon_white}
                            className="add w-12 absolute bottom-4 right-4 cursor-pointer rounded-[50%]"
                            onClick={updateAdd}
                            alt=""
                        />
                    ) : (
                        <div className="food-item-counter absolute bottom-4 right-4 flex items-center gap-3 p-2 rounded-[50px] bg-white">
                            <img className="w-8" onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="" />
                            <p>{cartItem[id]}</p>
                            <img onClick={updateAdd} src={assets.add_icon_green} alt="" />
                        </div>
                    )
                }
            </div>
            <div className="food-item-info p-5">
                <div className="food-item-name-rating flex justify-between items-center mb-4">
                    <p className="text-[20px] font-semibold">{name}</p>
                    <img src={assets.rating_starts} className="w-[100px]" alt="" />
                </div>
                <p className="food-item-desc text-[#676767] text-md">{description}</p>
                <p className="food-item-price text-red-400 text-lg font-semibold my-4">${price}</p>
            </div>
        </div>
    );
}

export default FoodItem;
