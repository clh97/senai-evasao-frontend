import React, { Component }     from 'react';
import styled                   from 'styled-components';

import Discipline               from '../../../../data_types/Discipline';
import { API_DISCIPLINES_URL }  from '../../../../data_types/ApiData';
import Loading from '../../../Loading/Loading';


const DisciplineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

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
      <DisciplineContainer>
        {
          this.state.disciplines ? this.state.disciplines.map( discipline => {
            return <p>{discipline.name}</p>
          }) : <Loading />
        }
      </DisciplineContainer>
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