import React, { Component } from 'react';

import AddClass             from './AddClass/AddClass';
import EditableList         from '../../../EditableList/EditableList';

class Classes extends Component {
    constructor() {
        super();

        this.state = {
            classes: this.getClasses()
        }
    }

    /* -- LIFECYCLE -- */
    render() {
        return (
            <div className="principal__administration__classes">

                <EditableList items={ this.state.classes } rightButton={true} onDeleteItem={ e => this.handleDeleteClass(e) } withoutAdd={true} />

                <AddClass handleNewClass={ e => this.handleAddClass(e) }/>

            </div>
        );
    }

    /* -- CUSTOM -- */
    getClasses = () => {
        return [
            {
                id: 0,
                course: 'Técnico em Informática',
                semester: '4',
                period: 'TARDE',
                name: `0 - Técnico em Informática -> TARDE`
            },
            {
                id: 1,
                course: 'Técnico em Redes',
                semester: '4',
                period: 'MANHÃ',
                name: `1 - Técnico em Redes -> MANHÃ`
            }
        ];
    }

    handleAddClass = e => {
        const { course, semester, period, name } = e.target;
        let newClasses = this.state.classes;
        newClasses.push({id: this.state.classes.length, name: `${this.state.classes.length} - ${name.value} - ${course.value} -> ${period.value}`, course: course.value, semester: semester.value, period: period.value});
        this.setState({classes: newClasses});
    }

    handleDeleteClass = id => {
        let novaLista = this.state.classes.filter(item => item.id !== id);
        this.setState({classes: novaLista});
    }

}

export default Classes;