import React, { Component } from 'react';
import './EditableList.css';

const EditableListItem = ({id, content, action, buttonText, onClickAction}) => (
    <li key={id} onClick={ e => {e.preventDefault(); onClickAction ? onClickAction() : () => {} } }>
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

/* ARRUMAR ESSE COMPONENTEEEEEEE!! VER ESSA CONFUSÃO NO ENABLELISTITEM E TENTAR TRANSFORMAR EM LISTA SÓ DE VISUALIZAÇÃO TBM!! */

class EditableList extends Component {

    render() {
        return (
            <div className="editable">
                <ul className="editable__list">
                    {
                        this.props.items.map(item => {
                            const { id, name } = item;
                            return <EditableListItem key={id} content={name} action={ e => this.props.onDeleteItem ? this.props.onDeleteItem(id) : undefined } buttonText={this.props.buttonText ? this.props.buttonText : 'DEL' } onClickAction={ () => this.props.onClickAction ? this.props.onClickAction() : undefined } />
                        }
                    )
                    }
                    {
                        this.props.withoutAdd ? undefined : <EditableListAdd id={this.props.items.length} onAddItem={this.props.onAddItem} />
                    }
                </ul>
            </div>
        )
    }
}

export default EditableList;