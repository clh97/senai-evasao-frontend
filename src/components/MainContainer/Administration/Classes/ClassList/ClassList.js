import React, { Component } from 'react';
import styled               from 'styled-components';

import InternalErrorTag from '../../../../InternalErrorTag/InternalErrorTag';

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
  height: 100%;
  width: auto;
  margin: 0;
  padding: 0;
  right: 0;
  top: 0;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .65);
  }
`;

class ClassList extends Component {
  render() {
    return (
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
                  <ClassListItemTableData>
                    {item.period}
                    <ClassListItemDeleteButton onClick={() => { this.props.onDeleteItem(item.id) }}>DEL</ClassListItemDeleteButton>
                  </ClassListItemTableData>
                </ClassListItemTableRow>

                );
              }) : <InternalErrorTag />
            }
          
          </ClassListItemTBody>
        </ClassListItemTable>
    );
  }
}

export default ClassList;