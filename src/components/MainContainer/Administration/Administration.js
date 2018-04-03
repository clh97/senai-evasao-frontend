import React, { Component }     from 'react';
import styled                   from 'styled-components';

/* COMPONENTS */
import DisciplineList           from './DisciplineList/DisciplineList';
import AddCourse                from './AddCourse/AddCourse';
import Classes                  from './Classes/Classes';
import Uploading                from './Uploading/Uploading';
import StudentList              from './StudentList/StudentList';
import Menu                     from './Menu/Menu';
/*import ExpandableContainer      from '../../ExpandableContainer/ExpandableContainer';*/

/* ICONS */
import faUser               from '@fortawesome/fontawesome-free-solid/faUser'
import faGraduationCap      from '@fortawesome/fontawesome-free-solid/faGraduationCap'
import faUpload             from '@fortawesome/fontawesome-free-solid/faUpload'
import faNewspaper          from '@fortawesome/fontawesome-free-solid/faNewspaper'  
import faBook               from '@fortawesome/fontawesome-free-solid/faBook'  



const AdministrationContainer = styled.div`
  display: grid;
  grid-template-columns: 20vw auto;
  grid-template-rows: auto;
  width: 100%;
  min-height: 90vh;
  height: auto;
  padding: 20px;
`;

const menuItems = [
  {
    idNum: 0,
    id: 'studentList',
    title: 'Alunos',
    faIcon: faUser
  },
  {
    idNum: 1,
    id: 'addCourse',
    title: 'Cursos',
    faIcon: faGraduationCap
  },
  {
    idNum: 2,
    id: 'discipline',
    title: 'Disciplinas',
    faIcon: faBook
  },
  {
    idNum: 3,
    id: 'uploading',
    title: 'Upload',
    faIcon: faUpload
  },
  {
    idNum: 4,
    id: 'classes',
    title: 'Turmas',
    faIcon: faNewspaper
  }
]

class Administration extends Component {
    constructor() {
      super();

      this.state = {
        componentToDisplay: 'studentList'
      }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <AdministrationContainer>
              <Menu title="Administração" onDisplayChange={ e => this.handleDisplayChange(e) } items={menuItems}/>
              {
                this.displayComponent()
              }
            </AdministrationContainer>
        );
    }

    /* -- CUSTOM METHODS -- */

    handleDisplayChange = (displayName) => {
      this.setState({componentToDisplay: displayName})
    }

    displayComponent = () => {
      switch(this.state.componentToDisplay) {
        case 'studentList': {
          return <StudentList />
        }
        case 'addCourse': {
          return <AddCourse />
        }
        case 'classes': {
          return <Classes />
        }
        case 'uploading': {
          return <Uploading />
        }
        case 'discipline': {
          return <DisciplineList />
        }

        default:
          return <StudentList />
      }
    }
}

export default Administration;