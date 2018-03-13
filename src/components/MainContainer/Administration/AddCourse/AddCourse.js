import React, { Component } from 'react';

// import AddCourseForm from './AddCourseForm/AddCourseForm';
import EditableList from '../../../EditableList/EditableList';

import './AddCourse.css';

class AddCourse extends Component {

    constructor() {
        super();

        this.state = {
            courses: this.getCourses()
        };
    }
    render() {
        return (
            <div className="principal__administration__add-course">
                {
                    <EditableList items={this.state.courses} onDeleteItem={ e => this.handleDeleteCourse(e) } onAddItem={ e => this.handleNewCourse(e) } />
                }
            </div>
        )
    }

    handleNewCourse = e => {
        let novaLista = this.state.courses;
        novaLista.push(
            {
                id: novaLista.length,
                name: e.target.name.value
            }
        )
        this.setState({courses: novaLista});
    }

    handleDeleteCourse = id => {
        let novaLista = this.state.courses.filter(item => item.id !== id);
        this.setState({courses: novaLista});
    }

    getCourses = () => {
        return [
            {
                id: 0,
                name: 'Técnico em Informática'
            },
            {
                id: 1,
                name: 'Técnico em Redes'
            }
        ];
    }
}

export default AddCourse;