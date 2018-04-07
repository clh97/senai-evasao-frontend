import React, { Component } from 'react';
import styled               from 'styled-components';

/* COMPONENTS */
import InternalErrorTag     from '../InternalErrorTag/InternalErrorTag';

const EditableListItem = ({id, content, action, buttonText}) => (
    <li key={id}>
        <div>{(content instanceof String) ? content.name : content }</div>
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
  max-width: 100%;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 70vw;
    height: 60px;
    max-height: 180px;
    padding: 12px;
    overflow: hidden;
    margin: .5rem 0;
    list-style: none;
    border: 1px solid rgba(255, 255, 255, .30);
  }

  & > li:last-child {
      padding: 0;
  }

  & > li > div {
    display: inline-block;
    width: 90%;
    height: auto;
    word-wrap: break-word;
    line-height: 32px;
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
                            return <EditableListItem key={id} content={name} action={ this.props.onDeleteItem ? e => this.props.onDeleteItem(id) : undefined } buttonText={this.props.buttonText ? this.props.buttonText : 'DEL' } onClickAction={ () => this.props.onClickAction ? this.props.onClickAction() : undefined } />
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