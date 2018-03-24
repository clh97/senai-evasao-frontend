import React, { Component } from 'react';

import './Uploading.css';

class Uploading extends Component {
    render() {
        return (
            <form action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleUploadInformation(e); } } className="principal__administration__uploading">
            
                <div>
                    <label htmlFor="tableType">Tipo:</label>
                    <select name="tableType" id="tableType">
                        <option value="null">Síntese</option>
                        <option value="null">Notas</option>
                        <option value="null">Faltas</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="class">Turma:</label>
                    <select name="class" id="class">
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="date">Data:</label>
                    <input name="date" id="date" type="date"/>
                </div>

                <div>
                    <label htmlFor="discipline">Matéria:</label>
                    <select name="discipline" id="discipline">
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                        <option value="null">Opção</option>
                    </select>
                </div>

                <div className="principal__administration__uploading__uploadform">
                    <label htmlFor="file">Upload:</label>
                    <input type="file" accept=".xlsx" name="file" id="file"/>
                </div>

                <div>
                    <button type="submit">
                        Enviar
                    </button>
                </div>

            </form>
        )
    }
}

export default Uploading;