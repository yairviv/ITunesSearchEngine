import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { createUser } from '../../redux/actions/index';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

const mapDispatchToProps = (dispatch, ownProps) => ({
    createUser: (userName) => dispatch(createUser(userName)),
});
function RegisterDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [userItem, setUserItem] = useState('');
    const [passwordItem, setPasswordItem] = useState('');

    const [errorFlag, setErrorFlag] = useState(false);

    function userChangeHandler(e) {
        setUserItem(e.target.value);
    };

    function passwordChangeHandler(e) {
        setPasswordItem(e.target.value);
    };

    const handleClickOpen = () => {
        setErrorFlag(false);
        setOpen(true);
    };

    const handleSubscribeClose = () => {
        if (userItem.trim() !== '' && passwordItem.trim() !== '') {
            props.createUser({ userName: userItem, password: passwordItem });
            setErrorFlag(false);
            setOpen(false);
        } else {
            setErrorFlag(true);
        }
    };

    const handleCancleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
                Sign up
      </Button>
            <Dialog open={open} onClose={handleCancleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To enjoy better user experience from this website, please enter a user name here.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User Name"
                        type="email"
                        fullWidth
                        onChange={userChangeHandler}
                    />
                    {errorFlag > 0 &&
                        <div>
                            <Alert severity="error">Pleas fill in user name</Alert>
                        </div>
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="email"
                        fullWidth
                        onChange={passwordChangeHandler}
                    />
                    {errorFlag > 0 &&
                        <div>
                            <Alert severity="error">Pleas fill in Password</Alert>
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubscribeClose} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(RegisterDialog)