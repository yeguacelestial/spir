import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import FormView from '../../components/FormView';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

class Reader extends Component {

    onConnect = (e, { port, address }) => {
        ipcRenderer.send('reader:connect', port, address);
    }

    componentDidMount() {
        const { enqueueSnackbar } = this.props;

        ipcRenderer.on('reader:status', (e, status) => enqueueSnackbar(status.message, {
            variant: status.success ? 'success' : 'error',
            preventDuplicate: true
        }));

        ipcRenderer.send('reader:status', (e, status) => enqueueSnackbar(status.message, {
            variant: status.success ? 'success' : 'error',
            preventDuplicate: true
        }));
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        return (
            <FormView
                title='Reader'
                fields={{
                     address: {
                        control: 'textfield',
                        label: 'Address',
                        placeholder: '127.0.0.1',
                        defaultValue: '127.0.0.1'
                    },
                    port: {
                        control: 'textfield',
                        label: 'Port',
                        placeholder: '3334',
                        defaultValue: '3334'
                    },
                }}
                actions={{
                    connect: {
                        callback: this.onConnect
                    }
                }}
            />
        )
    }
}

export default withSnackbar(withStyles(styles)(Reader));
