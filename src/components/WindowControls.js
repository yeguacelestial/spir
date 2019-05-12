import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import MaximizeIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Remove';

const remote = window.require('electron').remote; 

const controlIconSize = 25,
      controlSize = 30;

const styles = theme => ({
    windowControls: {
        appRegion: 'no-drag',
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit
    },
    control: {
        height: controlSize,
        width: controlSize,
        padding: 0
    },
    controlIcon: {
        height: controlIconSize,
        width: controlIconSize
    }
})

class WindowControls extends Component {
    onClose = () => {
        remote.getCurrentWindow().close();
    }

    onMinimize = () => {
        remote.getCurrentWindow().minimize();
    }

    onMaximize = () => {
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div
                className={classes.windowControls}
            >
                <IconButton
                    className={classes.control}
                    onClick={this.onMinimize}
                >
                    <MinimizeIcon
                        className={classes.controlIcon}
                    />
                </IconButton>
                <IconButton
                    className={classes.control}
                    onClick={this.onMaximize}
                >
                    <MaximizeIcon
                        className={classes.controlIcon}
                    />
                </IconButton>
                <IconButton
                    color='secondary'
                    className={classes.control}
                    onClick={this.onClose}
                >
                    <CloseIcon
                        className={classes.controlIcon}
                    />
                </IconButton>
            </div>
        )
    }
}

export default withStyles(styles)(WindowControls);