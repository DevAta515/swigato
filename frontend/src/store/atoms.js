import { atom, selectorFamily, selector } from "recoil";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios"

// Atom to hold the list of food items
export const foodlistAtom = atom({
    key: "foodlistAtom",
    default: food_list,
});
export const urlAtom = atom({
    key: "urlAtom",
    default: "https://swigato-backend-r88e.onrender.com"
})
export const tokenAtom = atom({
    key: "tokenAtom",
    default: ""
})



// Atom to hold the cart items, where key is the item ID and value is the quantity
export const cartAtom = atom({
    key: "cartAtom",
    default: {},
});
export const cartSelector = selector({
    key: 'cartSelector',
    get: async ({ get }) => {
        const url = get(urlAtom);
        const token = localStorage.getItem("token"); // Ensure the token is retrieved correctly
        if (!token) {
            return {};
        }
        try {
            const response = await axios.get(`${url}/api/cart/getCart`, {
                headers: { "authorization": token } // Correctly place the headers object here
            });
            const cartData = response.data.cartData || {};
            return cartData;
        } catch (error) {
            console.error("Failed to fetch cart data:", error);
            return {};
        }
    },
});

export const billAtom = atom({
    key: "billAtom",
    default: 0
})

export const setBill = selector({
    key: "setBill",
    get: ({ get }) => {
        // You could use this to derive the bill directly if you want
        return get(billAtom);
    },
    set: ({ get, set }) => {
        const cart = get(cartAtom);
        const food_list = get(foodlistAtom);
        let total = 0;

        for (const item in cart) {
            if (cart[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    total += itemInfo.price * cart[item];
                }
            }
        }

        set(billAtom, total);
    },
});

// SelectorFamily to handle adding an item to the cart
export const addCart = selectorFamily({
    key: "addCart",
    get: (id) => ({ get }) => {
        const cart = get(cartAtom);
        return cart[id] || 0;
    },
    set: (id) => ({ get, set }) => {
        const cart = get(cartAtom);
        const newCart = { ...cart };

        if (newCart[id]) {
            newCart[id] += 1;
        } else {
            newCart[id] = 1;
        }

        set(cartAtom, newCart);
    },
});

// SelectorFamily to handle removing an item from the cart
export const removeCart = selectorFamily({
    key: "removeCart",
    get: (id) => ({ get }) => {
        const cart = get(cartAtom);
        return cart[id] || 0;
    },
    set: (id) => ({ get, set }) => {
        const cart = get(cartAtom);
        const newCart = { ...cart };

        if (newCart[id] > 1) {
            newCart[id] -= 1;
        } else {
            delete newCart[id];
        }
        set(cartAtom, newCart);
    },
});
