import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Song.css'
const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});

function SongPage(props) {
    const song = props.location.state.Itune;
    const classes = useStyles();
    const date = new Date(song.releaseDate).toLocaleDateString();
    function isAudio() {
        return song.previewUrl.substring(song.previewUrl.length - 4, song.previewUrl.length) == '.m4a';
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
                        <img src={song.artworkUrl100} />
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
                    Album Price: {song.collectionPrice}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Itune Price {song.trackPrice}
                </Typography>
            </div>
            <div className="player">{player()}</div>

        </div>
    );
}
export default SongPage