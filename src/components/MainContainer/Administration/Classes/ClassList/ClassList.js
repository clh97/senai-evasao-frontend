import React, { Component } from 'react';
import styled               from 'styled-components';

import Loading              from '../../../../Loading/Loading';

const ClassListItemTable = styled.table`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: auto;
  margin: 2rem;
`;

const ClassListItemTableHeader = styled.th`
  display: inline-block;
  width: 25%;
  border: 1px solid white;
`;

const ClassListItemTableRow = styled.tr`
  position: relative; 
  display: block;
  width: 100%;
  height: 22px;
`;

const ClassListItemTableData = styled.td`
  display: inline-block;
  width: 25%;
  height: 100%;
  border: 1px solid white;
`;

const ClassListItemTBody = styled.tbody`
  width: 100%;
`;

const ClassListItemDeleteButton = styled.button`
  position: absolute;
  height: 100%;
  width: auto;
  margin: auto 0;
  padding: 0;
  right: 0;
  top: 0;
  border-radius: 0;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .65);
  }
`;

class ClassList extends Component {
  /* LIFECYCLE METHODS */
  render() {
    return (
        <ClassListItemTable>
          <ClassListItemTBody>
            <ClassListItemTableRow>
              <ClassListItemTableHeader>
                ID
              </ClassListItemTableHeader>
              <ClassListItemTableHeader>
                Turma
              </ClassListItemTableHeader>
              <ClassListItemTableHeader>
                Semestre
              </ClassListItemTableHeader>
              <ClassListItemTableHeader>
                Período
              </ClassListItemTableHeader>
            </ClassListItemTableRow>
            {
              this.props.items ?
              this.props.items.map( item => {
                return (
                  <ClassListItemTableRow key={item.id}>
                    <ClassListItemTableData>{item.id}</ClassListItemTableData>
                    <ClassListItemTableData>{item.className}</ClassListItemTableData>
                    <ClassListItemTableData>{item.semester}</ClassListItemTableData>
                    <ClassListItemTableData>
                      {this.parseClassPeriod(item.period)}
                      <ClassListItemDeleteButton onClick={() => { this.props.onDeleteItem(item.id) }}>DEL</ClassListItemDeleteButton>
                    </ClassListItemTableData>
                  </ClassListItemTableRow>
                );
              }) : (<ClassListItemTableRow><Loading /></ClassListItemTableRow>)
            }
          </ClassListItemTBody>
        </ClassListItemTable>
    );
  }

  /* CUSTOM METHODS */
  parseClassPeriod = (periodNumber) => {
    switch (parseInt(periodNumber)) {
      case 0:
        return 'MANHÃ';
      case 1:
        return 'TARDE';
      case 2:
        return 'NOITE';
    
      default:
        break;
    }
  }
}

export default ClassList;