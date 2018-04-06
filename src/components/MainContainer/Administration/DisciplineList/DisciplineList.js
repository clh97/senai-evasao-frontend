import React, { Component }     from 'react';
import styled                   from 'styled-components';

import Discipline               from '../../../../data_types/Discipline';
import { API_DISCIPLINES_URL }  from '../../../../data_types/ApiData';
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
          this.state.disciplines ? this.state.disciplines.map( discipline => {
            return (
              <div></div>
            )
          }) : <Loading />
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

}

export default DisciplineList;