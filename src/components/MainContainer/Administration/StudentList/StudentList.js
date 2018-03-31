import React, { Component }                       from 'react';
import Modal                                      from 'react-modal';
import styled                                     from 'styled-components';

/*import EditableList         from '../../../EditableList/EditableList';*/
import StudentDialog                              from './StudentDialog/StudentDialog';
import Loading                                    from '../../../Loading/Loading';

import { API_STUDENTS_URL, API_ANNOTATION_URL,
         API_ANNOTATION_DELETE_URL }              from '../../../../data_types/ApiData';
import { associateStudentData }                   from '../../../../data_types/Student';



const modalStyles = {
  content : {
    width                 : '800px',
    height                : '600px',
    background            : 'var(--default-bg)',
    padding               : '0',
    overflowY             : 'hidden',
    overflowX             : 'hidden',
    border                : 'none',
    outline               : '0'
  }
};

const StudentListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudentListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 65%;
  height: 80px;
  margin: .33rem 0;
  padding: 6px;
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

const StudentListItemPhoto = styled.img`
  height: 64px;
  border-radius: 4px;
  margin-right: 3rem;
`;

const StudentListItemText = styled.span`
  position: absolute;
  width: 60%;
  left: 120px;
  top: 24px;
  text-align: left;
`;

const StudentListItemDescription = styled.span`
  position: absolute;
  width: 60%;
  left: 128px;
  top: 44px;
  text-align: left;
  font-size: .8rem;
`;

class StudentList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        students: this.fetchStudents(),
        currentStudent: undefined,
        dialogIsOpen: false,
        requesting: false
      }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
      
      return (
        <StudentListContainer>

          {
            this.state.students ? this.state.students.map( student => this.generateListItem(student)) : <Loading />/*<InternalErrorTag msg='Não foi possível obter os alunos.' />*/
          }

          <Modal style={modalStyles} className='animated fadeInDown' isOpen={this.state.dialogIsOpen} onRequestClose={this.closeDialog} contentLabel={'Aluno'}>
              <StudentDialog  student={this.state.currentStudent}
                              addAnnotation={annotations => this.handleAddAnnotation(annotations) }
                              removeAnnotation={id => this.handleRemoveAnnotation(id) }
                              requesting={ this.state.requesting } />
          </Modal>
        </StudentListContainer>
      )
    }

    componentDidMount() {
      Modal.setAppElement('body')
    }

    /* -- CUSTOM METHODS -- */
    getStudents = () => {
      return [
        {
          id: 0,
          ra: '123456789',
          name: 'michel calheiros',
          evaded: false,
          photoUrl: 'http://placehold.it/128x128',
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
          annotations: [
            {
              id: 0,
              annotation: 'aluno impiedosamente come dois lanches no intervalo'
            },
            {
              id: 1,
              annotation: 'insatisfeito com a vida pq (ainda) não trabalha com React'
            }
          ]
        },
        {
          id: 1,
          ra: '987654321',
          name: 'gordo dados',
          evaded: false,
          photoUrl: 'http://placehold.it/128x128',
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
          annotations: [
            {
              id: 0,
              content: 'aluno com caspa'
            },
            {
              id: 1,
              content: 'come nuggets'
            }
          ]
        }
      ];
    }

    fetchStudents = () => {
      const students = [];
      fetch(API_STUDENTS_URL).then(response => response.json().then( data => {
        data.forEach(student => {
          students.push(associateStudentData(student));
        })
      })).then( () => this.setState({students}) );
    }

    openDialog = (student) => this.setState({currentStudent: student, dialogIsOpen: true});

    closeDialog = () => this.setState({dialogIsOpen: false});

    generateListItem = ( student ) => {
      let alertLevel;
      student.alerts.length > 0 ? alertLevel = this.defineStudentAlertLevel(student) : alertLevel = '--darker-bg';
      return (
        <StudentListItem key={student.id} background={`var(${alertLevel});`} onClick={ () => this.openDialog(student) }>
          {
            student.photoUrl ? <StudentListItemPhoto src={student.photoUrl}/> : undefined
          }
          <StudentListItemText>{student.name}</StudentListItemText>
          <StudentListItemDescription><strong>RA: </strong>{student.registration}</StudentListItemDescription>
        </StudentListItem>
      )
    }

    defineStudentAlertLevel = ( student ) => {
      let color = '--medium-bg';
      let levels = [];
      student.alerts.forEach( alert => {
        levels.push(alert.nivelPrioridade);
      })
      let max = levels.reduce((a, b) => Math.max(a, b));
      max === 1 ? color = '--yellow-student' : color = '--red-student';
      return color;
    }

    handleAddAnnotation = ( newAnnotations ) => {
      const newAnnotation = newAnnotations.slice(-1).pop();
      const {alunoId, mensagem} = newAnnotation;

      fetch(API_ANNOTATION_URL, {
      headers: {
        'content-type': 'application/json'
      },
        method: 'POST', 
        body: JSON.stringify({'AlunoId': alunoId, 'Mensagem': mensagem})
      }).then( response => response.text().then( data => {
        // console.log(data);
      } ));

      let student = this.state.currentStudent;
      student.annotations = newAnnotations;
      this.setState({currentStudent: student});
    }

    handleRemoveAnnotation = id => {
      fetch(API_ANNOTATION_DELETE_URL.replace('{id}', id), {
        method: 'DELETE'
      }).then(response => { /*console.dir('response ->', response)*/ }).then(data => { /*console.dir(data)*/ })
    }

}

export default StudentList;