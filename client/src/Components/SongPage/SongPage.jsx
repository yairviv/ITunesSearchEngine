import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { addItemToCart } from '../../redux/actions/index';
import { connect } from 'react-redux';
import './Song.css'

const mapDispatchToProps = (dispatch, ownProps) => ({
    addItemToCart: (iTune) => dispatch(addItemToCart(iTune)),
});


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    cartButton: {
        width: '70px',
        maxWidth: 500,
        height: '70px',
    }
}));


function SongPage(props) {
    const song = props.location.state.Itune;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const date = new Date(song.releaseDate).toLocaleDateString();
    function isAudio() {
        return song.previewUrl.substring(song.previewUrl.length - 4, song.previewUrl.length) === '.m4a';
    }
    function AddClickHandler() {
        props.addItemToCart(song);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    function player() {
        if (isAudio()) {
            return <audio className="audioPlayer" controls><source src={song.previewUrl} type="audio/ogg"></source></audio>;
        } else {
            return <video className="audioPlayer" controls><source src={song.previewUrl} type="video/ogg"></source></video>;
        }
    }
    return (
        <div>

            <div className="ituneDetails">
                <div className="songHeader">
                    <span>
                        <img src={song.artworkUrl100} alt='' />
                    </span>
                    <span>  <Typography variant="h2" gutterBottom>
                        {song.trackName}
                    </Typography>
                    </span>
                </div>
                <Typography variant="h4" gutterBottom>
                    Artist: {song.artistName}
                </Typography>
                {song.collectionName &&
                    <Typography variant="h4" gutterBottom>
                        Album: {song.collectionName}
                    </Typography>
                }
                <Typography variant="h4" gutterBottom>
                    Release Date:  {date}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Album Price: {song.collectionPrice}$
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Itune Price {song.trackPrice}$
                </Typography>
                <Tooltip title="add to shopping cart">
                    <IconButton onClick={AddClickHandler} color="primary">
                        < AddShoppingCartIcon className={classes.cartButton} />
                    </IconButton>
                </Tooltip>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Item has been added to cart !
        </Alert>
                </Snackbar>
            </div>
            <div className="player">{player()}</div>

        </div>
    );
}

export default connect(null, mapDispatchToProps)(SongPage)