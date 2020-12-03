import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { createUser, resetUser } from '../../redux/actions/index';
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
    resetUser: () => dispatch(resetUser()),
});

const mapStateToProps = (state) => {
    return {
        userCreation: state.usersReducer || {
            type: '',
            message: ''
        }
    }
}


function RegisterDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [userItem, setUserItem] = useState('');
    const [passwordItem, setPasswordItem] = useState('');
    const [errorFlagUser, setErrorFlagUser] = useState(false);
    const [errorFlagPassword, setErrorFlagPassword] = useState(false);



    function userChangeHandler(e) {
        setUserItem(e.target.value);
    };

    function passwordChangeHandler(e) {
        setPasswordItem(e.target.value);
    };

    const handleClickOpen = () => {
        setErrorFlagUser(false);
        setErrorFlagPassword(false);
        setOpen(true);
    };

    function handleSubscribe() {
        if (userItem.trim() === '') {
            setErrorFlagUser(true);
            return;
        }
        if (passwordItem.trim() === '') {
            setErrorFlagPassword(true);
            return;
        }

        props.createUser({ userName: userItem, password: passwordItem });

    };

    const handleCancleClose = () => {
        setOpen(false);
    };

    const onEnter = () => {
        props.resetUser();
    }

    return (
        <div>
            <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
                Sign up
      </Button>
            <Dialog open={open} onClose={handleCancleClose} aria-labelledby="form-dialog-title" onEnter={onEnter}>
                <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
                {props.userCreation.type != 'ok' &&
                    <DialogContent>
                        <DialogContentText>
                            To enjoy better user experience from this website, please sign up.
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
                        {errorFlagUser == true &&
                            <div>
                                <Alert severity="error">Pleas fill in user name</Alert>
                            </div>
                        }
                        <TextField
                            margin="dense"
                            id="name"
                            label="Password"
                            type="email"
                            fullWidth
                            onChange={passwordChangeHandler}
                        />
                        {errorFlagPassword == true &&
                            <div>
                                <Alert severity="error">Pleas fill in Password</Alert>
                            </div>
                        }

                        {props.userCreation.type == 'alert-error' &&
                            <div>
                                <Alert severity="error">{props.userCreation.message} </Alert>
                            </div>
                        }
                    </DialogContent>
                }
                {props.userCreation.type == 'ok' &&
                    <DialogContent>User saved!</DialogContent>
                }
                <DialogActions>
                    {props.userCreation.type != 'ok' &&
                        <Button onClick={handleCancleClose} color="primary">
                            Cancel
          </Button>
                    }
                    {props.userCreation.type != 'ok' &&
                        <Button onClick={handleSubscribe} color="primary">
                            Sign up
          </Button>
                    }
                    {props.userCreation.type == 'ok' &&
                        <Button onClick={handleCancleClose} color="primary">
                            Close
          </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDialog)
