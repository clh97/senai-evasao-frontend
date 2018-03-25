import React, { Component } from 'react';
import Modal                from 'react-modal';
import styled               from 'styled-components';

/*import EditableList         from '../../../EditableList/EditableList';*/
import StudentDialog        from './StudentDialog/StudentDialog';

const modalStyles = {
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

const StudentListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudentListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 80px;
  margin: .33rem 0;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  transition: 500ms box-shadow ease-in-out;
  background: ${ props => props.background };
  box-shadow: inset 0 0 3px rgba(0, 0, 0, .25);

  &:hover {
    box-shadow: inset 0 0 3px black;
  }
`;

class StudentList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        students: this.getStudents(),
        currentStudent: undefined,
        dialogIsOpen: false
      }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
      return (
        <StudentListContainer>

          {
            this.state.students.map( student => {
              return this.generateListItem(student)
            } )
          }

          <Modal isOpen={this.state.dialogIsOpen} onRequestClose={this.closeDialog} contentLabel={'Aluno'} style={modalStyles}>
              <StudentDialog student={this.state.currentStudent} />
          </Modal>
        </StudentListContainer>
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
              nivel: 1,
              message: 'faltou 3 dias consecutivos',
              old: false,
              origin: 'BACK',
              date: '00/00/00'
            }
          ],
          anotations: [
            'aluno impiedosamente come dois lanches no intervalo',
            'insatisfeito com a vida pq (ainda) não trabalha com React'
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
              nivel: 2,
              message: 'apresentou comportamento depressivo nos ultimos 7 dias',
              old: false,
              origin: 'IOT',
              date: '00/00/00'
            }
          ],
          anotations: [
            'aluno com caspa',
            'come nuggets'
          ]
        }
      ];
    }

    openDialog = (student) => {
        this.setState({currentStudent: student, dialogIsOpen: true})
    }

    closeDialog = () => {
        this.setState({dialogIsOpen: false})
    }

    generateListItem = ( student ) => {
      return (
        <StudentListItem key={student.id} background={`var(${this.defineStudentAlertLevel(student)});`} onClick={ () => this.openDialog(student) }>
          {student.name}
        </StudentListItem>
      )
    }

    defineStudentAlertLevel = ( student ) => {
      let color = '--medium-bg';
      let levels = [];
      student.alerts.forEach( alert => {
        levels.push(alert.nivel);
      })
      let max = levels.reduce((a, b) => Math.max(a, b));
      max === 1 ? color = '--yellow-student' : color = '--red-student';
      return color;
    }

}

export default StudentList;