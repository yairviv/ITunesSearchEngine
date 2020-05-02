import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { addItemToCart } from '../../redux/actions/index';
import { connect } from 'react-redux';
import CartLogo from '../../assets/shopping-cart.svg';
import './Cart.css'


function CartItem(props) {

    return (
        <div className="carItemDetailsWrapper">
            <span className="cartItemDetail">
                <img src={props.cartItem[0].artworkUrl100} />
            </span>
            <span>{props.cartItem[0].trackName}</span>
            <span>Quantity:{props.cartItem.length}</span>
        </div>
    );
}
export default CartItem;