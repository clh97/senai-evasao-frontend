import React, { Component } from 'react';

import './AddClassForm.css';

class AddClassForm extends Component {
    render() {
        return (
            <form className="principal__administration__classes__add-class" action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleClassData(e); } }>

                <div>
                    <label htmlFor="course">Curso:</label>
                    <select name="course" id="course">
                        <option value="0">Técnico em Informática</option>
                        <option value="1">Técnico em Redes</option>
                        <option value="2">Técnico em Mecatrônica</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="semester">Semestre:</label>
                    <select name="semester" id="semester">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="period">Período:</label>
                    <select name="period" id="period">
                        <option value="0">MANHÃ</option>
                        <option value="1">TARDE</option>
                        <option value="2">NOITE</option>
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