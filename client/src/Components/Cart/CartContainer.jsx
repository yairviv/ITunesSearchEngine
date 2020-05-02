import React from 'react';
import Typography from '@material-ui/core/Typography';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import CartLogo from '../../assets/shopping-cart.svg';
import './Cart.css'
const _ = require('lodash');

const mapStateToProps = (state) => {
    return { items: state.cart.items || [] }
}



function CartContainer(props) {
    const cartItemsObj = _.groupBy(props.items, 'trackId') || {};
    const cartItemsArray = Object.values(cartItemsObj);
    var temp = '';
    return (
        <div>
            <div className="cartImageWrapper">
                <img className="cartImage" src={CartLogo}></img>
                <Typography variant="h4" gutterBottom>
                    My Cart
                </Typography>
                <div className="cartItemsWrapper">
                    <ul>
                        {cartItemsArray.map(item =>
                            <CartItem key={cartItemsArray[cartItemsArray.indexOf(item)]} cartItem={item}></CartItem>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default connect(mapStateToProps,
    null
)(CartContainer);