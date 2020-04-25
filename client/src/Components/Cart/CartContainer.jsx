import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { addItemToCart } from '../../redux/actions/index';
import { connect } from 'react-redux';
import './Song.css'


const useStyles = makeStyles({
    cartButton: {
        width: '70px',
        maxWidth: 500,
        height: '70px',
    },
});

function CartContainer(props) {

    return (
        <div>
        </div>
    );
}
export default CartContainer