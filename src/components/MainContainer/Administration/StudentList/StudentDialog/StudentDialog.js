import React, { Component } from 'react';
import styled               from 'styled-components';

import EditableList         from '../../../../EditableList/EditableList';

const StudentDialogContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
`;

const StudentPhoto = styled.img`
    position: absolute;
    width: 128px;
    border-radius: 50%;
    top: 25px;
    left: 40px;
    z-index: 4;
`;

const StudentName = styled.h2`
    position: absolute;
    text-transform: uppercase;
    font-size: 1.5rem;
    top: 75px;
    left: 210px;
    z-index: 4;    
`;

const StudentInformations = styled.div`
    position: absolute;
    width: 100%;
    height: 480px;
    padding: 30px 60px;
    background: var(--darker-bg);
    top: 128px;
    overflow-y: scroll;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0 20px;
  text-align: left;
  color: white;
`;

class StudentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: this.props.student,
            annotations: this.props.student.annotations
        }
    }
    /* LIFECYCLE METHODS */
    render() {
        const { student } = this.state;
        return (
            <StudentDialogContainer>

                <StudentPhoto src={student.photoUrl ? student.photoUrl : 'http://placehold.it/320x320/'} alt="" />

                <StudentName>{student.name}</StudentName>

                <StudentInformations>
                    <Title>Anotações</Title>
                    <EditableList items={this.adaptAnnotations(this.state.annotations)} addButton={true} onAddItem={e => this.addAnnotation(e.target.name.value)} onDeleteItem={ id => this.deleteAnnotation(id) } />
                </StudentInformations>

            </StudentDialogContainer>
        );
    }

    /* CUSTOM METHODS */
    addAnnotation = annotationText => {
        const { id } = this.state.student;
        let annotations = this.state.annotations;
        let newAnnotations = annotations;
        annotations.length > 0 ? this.newId = (annotations.slice(-1).pop().id)+1: this.newId = 0;
        newAnnotations.push({ alunoId: id, id: this.newId, mensagem: annotationText });
        this.setState({annotations}, () => this.props.addAnnotation(newAnnotations))
    }
    
    deleteAnnotation = id => {
        let { annotations } = this.state;
        let newAnnotations = annotations.filter(item => item.id !== id)
        this.setState({annotations: newAnnotations}, () => this.props.removeAnnotation(id));
    }

    adaptAnnotations = ( list ) => {
        let newAnnotations = [];
        this.state.annotations.forEach( annotation => {
            newAnnotations.push({name: annotation.mensagem, id: annotation.id});
        })
        return newAnnotations;
    }


}

export default StudentDialog;