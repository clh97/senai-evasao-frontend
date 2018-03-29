import React, { Component } from 'react';
import styled               from 'styled-components';

import InternalErrorTag from '../../../../InternalErrorTag/InternalErrorTag';

const ClassListComponent = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

const ClassListItem = styled.li`
  margin: 0;
  padding: 0;
`;

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
  display: block;
  width: 100%;
  height: auto;
`;

const ClassListItemTableRow = styled.tr`
  position: relative; 
  display: block;
  width: 100%;
  height: 22px;
`;

const ClassListItemTableData = styled.td`
  display: inline-block;
  width: 33.3%;
  height: 100%;
  border: 1px solid white;
`;

const ClassListItemTBody = styled.tbody`
  width: 100%;
`;

const ClassListItemDeleteButton = styled.button`
  position: absolute;
  top: -7px;
  right: -32px;
  width: 32px;
  height: 22px;
  padding: 0;
  border: 1px solid red;
  cursor: pointer;
  background: transparent;
  color: white;
  border-radius: 0;
`;

class ClassList extends Component {
  render() {
    return (
      <ClassListComponent>
        <ClassListItemTable>
        <ClassListItemTBody>

          <ClassListItemTableHeader>
          <ClassListItemTableData>ID</ClassListItemTableData>
          <ClassListItemTableData>Nome</ClassListItemTableData>
          <ClassListItemTableData>Período</ClassListItemTableData>
        </ClassListItemTableHeader>

        {
          this.props.items ?
          this.props.items.map( item => {
            return (
              
            <ClassListItemTableRow>
              <ClassListItemTableData>{item.id}</ClassListItemTableData>
              <ClassListItemTableData>{item.className}</ClassListItemTableData>
              <ClassListItemTableData>{item.period}</ClassListItemTableData>
              <ClassListItemDeleteButton onClick={() => { this.props.onDeleteItem(item.id) }}>x</ClassListItemDeleteButton>
            </ClassListItemTableRow>

            );
          }) : <InternalErrorTag />
        }
        
        </ClassListItemTBody>
        </ClassListItemTable>
      </ClassListComponent>
    );
  }
}

export default ClassList;