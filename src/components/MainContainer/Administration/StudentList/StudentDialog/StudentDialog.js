import React, { Component }                                 from 'react';
import styled                                               from 'styled-components';

import EditableList                                         from '../../../../EditableList/EditableList';
import { API_ANNOTATION_URL, API_ANNOTATION_DELETE_URL }    
                                                            from '../../../../../data_types/ApiData';

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

const StudentRegistration = styled.h2`
    position: absolute;
    text-transform: uppercase;
    font-size: 1.5rem;
    top: 80px;
    left: 210px;
    z-index: 4;
`;

const StudentName = styled.h2`
    position: absolute;
    text-transform: uppercase;
    font-size: 1.75rem;
    top: 50px;
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
            annotations: this.props.student.annotations,
            alerts: this.props.student.alerts
        }
    }
    /* LIFECYCLE METHODS */
    render() {
        const { student } = this.state;
        return (
            <StudentDialogContainer>

                <StudentPhoto src={student.photoUrl ? student.photoUrl : 'http://placehold.it/320x320/'} alt="" />

                <StudentRegistration>RA: { student.registration }</StudentRegistration>
                <StudentName>{student.name}</StudentName>

                <StudentInformations>
                    <Title>Alertas</Title>
                    <EditableList items={this.adaptAlerts(this.state.alerts)} />
                    <Title>Anotações</Title>
                    <EditableList items={this.adaptAnnotations(this.state.annotations)} addButton={true} onAddItem={e => this.addAnnotation(e.target.name.value)} onDeleteItem={ id => this.deleteAnnotation(id) } />
                </StudentInformations>

            </StudentDialogContainer>
        );
    }

    /* CUSTOM METHODS */
    addAnnotation = annotationText => {
        if(annotationText.length <= 0) {
            return;
        }
        let annotationData = {alunoId: this.state.student.id, mensagem: annotationText};
        fetch(API_ANNOTATION_URL, {
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(annotationData)
        }).then(response => response.text().then( data => {
            const annotationId = parseInt(data.substr(data.indexOf(':')+1, data.length))
            let annotations = this.state.annotations;
            annotationData = {...annotationData, id: annotationId}
            annotations.push(annotationData);
            this.setState({annotations})
        }))
    }
    
    deleteAnnotation = id => {
        fetch(API_ANNOTATION_DELETE_URL.replace('{id}', id), {
            method: 'DELETE'
        }).then(response => {
            let { annotations } = this.state;
            let newAnnotations = annotations.filter(item => item.id !== id)
            this.setState({annotations: newAnnotations});
        })
    }
  

    adaptAnnotations = ( list ) => {
        let newAnnotations = [];
        this.state.annotations.forEach( annotation => {
            newAnnotations.push({name: annotation.mensagem, id: annotation.id});
        })
        return newAnnotations;
    }

    adaptAlerts = ( list ) => {
        let newAnnotations = [];
        this.state.alerts.forEach( alert => {
            newAnnotations.push({name: alert.mensagemAlerta, id: alert.id});
        })
        return newAnnotations;
    }


}

export default StudentDialog;