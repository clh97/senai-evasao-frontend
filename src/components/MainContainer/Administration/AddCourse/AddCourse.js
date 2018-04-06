import React, { Component } from 'react';
import styled               from 'styled-components';

import { API_COURSE_URL, API_COURSE_POST_URL, API_COURSE_DELETE_URL }
                            from '../../../../data_types/ApiData';
import Course               from '../../../../data_types/Course';

// import AddCourseForm from './AddCourseForm/AddCourseForm';
import EditableList         from '../../../EditableList/EditableList';
import Loading              from '../../../Loading/Loading'; 

const AddCourseContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

class AddCourse extends Component {
  constructor() {
    super();
    
    this.state = {
      courses: undefined
    };
  }
  /* LIFECYCLE METHODS */
    render() {
        return (
            <AddCourseContainer>
                {
                  this.state.courses ?
                  <EditableList items={this.state.courses} onDeleteItem={ e => this.handleDeleteCourse(e) } onAddItem={ e => this.addCourse(e) } addButton={true} /> :
                  <Loading />
                }
            </AddCourseContainer>
        )
    }

    componentDidMount() {
      this.requestCourses();
    }

    /* CUSTOM METHODS */
    addCourse = e => {
      let courses = this.state.courses;
      let newId = 0;
      courses.length > 0 ? newId = (courses.slice(-1).pop().id) + 1: newId = 0;
      const newCourse = new Course(undefined, newId, e.target.name.value );
      courses.push(newCourse);
      this.setState({courses}, () => { this.handleNewCourse(newCourse) })
    }

    handleNewCourse = (newCourse) => {
      fetch(API_COURSE_POST_URL, {
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', 
        body: JSON.stringify({'NomeCurso': newCourse.name})
      })
    }

    requestCourses = () => {
      let courses = undefined;
      fetch(API_COURSE_URL, {
          headers: {
              'content-type': 'application/json'
          },
          method: 'GET'
      }).then( response => response.json().then( data => {
          courses = data.map( item => new Course(item.clDisciplinas, item.id, item.nomeCurso))
          this.setState({courses})
      }));
    }

    handleDeleteCourse = id => {
      let { courses } = this.state;
      let newCourses = courses.filter( course => course.id !== id )
      this.setState({courses: newCourses});
      fetch(API_COURSE_DELETE_URL.replace('{id}', id), {
        method: 'DELETE'
      }).then(response => {
        
      })
      
    }
    /* TODO: PEDIR PARA ALEX ARRUMAR ENDPOINT DE DELETE DE CURSOSSSSS!!!!! */
}

export default AddCourse;