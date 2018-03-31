import React, { Component } from 'react';
import styled               from 'styled-components';

const DisciplineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

class Discipline extends Component {
  render() {
    return (
      <DisciplineContainer>
        Discipline
      </DisciplineContainer>
    );
  }
}

export default Discipline;