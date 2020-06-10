import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AppHeaderContext from '../../contexts/AppHeaderContext'
import './Songs.css'

function SongListItem(props) {
    const appheaderFlags = useContext(AppHeaderContext);
    const song = props.song
    const useStyles = makeStyles({
        root: {
            width: 150,
            height: 300
        },
    });
    const classes = useStyles();

    function linkClickHandler() {
        appheaderFlags.changeFlags(true)
    }
    return (
        <div className="ituneCard">
            <Card className={classes.root}>
                <CardActionArea>
                    <Link key={song.trackId} to={{ pathname: `song/${song.trackId}`, state: { Itune: song } }} onClick={linkClickHandler}><CardMedia
                        component="img"
                        height="140"
                        image={song.artworkUrl100}
                    /></Link>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <Link key={song.trackId} to={{ pathname: `song/${song.trackId}`, state: { Itune: song } }} onClick={linkClickHandler}>{song.trackName}</Link>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {song.artistName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        </div>
    );
}
export default SongListItem