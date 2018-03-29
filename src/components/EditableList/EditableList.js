import React, { Component } from 'react';
import styled               from 'styled-components';

/* COMPONENTS */
import InternalErrorTag     from '../InternalErrorTag/InternalErrorTag';

const EditableListItem = ({id, content, action, buttonText}) => (
    <li key={id}>
        <span>{(content instanceof String) ? content.name : content }</span>
        {
            action ? <button onClick={action}>{buttonText}</button> : undefined
        }
    </li>
);

const EditableListAdd = ({onAddItem}) => (
    <li>
        <form onSubmit={ e => { e.preventDefault(); onAddItem(e); e.target.name.value = '' } }>
            <input type="text" name="name"/>
            <button type="submit">+</button>
        </form>
    </li>
);

const EditableListContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const EditableListComponent = styled.ul`
  padding: 0;
  margin: 1rem;
  color: white;

  &:hover {
    cursor: default;
  }

  & > li {
    width: 100%;
    height: 60px;
    margin: .5rem 0;
    list-style: none;
    border: 1px solid rgba(255, 255, 255, .30);
  }

  & > li > span {
    display: inline-block;
    width: 90%;
    height: 100%;
    line-height: 60px;
  }

  & > li > button, & > li > form > button {
    float: right;
    width: 10%;
    height: 100%;
    margin: 0;
    padding: 0;
    outline: none;
    transition: background-color .5s;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }

  & > li > button:hover, & > li > form > button:hover {
    background-color: rgba(255, 255, 255, .20);
  }

  & > li > button::-moz-focus-inner {
    border: 0;
  }

  & > li > form {
    align-items: center;
    line-height: 50px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

class EditableList extends Component {
    render() {
        return (
            <EditableListContainer>
                <EditableListComponent>
                    {
                        this.props.items ? this.props.items.map(item => {
                            const { id, name } = item;
                            return <EditableListItem key={id} content={name} action={ e => this.props.onDeleteItem ? this.props.onDeleteItem(id) : undefined } buttonText={this.props.buttonText ? this.props.buttonText : 'DEL' } onClickAction={ () => this.props.onClickAction ? this.props.onClickAction() : undefined } />
                        }) : <InternalErrorTag msg="Não foi possível obter os itens da lista." />
                    }
                    {
                        this.props.addButton ? <EditableListAdd id={this.props.items.length} onAddItem={this.props.onAddItem} /> : undefined
                    }
                </EditableListComponent>
            </EditableListContainer>
        )
    }
}

export default EditableList;