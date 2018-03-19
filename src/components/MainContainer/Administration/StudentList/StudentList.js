import React, { Component } from 'react';

import EditableList         from '../../../EditableList/EditableList';

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: this.getStudents()
        }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <div className="student-list">
                <EditableList items={ this.state.students }  withoutAdd={true} buttonText={'VER'}  onClickAction={() =>console.log('picanhoso')}/>
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

    
}

export default StudentList;