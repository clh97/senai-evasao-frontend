import React, { Component }     from 'react';
import styled                   from 'styled-components';

/* COMPONENTS */
import AddCourse                from './AddCourse/AddCourse';
import Classes                  from './Classes/Classes';
import Uploading                from './Uploading/Uploading';
import StudentList              from './StudentList/StudentList';
import Menu                     from './Menu/Menu';
/*import ExpandableContainer      from '../../ExpandableContainer/ExpandableContainer';*/

/* STATIC DATA */
import { API_UPLOAD_URL }       from '../../../data_types/ApiData';

/* ICONS */
import faUser               from '@fortawesome/fontawesome-free-solid/faUser'
import faGraduationCap      from '@fortawesome/fontawesome-free-solid/faGraduationCap'
import faUpload             from '@fortawesome/fontawesome-free-solid/faUpload'
import faNewspaper          from '@fortawesome/fontawesome-free-solid/faNewspaper'  

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
    id: 'classes',
    title: 'Turmas',
    faIcon: faNewspaper
  },
  {
    idNum: 3,
    id: 'uploading',
    title: 'Upload',
    faIcon: faUpload
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
    handleUpload = (form) => {
        const files = form.target.file.files;
        let data = new FormData();
        for(let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        fetch(API_UPLOAD_URL, {
            method: 'POST',
            body: data
        }).then( e => { console.dir(e) });
    }

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
          return <Uploading handleUploadInformation={ e => this.handleUpload(e) } />
        }

        default:
          return <StudentList />
      }
    }
}

export default Administration;