import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getSongsList } from '../../redux/actions/index';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => ({
    getSongs: (item) => dispatch(getSongsList(item)),
});

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function UserSideBar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const [item, setItem] = useState('');
    useEffect(() => {
        if (item.trim() != '') {
            props.getSongs(item);
        }
    }, [item]);
    async function SearchClickHandler(e) {
        setItem(e.target.textContent);

    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (

        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {JSON.parse(localStorage.getItem('userItems')) != undefined &&
                <div>
                    <List>
                        {JSON.parse(localStorage.getItem('userItems')).items.map((item) => (
                            <ListItem button key={item.name} onClick={SearchClickHandler}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            }
        </div>
    );

    return (
        <div>
            <Button color='inherit' onClick={toggleDrawer('left', true)}>My Searches</Button>
            <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(UserSideBar)