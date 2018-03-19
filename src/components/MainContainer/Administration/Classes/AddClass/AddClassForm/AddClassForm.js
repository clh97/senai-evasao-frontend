import React, { Component } from 'react';

import './AddClassForm.css';

class AddClassForm extends Component {
    render() {
        return (
            <form className="principal__administration__classes__add-class" action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleClassData(e); } }>

                <div>
                    <label htmlFor="course">Curso:</label>
                    <select name="course" id="course">
                        <option value="Técnico em Informática">Técnico em Informática</option>
                        <option value="Técnico em Redes">Técnico em Redes</option>
                        <option value="Técnico em Batatas">Técnico em Batatas</option>
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
                        <option value="MANHÃ">MANHÃ</option>
                        <option value="TARDE">TARDE</option>
                        <option value="NOITE">NOITE</option>
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