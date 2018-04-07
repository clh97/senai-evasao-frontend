import React, { Component } from 'react';
import styled               from 'styled-components';

import AddClass             from './AddClass/AddClass';
import ClassList            from './ClassList/ClassList';

import { API_CLASS_URL, API_CLASS_DELETE_URL, API_CLASS_POST_URL }
                            from '../../../../data_types/ApiData';
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

                <ClassList items={ this.state.classes }  onDeleteItem={ id => this.handleDeleteClass(id) } />

                <AddClass classes={ this.state.classes } handleNewClass={ e => this.handleAddClass(e) }/>

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
            classes = data.map( item => new Class(item.id, undefined, item.nomeTurma, item.periodo, item.statusTurma))
            classes = classes.filter( item => item.status !== false)
            this.setState({classes});
        }));
    }
    
    handleAddClass = e => {
        const { course, semester, period, name } = e.target;
        let newClasses = this.state.classes;
        newClasses.length !== 0 ? this.newId = (this.state.classes.slice(-1).pop().id)+1 : this.newId = 1;
        const newClass = new Class(this.newId, /*course*/ 1, name.value, period.value, 0)
        newClasses.push(newClass);
        this.setState({classes: newClasses}, () => {
          fetch(API_CLASS_POST_URL, {
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify({nomeTurma: newClass.className, periodo: newClass.period, escolaId: newClass.schoolId, statusTurma: true })
          }).then( response => console.dir(response)).then(data => console.dir(data))
        });
    }

    handleDeleteClass = id => {
        let novaLista = this.state.classes.filter(item => item.id !== id);
        this.setState({classes: novaLista}, () => {
          fetch(API_CLASS_DELETE_URL.replace('{id}', id).replace('{query}', false), {
            method: 'PUT'
          })
        });
        
    }

}

export default Classes;