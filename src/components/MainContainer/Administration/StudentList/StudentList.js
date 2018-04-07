import React, { Component }                       from 'react';
import Modal                                      from 'react-modal';
import styled                                     from 'styled-components';

/*import EditableList         from '../../../EditableList/EditableList';*/
import StudentDialog                              from './StudentDialog/StudentDialog';
import Loading                                    from '../../../Loading/Loading';

import { API_STUDENTS_URL }                       from '../../../../data_types/ApiData';
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
        students: undefined,
        currentStudent: undefined,
        dialogIsOpen: false
      }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
      return (
        <StudentListContainer>

          {
            this.state.students ? this.state.students.map( student => this.generateListItem(student)) : <Loading />
          }

          <Modal style={modalStyles} className='animated fadeInDown' isOpen={this.state.dialogIsOpen} onRequestClose={this.closeDialog} contentLabel={'Aluno'}>
              <StudentDialog student={this.state.currentStudent} />
          </Modal>
        </StudentListContainer>
      )
    }

    componentDidMount() {
      Modal.setAppElement('body');
      this.fetchStudents();
    }

    /* -- CUSTOM METHODS -- */

    fetchStudents = () => {
      const students = [];
      fetch(API_STUDENTS_URL).then(response => response.json().then( data => {
        data.forEach(student => {
          students.push(associateStudentData(student));
        })
      })).then( () => this.setState({students}, () => { this.reorderStudentList(this.state.students) }) ).catch(e => { console.dir(e) });
    }

    openDialog = student => this.setState({currentStudent: student, dialogIsOpen: true});

    closeDialog = () => this.setState({ dialogIsOpen: false });

    generateListItem = student => {
      let alertColor;
      student.alerts.length > 0 ? alertColor = this.defineStudentAlertColor(student) : alertColor = '--darker-bg';
      return (
        <StudentListItem key={student.id} background={`var(${alertColor});`} onClick={ () => this.openDialog(student) }>
          {
            student.photoUrl ? <StudentListItemPhoto src={student.photoUrl}/> : undefined
          }
          <StudentListItemText>{student.name}</StudentListItemText>
          <StudentListItemDescription><strong>RA: </strong>{student.registration}</StudentListItemDescription>
        </StudentListItem>
      )
    }

    defineStudentAlertColor = student => {
      let color = '--medium-bg';
      let levels = [];
      student.alerts.forEach( alert => {
        levels.push(alert.nivelPrioridade);
      })
      let max = levels.reduce((a, b) => Math.max(a, b));
      max === 1 ? color = '--yellow-student' : color = '--red-student';
      return color;
    }

    reorderStudentList = studentList => {
      let newStudentList = studentList.filter( student => student.alerts.length > 0);
      let finalList;
      let redStudentList = [];
      let yelStudentList = [];
      newStudentList.forEach( student => {
        student.alerts.forEach( alert => {
          if(alert.nivelPrioridade === 2) {
            redStudentList.push(student);
            newStudentList.slice(1, newStudentList.indexOf(student));
          } 
          if(alert.nivelPrioridade === 1) {
            yelStudentList.push(student);
            newStudentList.slice(1, newStudentList.indexOf(student));
          } 
        } )
        redStudentList.forEach( red => {
           yelStudentList.forEach( (yel, index) => {
             if(yel.id === red.id) {
               yelStudentList.splice(index, 1);
             }
           })
        } )
      });
      finalList = [...redStudentList, ...yelStudentList];
      this.setState({students: finalList});
    }

}

export default StudentList;