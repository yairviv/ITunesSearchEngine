import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { login } from '../../redux/actions/index';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: (user) => dispatch(login(user)),
});


const mapStateToProps = (state) => {
    return {
        loginStatus: state.loginReducer || {
            type: '',
            message: ''
        }
    }
}
function LoginDialog(props) {
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
        setErrorFlagUser(false);
        if (passwordItem.trim() === '') {
            setErrorFlagPassword(true);
            return;
        }
        setErrorFlagPassword(false);
        props.login({ userName: userItem, password: passwordItem });

    };

    const handleCancleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
                Login
      </Button>
            <Dialog open={open} onClose={handleCancleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                {props.loginStatus.type != 'ok' &&
                    <DialogContent>
                        <DialogContentText>
                            Please enter a user name and password
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

                    </DialogContent>
                }
                {props.loginStatus.type == 'ok' &&
                    <DialogContent>Loged in successful!</DialogContent>
                }
                <DialogActions>
                    {props.loginStatus.type != 'ok' &&
                        <Button onClick={handleCancleClose} color="primary">
                            Cancel
          </Button>
                    }
                    {props.loginStatus.type != 'ok' &&
                        <Button onClick={handleSubscribe} color="primary">
                            Login
          </Button>
                    }
                    {props.loginStatus.type == 'ok' &&
                        <Button onClick={handleCancleClose} color="primary">
                            Close
          </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)