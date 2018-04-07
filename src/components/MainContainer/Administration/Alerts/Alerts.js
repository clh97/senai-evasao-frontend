import React, { Component }       from 'react';
import styled                     from 'styled-components';

import Loading                    from '../../../Loading/Loading';
import SuccessTag                 from '../../../SuccessTag/SuccessTag';
import InternalErrorTag           from '../../../InternalErrorTag/InternalErrorTag';

import {API_STUDENTS_URL, API_ALERTS_POST_URL}
                                  from '../../../../data_types/ApiData';

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

const DateSelector = styled.input.attrs({
  type: 'date'
})`
  width: 240px;
`;

const AlertsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  & input[type="radio"] ~ label {
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
    margin: 0 2px;
  }

  & input[type="radio"]:checked + label {
    background: var(--yellow-student);
  }
  & input[type="radio"]:checked + label:last-child {
    background: var(--red-student);
  }
`;

const RadioAlertLevelSelector = styled.input.attrs({
  type: 'radio'
})`
  position: absolute;
  display: none;
  visibility: hidden;
  user-select: none;
`;

const MessageTextArea = styled.textarea`
  padding: 12px;
  color: var(--default-bg);
`;

const StudentSelect = styled.select`
`;

class Alerts extends Component {
  constructor() {
    super();
    this.state = {
      students: undefined
    }
  }
  /* LIFECYCLE */
  render() {
    return (
      <AlertsForm onSubmit={ e => { e.preventDefault(); this.addAlert(e)} }>
        <LineBlock>
          <label>Aluno:</label>
          {
            this.state.students ? <StudentSelect name="student" id="student">
            {
              this.getStudentOptions(this.state.students)
            }
            </StudentSelect> : <Loading />
          }
        </LineBlock>

        <LineBlock>
          <label htmlFor="date">Data:</label>
          <DateSelector name="date" id="date" />
        </LineBlock>

        <LineBlock>
          <label htmlFor="message">Mensagem:</label>
          <MessageTextArea name="message" id="message" cols="30" rows="10"></MessageTextArea>
        </LineBlock>

        <LineBlock>
        <label htmlFor="tableType">Nível do alerta:</label>

        <RadioAlertLevelSelector id="level_one" name="level" value="1" defaultChecked/>
        <label htmlFor="level_one">Atenção</label>

        <RadioAlertLevelSelector id="level_two" name="level" value="2" />
        <label htmlFor="level_two">Urgente</label>
        </LineBlock>

        {
          this.state.status ? this.state.status.component() : undefined
        }

        <LineBlock>
          <button action="submit">Enviar</button>
        </LineBlock>
        
      </AlertsForm>
    )  
  }

  componentDidMount() {
    this.fetchStudents();
  } 

  /* CUSTOM */
  fetchStudents = () => {
    const students = [];
    fetch(API_STUDENTS_URL).then(response => response.json().then( data => {
      data.forEach(student => {
        students.push(student);
      })
    })).then( () => this.setState({students}, () => { console.dir(this.state.students) }));
  }

  getStudentOptions = (students) => {
    return students.map( student =>
     <option value={student.id}>{student.nomeAluno}</option> )
  }

  addAlert = (form) => {
    const { student, date, message, level } = form.target;
    
    fetch(API_ALERTS_POST_URL, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify({dataAlerta: date.value, mensagemAlerta: message.value, alunoId: student.value, alertaAntigo: false, nivelPrioridade: level.value, origemAlerta: 0})
    }).then(response => {
      const { status, statusText } = response;
      switch (status) {
        case 200:
          this.setState({
            status: {
              title: 'Alerta enviado com sucesso.',
              component: () => ( <SuccessTag msg={this.state.status.title} /> )
            }
          })
          break;

        case 500:
          this.setState({
            status: {
              title: 'Erro interno no servidor. Verifique se os dados do alerta estão válidos.',
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


        case 400:
          this.setState({
            status: {
              title: 'Verifique se todas informações estão corretamente descritas.',
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

export default Alerts;