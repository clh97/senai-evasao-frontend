import React, { Component }     from 'react';
import styled                   from 'styled-components';

import Discipline               from '../../../../data_types/Discipline';
import { API_DISCIPLINES_URL, API_DISCIPLINE_POST_URL} 
                                from '../../../../data_types/ApiData';

import EditableList             from '../../../EditableList/EditableList';
import Loading                  from '../../../Loading/Loading';


class DisciplineList extends Component {
  constructor() {
    super();
    this.state = {
      disciplines: undefined
    }
  }
  /* LIFECYCLE METHODS */
  render() {
    return (
      <form onSubmit={ e => {} }>
        {
          this.state.disciplines ? <EditableList items={ this.state.disciplines } addButton={true}  onAddItem={e => this.addDiscipline(e.target.name.value)} /> : <Loading />
        }
      </form>
    );
  }

  componentDidMount() {
    this.requestDisciplines();
  }

  /* CUSTOM METHODS */
  requestDisciplines = () => {
    fetch(API_DISCIPLINES_URL, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET'
    }).then(response => { response.json().then(data => {
      let disciplines = data.map( discipline => new Discipline(discipline));
      this.setState({disciplines})
    } )
  })
  }

  addDiscipline = disciplineName => {
    fetch(API_DISCIPLINE_POST_URL, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify({nomeDisciplina: disciplineName, cursoId: 1, termoId: 1})
    }).then(response => console.dir(response.text())) /* PEDIR PARA BACK-END OTIMIZAR ESSE RESPONSE. PARA OBTER O ID SEM REGEX / SUBSTR */
  }

}

export default DisciplineList;