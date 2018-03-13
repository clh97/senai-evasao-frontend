import React, { Component } from 'react';

import AddCourse                from './AddCourse/AddCourse';
import AddClass                 from './AddClass/AddClass';
import Uploading                from './Uploading/Uploading';

import ExpandableContainer      from '../../ExpandableContainer/ExpandableContainer';

import './Administration.css';


class Administration extends Component {
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <div className="principal__administration">

                <ExpandableContainer render={<AddCourse />} title={"Adicionar Curso"} />
                <ExpandableContainer render={<AddClass />} title={"Cadastro de Turmas"} />
                <ExpandableContainer render={<Uploading handleUploadInformation={ e => this.handleUpload(e) } />} title={"Upload de Tabelas"} />
                
                {/* <h2>Cadastro de Turmas</h2>
                <AddClass />

                <h2>Upload de Tabelas</h2>
                <Uploading /> */}

                {/* <a href="./adicionar">Adicionar Curso</a>
                <a href="./classes">Cadastro de Turmas</a>
                <a href="./upload">Upload de Tabelas</a> */}
            </div>
        );
    }

    /* -- CUSTOM METHODS -- */
    handleUpload = (form) => {
        console.dir(form);
    }
}

export default Administration;