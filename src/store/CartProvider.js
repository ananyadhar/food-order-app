import CartContext from "./cart-context";   
import {useReducer} from 'react';

//this is the default state of the cart before adding
const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        //want to return true if the item we are currently looking at is the same id 
        //which is already present in the cart
        //it will act as a plus if user wants to add the item which is already in the cart.
        //and return the index via findIndex() Method
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        //this will add the amount to the already existing item in the cart
        //if user has added one more

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
         //updatedItems will have the newly created array 
         //where the existing items will be copied
         updatedItems = [...state.items];
         updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
        updatedItems = state.items.concat(action.item);
    }


    return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
    };
 }
    
    //for removing the items from the cart
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        //there are 2 scenarios
        //one is that we have to remove the item by one if the existing item is more than 1
        //second is we have to remove the whole item if the item is only one because it should not show zero items
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            //the array is updated with the new array
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
};

const CartProvider = props => {

const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;