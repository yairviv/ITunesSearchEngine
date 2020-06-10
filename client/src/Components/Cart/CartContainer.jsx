import React from 'react';
import Typography from '@material-ui/core/Typography';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import CartLogo from '../../assets/shopping-cart.svg';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import { removeItemFromCart } from '../../redux/actions/index';
import { removeItuneFromCart } from '../../redux/actions/index';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import './Cart.css'
const _ = require('lodash');

const mapStateToProps = (state) => {
    return { items: state.cart.items || [] }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeItemFromCart: (cartItem) => dispatch(removeItemFromCart(cartItem)),
    removeItuneFromCart: (cartItem) => dispatch(removeItuneFromCart(cartItem)),

});


function setTotalCost(items) {
    let totalCost = 0;
    for (let item of items) {
        totalCost += item[0].trackPrice * item.length;
    }

    return Math.round((totalCost + Number.EPSILON) * 100) / 100
}



function CartContainer(props) {
    const cartItemsObj = _.groupBy(props.items, 'trackId') || {};
    const cartItemsArray = Object.values(cartItemsObj);

    function RemoveClickHandler(item) {
        props.removeItemFromCart({ cartItem: item[0].trackId });
    }

    function DeleteClickHandler(item) {
        props.removeItuneFromCart({ cartItem: item[0].trackId });
    }
    return (
        <div>
            <div>
                <div className="cartImageWrapper">
                    <img className="cartImage" src={CartLogo} alt=''></img>
                    <Typography variant="h4" gutterBottom>
                        My Cart
                </Typography>
                </div>
                <div>
                    <ul>
                        {cartItemsArray.map(item =>
                            <div className="cartItemWrapper" key={cartItemsArray.indexOf(item)}>
                                <span className='cartItemSpan'>
                                    <CartItem cartItem={item}></CartItem>
                                </span>
                                <span>
                                    <div className="minusButton" >
                                        <Button onClick={() => RemoveClickHandler(item)} >
                                            <RemoveIcon></RemoveIcon>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button onClick={() => DeleteClickHandler(item)} >
                                            <RemoveShoppingCartRoundedIcon></RemoveShoppingCartRoundedIcon>
                                        </Button>
                                    </div>
                                </span>
                            </div>
                        )}
                    </ul>

                </div>
                <div>
                    <Typography variant="h4" gutterBottom>
                        Total amount: {setTotalCost(cartItemsArray)}$
                    </Typography>
                </div>
            </div>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)