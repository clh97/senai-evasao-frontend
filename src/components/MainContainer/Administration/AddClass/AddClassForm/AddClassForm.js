import React, { Component } from 'react';

import './AddClassForm.css';

class AddClassForm extends Component {
    render() {
        return (
            <form className="principal__administration__add-class" action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleClassData(e); } }>

                <div>
                    <label htmlFor="course">Curso:</label>
                    <select name="course" id="course">
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="semester">Semestre:</label>
                    <select name="semester" id="semester">
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="period">Período:</label>
                    <select name="period" id="period">
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                    </select>
                </div>

                <div>
                    <label name="name" htmlFor="name">Nome:</label>
                    <input id="name" type="text"/>
                </div>

                <button type="submit">Adicionar</button>

            </form>
        )
    }
}

export default AddClassForm;