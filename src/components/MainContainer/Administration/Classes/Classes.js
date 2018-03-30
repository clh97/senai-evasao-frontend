import React, { Component } from 'react';
import styled               from 'styled-components';

import AddClass             from './AddClass/AddClass';
import ClassList            from './ClassList/ClassList';

import { API_CLASS_URL }    from '../../../../data_types/ApiData';
import Class                from '../../../../data_types/Class';

const ClassesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Classes extends Component {
    constructor() {
        super();

        this.state = {
            classes: undefined
        }
    }

    /* -- LIFECYCLE -- */
    render() {
        return (
            <ClassesContainer>

                <ClassList items={ this.state.classes } onDeleteItem={id => this.handleDeleteClass(id)} />

                <AddClass handleNewClass={ e => this.handleAddClass(e) }/>

            </ClassesContainer>
        );
    }

    componentDidMount() {
        this.requestClasses();
    }

    /* -- CUSTOM -- */

    requestClasses = () => {
        let classes = undefined;
        fetch(API_CLASS_URL, {
            headers: {
                'content-type': 'application/json'
            },
			method: 'GET'
        }).then( response => response.json().then( data => {
            classes = data.map( item => new Class(item.id, undefined, item.nomeTurma, item.periodo, undefined))
            this.setState({classes}, () => { console.dir(this.state.classes) });
        }));
    }
    
    handleAddClass = e => {
        const { course, semester, period, name } = e.target;
        let newClasses = this.state.classes;
        let newId;
        newClasses.length !== 0 ? newId = (this.state.classes.slice(-1).pop().id)+1 : newId = 1;
        newClasses.push(new Class(newId, 1, name.value, period.value, semester.value));
        this.setState({classes: newClasses});
    }

    handleDeleteClass = id => {
        let novaLista = this.state.classes.filter(item => item.id !== id);
        this.setState({classes: novaLista});
    }

}

export default Classes;