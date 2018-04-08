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

  &:last-child {
    border: none;
  }
`;

const ClassListItemTableRow = styled.tr`
  display: block;
  width: 100%;

  & td:last-child {
    border: none;
  }
`;

const ClassListItemTableData = styled.td`
  display: inline-block;
  min-width: 25%;
  width: 25%;
  height: 100%;
  padding: 12px;
  border: 1px solid white;

  &:last-child {
    width: 20px;
    padding: 0;
  }
`;

const ClassListItemTBody = styled.tbody`
  width: 100%;
`;

const ClassListItemDeleteButton = styled.button`
  left: 0;
  height: 22px;
  width: 50%;
  margin: 0;
  padding: 0 6px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .65);
  }
`;

class ClassList extends Component {
  /* LIFECYCLE METHODS */
  render() {
    return (
      <React.Fragment>
        <ClassListItemTable>
          <ClassListItemTBody>
            <ClassListItemTableRow>
              <ClassListItemTableHeader>
                ID
              </ClassListItemTableHeader>
              <ClassListItemTableHeader>
                Turma
              </ClassListItemTableHeader>
              {/* {<ClassListItemTableHeader>
                Semestre
              </ClassListItemTableHeader>} */}
              <ClassListItemTableHeader>
                Período
              </ClassListItemTableHeader>
              <ClassListItemTableHeader>
                 
              </ClassListItemTableHeader>
            </ClassListItemTableRow>
            {
              this.props.items ?
              this.props.items.map( item => {
                return (
                  <ClassListItemTableRow key={item.id}>
                    <ClassListItemTableData>{item.id}</ClassListItemTableData>
                    <ClassListItemTableData>{item.className}</ClassListItemTableData>
                    <ClassListItemTableData>
                      {this.parseClassPeriod(item.period)}
                    </ClassListItemTableData>
                    <ClassListItemTableData>
                      <ClassListItemDeleteButton onClick={() => { this.props.onDeleteItem(item.id) }}>DEL</ClassListItemDeleteButton>
                    </ClassListItemTableData>
                  </ClassListItemTableRow>
                );
              }) : undefined
            }
          </ClassListItemTBody>
        </ClassListItemTable>
        {
          this.props.items ? undefined : <Loading />
        }
      </React.Fragment>
    );
  }

  /* TODO: PERGUNTAR PARA PROFESSORA QUAL A FORMA MAIS EFICIENTE DE CRIAR CLASSES COM STYLED-COMPONENTS */

  /* CUSTOM METHODS */
  parseClassPeriod = (periodNumber) => {
    switch (parseInt(periodNumber, 10)) {
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