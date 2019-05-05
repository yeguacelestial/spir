import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import routes from '../../config/routes';

import DatabaseView from '../../components/DatabaseView';

const styles = theme => ({})

class Staff extends Component {
    state = {}

    render() {
        return (
            <DatabaseView
                title='Staff'
                collection='staff'

                editPath={routes.editStaff.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this staff member?'
                }}

                dataFormat={{
                    _id: { visible: false },
                    __v: { visible: false }
                }}
            />
        )
    }
}

export default withStyles(styles)(Staff);
