import React, { Component } from 'react';
import Modal                from 'react-modal';

import EditableList         from '../../../EditableList/EditableList';
import StudentDialog        from './StudentDialog/StudentDialog';

const customStyles = {
    content : {
        width                 : '800px',
        height                : '600px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background            : 'var(--default-bg)',
        padding               : '0'
    }
  };

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: this.getStudents(),
            dialogIsOpen: false
        }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <div className="student-list">
                <EditableList items={ this.state.students } withoutAdd={true} buttonText={''} onClickAction={() => this.openDialog()} onDeleteItem={ undefined }/>
                <Modal isOpen={this.state.dialogIsOpen} onRequestClose={this.closeDialog} contentLabel={'Aluno'} style={customStyles}>
                    <StudentDialog studentName={'michel calheiros'} />
                </Modal>
            </div>
        )
    }

    /* -- CUSTOM METHODS -- */
    getStudents = () => {
        return [
            {
                id: 0,
                ra: '123456789',
                name: 'michel calheiros',
                evaded: false,
                alerts: [
                    {
                        id: 0,
                        message: 'faltou 3 dias consecutivos',
                        old: false,
                        origin: 'BACK'
                    }
                ],
                anotations: [
                    'aluno impiedosamente come dois lanches no intervalo',
                    'insatisfeito com o trabalho'
                ]
            },
            {
                id: 1,
                ra: '987654321',
                name: 'gordo dados',
                evaded: false,
                alerts: [
                    {
                        id: 1,
                        message: 'apresentou comportamento depressivo nos ultimos 7 dias',
                        old: false,
                        origin: 'IOT'
                    }
                ],
                anotations: [
                    'aluno com caspa',
                    'come nuggets',
                    'aluno morde'
                ]
            }
        ];
    }

    openDialog = () => {
        this.setState({dialogIsOpen: true})
    }

    closeDialog = () => {
        this.setState({dialogIsOpen: false})
    }

    
}

export default StudentList;