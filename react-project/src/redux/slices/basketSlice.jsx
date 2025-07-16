import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';


const getBasketFromStorage = () => {
    if (localStorage.getItem('basket')) {
        return JSON.parse(localStorage.getItem('basket'))
    }
    return [];
}


const initialState = {
    product: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0

}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket)); 
}




export const basketSlice= createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.product && state.product.find((product) => product.id === action.payload.id);
            if (findProduct) {
                const extractedProducts = state.product.filter((product)=> product.id != action.payload.id);
                
                findProduct.count = findProduct.count + action.payload.count;
                state.product = [...extractedProducts, findProduct];
                writeFromBasketToStorage(state.product);
            }
            else {
                state.product = [ ...state.product, action.payload ];
                writeFromBasketToStorage(state.product);    
            }},
            setDrawer  : (state) => {
                state.drawer = !state.drawer;
            },
            calculateBasket: (state) => {
            state.totalAmount = 0; // ← işte bu eksikti
            state.product && state.product.map((product) => {
            state.totalAmount += product.price * product.count; // çarpan ekledim
    })
},
            removeFromBasket: (state, action) => {
            const productId = action.payload;

            const updatedProducts = state.product.map((item) => {
                if (item.id === productId) {
                if (item.count > 1) {
                    return { ...item, count: item.count - 1 };
                }
                return null; // tamamen silinecek
                }
                return item;
            }).filter(Boolean); // null olanları at

            state.product = updatedProducts;
            writeFromBasketToStorage(state.product);
            }


        }})       
    
    

export const { addToBasket, setDrawer, calculateBasket, removeFromBasket } = basketSlice.actions

export default basketSlice.reducer