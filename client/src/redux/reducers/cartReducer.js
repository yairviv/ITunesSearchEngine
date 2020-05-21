import { ADD_ITEM_TO_CART } from '../actions/index'
import { REMOVE_ITEM_FROM_CART } from '../actions/index'
import { REMOVE_ITUNE_FROM_CART } from '../actions/index'

import initialState from './initialState'
function manageCart(cart = initialState.cart, action) {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            cart.items.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(cart))
            return {
                items: [...cart.items]
            };
        case REMOVE_ITEM_FROM_CART:
            let iTune = cart.items.find(item => item.trackId == action.payload.cartItem)
            let index = cart.items.indexOf(iTune);
            cart.items.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart))
            return {
                items: [...cart.items]
            };
        case REMOVE_ITUNE_FROM_CART:
            cart.items = cart.items.filter(item => item.trackId != action.payload.cartItem)
            localStorage.setItem('cart', JSON.stringify(cart))
            return {
                items: [...cart.items]
            };
        default: return cart
    }
}
export default manageCart;