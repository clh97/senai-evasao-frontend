import React, { Component } from 'react';
import './EditableList.css';

const EditableListItem = ({id, content, action, buttonText}) => (
    <li key={id}>
        <span>{(content instanceof String) ? content.name : content }</span>
        <button onClick={action}>{buttonText}</button>
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

class EditableList extends Component {

    render() {
        return (
            <div className="editable">
                <ul className="editable__list" >
                    {
                        this.props.items.map(item => <EditableListItem key={item.id} content={item.name} action={ e => this.props.onDeleteItem(item.id) } buttonText={'DEL'} />)
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