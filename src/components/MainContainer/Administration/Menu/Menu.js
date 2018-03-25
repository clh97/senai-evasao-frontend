import React, { Component } from 'react';
import styled               from 'styled-components';
import FontAwesome          from '@fortawesome/react-fontawesome';

const MenuContainer = styled.aside`
  grid-column-start: 1;
  background: var(--medium-bg);
  padding: 20px;
`;

const MenuTitle = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const MenuContainerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuContainerListItem = styled.li`
  cursor: pointer;
  transition: color 500ms;
  user-select: none;
  &:hover {
    color: purple;
  }
  &:not(:first-child):not(:last-child) {
    margin: 1.25rem 0;
  }
  & svg {
    float: left;
    margin-left: 12px;
  }
`;

const ComposedListItem = ({ key, id, title, faIcon, onClick }) => (
    <MenuContainerListItem key={key} onClick={ () => onClick(id) } >
      <FontAwesome icon={faIcon}/>
      {title}
    </MenuContainerListItem>
);

class Menu extends Component {
  /* -- LIFECYCLE METHODS -- */
  render() {
    return (
      <MenuContainer>
        <MenuTitle>{this.props.title}</MenuTitle>

        <MenuContainerList>
          {
            this.props.items.map( item => {
              return <ComposedListItem key={item.idNum} id={item.id} title={item.title} faIcon={item.faIcon} onClick={ this.props.onDisplayChange } />
            } )
          }
        </MenuContainerList>

      </MenuContainer>
    );
  }

  /* -- CUSTOM METHODS -- */
}

export default Menu;