import React from 'react';
import Divider from '@material-ui/core/Divider';
import './Cart.css'


function CartItem(props) {

    return (
        <div>
            <div className="carItemDetailsWrapper">
                <span>
                    <img src={props.cartItem[0].artworkUrl100} />
                </span>
                <span className='cartItemDetail'>{props.cartItem[0].trackName}</span>
                <span className='cartItemDetail'>Quantity: {props.cartItem.length}</span>
                <span className='cartItemDetail'>Price: {props.cartItem[0].trackPrice}$</span>
                <span className='cartItemDetail'> Total Price: {props.cartItem[0].trackPrice * props.cartItem.length}$</span>
            </div>
            <Divider variant="middle" />
        </div>
    );
}
export default CartItem;