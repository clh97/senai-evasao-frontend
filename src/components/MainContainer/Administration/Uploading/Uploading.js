import React, { Component }                       from 'react';
import styled                                     from 'styled-components';

import Loading                                    from '../../../Loading/Loading';
import SuccessTag                                 from '../../../SuccessTag/SuccessTag';
import InternalErrorTag                           from '../../../InternalErrorTag/InternalErrorTag';

/* STATIC DATA */
import { API_UPLOAD_URL, API_CLASS_URL,
         API_COURSE_URL, API_DISCIPLINES_URL }    from '../../../../data_types/ApiData';
import Class                                      from '../../../../data_types/Class';
import Discipline                                 from '../../../../data_types/Discipline';

import Course                                     from '../../../../data_types/Course';

const UploadingForm = styled.form`
  & input[type="radio"] ~ label {
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
    margin: 0 2px;
  }

  & input[type="radio"]:checked + label {
    background: var(--darker-bg);
  }
`;

const LineBlock = styled.div`
  display: block;
  width: 100%;
  margin: 2rem 0;

  & label:first-child {
    display: block;
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const RadioFileTypeSelector = styled.input.attrs({
  type: 'radio'
})`
  position: absolute;
  display: none;
  visibility: hidden;
  user-select: none;
`;

const DateSelector = styled.input.attrs({
  type: 'date'
})`
  width: 240px;
`;

const FileSelector = styled.input.attrs({
  type: 'file'
})`
  width: 240px;
`;

class Uploading extends Component {
  constructor() {
    super();

    this.state = {
      classes: undefined,
      courses: undefined,
      status: undefined
    };
  }
  /* -- LIFECYCLE METHODS -- */  
  render() {
        return (
            <UploadingForm action="submit" onSubmit={ e => { e.preventDefault(); this.handleUploadInformation(e); } }>
            
                  <LineBlock>
                    <label htmlFor="tableType">Tipo de tabela:</label>

                    <RadioFileTypeSelector id="presenca" name="spreadsheet" value="presenca" defaultChecked/>
                    <label htmlFor="presenca">Presença</label>

                    <RadioFileTypeSelector id="sintese" name="spreadsheet" value="sintese" />
                    <label htmlFor="sintese">Síntese</label>
                    
                    <RadioFileTypeSelector id="notas" name="spreadsheet" value="notas" />
                    <label htmlFor="notas">Notas</label>
                  </LineBlock>

                  <LineBlock>
                    <label htmlFor="class">Turma:</label>

                    {
                      this.state.classes ? <select name="class" id="class">
                      {
                        this.getClassOptions(this.state.classes)
                      }
                    </select> : <Loading />
                    }
                  </LineBlock>

                  <LineBlock>
                    <label htmlFor="date">Data:</label>
                    <DateSelector name="date" id="date" />
                  </LineBlock>
                  
                  <LineBlock>
                    <label htmlFor="course">Disciplina:</label>
                    {
                      this.state.disciplines ? <select name="discipline" id="discipline">
                      {
                        this.getDisciplineOptions(this.state.disciplines)
                      }
                    </select> : <Loading />
                    }
                  </LineBlock>
                  
                  <LineBlock>
                    <label htmlFor="file">Upload:</label>
                    <FileSelector type="file" accept=".xlsx" name="file" id="file"/>
                  </LineBlock>

                    {
                      this.state.status ? this.state.status.component() : undefined
                    }

                  <button type="submit">
                      Enviar
                  </button>

            </UploadingForm>
        )
    }

    componentDidMount() {
      this.requestClasses();
      this.requestCourses();
      this.requestDisciplines();
    }

    /* -- CUSTOM METHODS -- */
    /* CLASSES */
    requestClasses = () => {
      let classes = undefined;
      fetch(API_CLASS_URL, {
          headers: {
              'content-type': 'application/json'
          },
          method: 'GET'
      }).then( response => response.json().then( data => {
          classes = data.map( item => new Class(item.id, undefined, item.nomeTurma, item.periodo, undefined))
          this.setState({classes})
      }));
    }

    getClassOptions = (classes) => {
      return classes.map( _class => (
        <option value={_class.id}>{_class.className}</option>
      ))
    }

    /* COURSES */
    requestCourses = () => {
      let courses = undefined;
      fetch(API_COURSE_URL, {
          headers: {
              'content-type': 'application/json'
          },
          method: 'GET'
      }).then( response => response.json().then( data => {
          courses = data.map( item => new Course(item.clDisciplinas, item.id, item.nomeCurso))
          this.setState({courses})
      }));
    }

    getCourseOptions = courses => {
      return courses.map( course => (
        <option value={course.id}>{course.name}</option>
      ))
    }

    /* DISCIPLINES */
    requestDisciplines = () => {
      let disciplines = undefined;
      fetch(API_DISCIPLINES_URL, {
          headers: {
              'content-type': 'application/json'
          },
          method: 'GET'
      }).then( response => response.json().then( data => {
          disciplines = data.map( item => new Discipline(item))
          this.setState({disciplines})
      }));
    }

    getDisciplineOptions = disciplines => {
      return disciplines.map( discipline => (
        <option value={discipline.id}>{discipline.name}</option>
      ))
    }

    handleUploadInformation = form => {
        const files = form.target.file.files;
        let data = new FormData();
        for(let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        let type = 0;
        // switch (form.target.selector.value) {
        //   case 'presenca':
        //     type = 0;
        //     break;
        //   case 'sintese':
        //     type = 1;
        //     break;
        //   case 'notas':
        //     type = 2;
        //     break;
        
        //   default:
        //     type = undefined;
        //     break;
        // }
        data.append('type', type);
        data.append('turma', form.target.class.value);
        console.log('turma => ', form.target.class.value)
        data.append('dataCorrespondente', form.target.date.value);
        data.append('disciplina', 3);

        console.log(form.target.date.value);

        fetch(API_UPLOAD_URL, {
            method: 'POST',
            body: data
        }).then( e => {
          const { status, statusText } = e;
          switch (status) {
            case 200:
              this.setState({
                status: {
                  title: 'Planilha enviada com sucesso.',
                  component: () => ( <SuccessTag msg={this.state.status.title} /> )
                }
              })
              break;

            case 500:
              this.setState({
                status: {
                  title: 'Erro interno no servidor. Verifique se a planilha é válida.',
                  component: () => ( <InternalErrorTag msg={this.state.status.title} /> )
                }
              })
              break;

            case 404:
              this.setState({
                status: {
                  title: 'Não foi possível se comunicar com o servidor.',
                  component: () => ( <InternalErrorTag msg={this.state.status.title} /> )
                }
              })
              break;
          
            default:
              break;
          }
        });
    }

}

export default Uploading;