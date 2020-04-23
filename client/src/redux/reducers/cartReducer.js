import { ADD_ITEM_TO_CART } from '../actions/index'
import initialState from './initialState'
function manageCart(cart = initialState.cart, action) {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            cart.items.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(cart))
            return {
                items:[...cart.items]
            };
        default: return cart
    }
}
export default manageCart;