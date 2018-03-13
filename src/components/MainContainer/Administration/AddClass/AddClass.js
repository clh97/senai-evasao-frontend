import React, { Component } from 'react';

import AddClassForm from './AddClassForm/AddClassForm';

class AddClass extends Component {
    render() {
        return (
            <div className="principal__administration__add-class">
               
                <AddClassForm handleClassData={ e => console.dir(e) } />

            </div>
        )
    }
}

export default AddClass;