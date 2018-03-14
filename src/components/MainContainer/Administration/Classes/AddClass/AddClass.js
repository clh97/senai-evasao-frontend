import React, { Component } from 'react';

import AddClassForm         from './AddClassForm/AddClassForm';

class AddClass extends Component {
    render() {
        return (
            <AddClassForm handleClassData={ e => this.props.handleNewClass(e) } />
        )
    }
}

export default AddClass;