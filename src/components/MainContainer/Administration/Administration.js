import React, { Component }     from 'react';
import styled                   from 'styled-components';

/* COMPONENTS */
import DisciplineList           from './DisciplineList/DisciplineList';
import AddCourse                from './AddCourse/AddCourse';
import Classes                  from './Classes/Classes';
import Uploading                from './Uploading/Uploading';
import StudentList              from './StudentList/StudentList';
import Alerts                   from './Alerts/Alerts';
import Menu                     from './Menu/Menu';
/*import ExpandableContainer      from '../../ExpandableContainer/ExpandableContainer';*/

/* ICONS */
import FaUser               from 'react-icons/lib/fa/user'
import FaGraduationCap      from 'react-icons/lib/fa/graduation-cap'
import FaUpload             from 'react-icons/lib/fa/upload'
import FaNewspaper          from 'react-icons/lib/fa/newspaper-o'  
import FaBell               from 'react-icons/lib/fa/bell'  
import FaBook               from 'react-icons/lib/fa/book'  

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
    icon: FaUser
  },
  {
    idNum: 1,
    id: 'addCourse',
    title: 'Cursos',
    icon: FaGraduationCap
  },
  {
    idNum: 2,
    id: 'discipline',
    title: 'Disciplinas',
    icon: FaBook
  },
  {
    idNum: 3,
    id: 'uploading',
    title: 'Upload',
    icon: FaUpload
  },
  {
    idNum: 4,
    id: 'alerts',
    title: 'Alertas',
    icon: FaBell
  },
  {
    idNum: 5,
    id: 'classes',
    title: 'Turmas',
    icon: FaNewspaper
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
        case 'alerts': {
          return <Alerts />
        }

        default:
          return <StudentList />
      }
    }
}

export default Administration;