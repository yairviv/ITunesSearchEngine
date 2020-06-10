import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { updateSettings } from '../../redux/actions/index';
import { connect } from 'react-redux';
const mapDispatchToProps = (dispatch, ownProps) => ({
    updateSettings: (item) => dispatch(updateSettings(item)),
});

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function LimitSlider(props) {
    const classes = useStyles();

    function valuetext(value) {
        props.updateSettings(['limit', value])
        return value;
    }

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider" gutterBottom>
                Results limit
      </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={1}
                max={50}
            />
        </div>
    );
}
export default connect(null, mapDispatchToProps)(LimitSlider)