import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import LoginDialog from './../user/LoginDialog'
import UserSideBar from '../Common/UserSideBar';
import SettingsModal from './SettingsModal';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Common.css'
const mapStateToProps = (state) => {
  return { cart: state.cart || { items: [] } }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  cartButton: {
    color: 'white'
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    color: 'lightgrey'
  },
}))(Badge);

function AppHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SettingsModal></SettingsModal>

          <div className={classes.title}>
            <Link className='homeLink' to={{ pathname: '/' }} >
              <Typography variant="h6">
                ITunes search engine
          </Typography>
            </Link>
          </div>

          <Link to={{ pathname: '/cart' }}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={props.cart.items.length}>
                <ShoppingCartIcon className={classes.cartButton} />
              </StyledBadge>
            </IconButton>
          </Link>


          <UserSideBar></UserSideBar>
          <LoginDialog></LoginDialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(mapStateToProps, null)(AppHeader);