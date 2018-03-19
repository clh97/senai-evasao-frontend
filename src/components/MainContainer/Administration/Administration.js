import React, { Component } from 'react';

import AddCourse                from './AddCourse/AddCourse';
import Classes                  from './Classes/Classes';
import Uploading                from './Uploading/Uploading';
import StudentList              from './StudentList/StudentList';

import ExpandableContainer      from '../../ExpandableContainer/ExpandableContainer';

import './Administration.css';


class Administration extends Component {
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <div className="principal__administration">

                <ExpandableContainer render={<StudentList />} title={"Lista de Alunos"} />
                <ExpandableContainer render={<AddCourse />} title={"Adicionar Curso"} />
                <ExpandableContainer render={<Classes />} title={"Administração de Classes"} />
                <ExpandableContainer render={<Uploading handleUploadInformation={ e => this.handleUpload(e) } />} title={"Upload de Tabelas"} />
                
            </div>
        );
    }

    /* -- CUSTOM METHODS -- */
    handleUpload = (form) => {
        console.dir(form);
    }
}

export default Administration;