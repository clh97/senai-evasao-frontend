import React, { Component }     from 'react';
import styled                   from 'styled-components';

import AddCourse                from './AddCourse/AddCourse';
import Classes                  from './Classes/Classes';
import Uploading                from './Uploading/Uploading';
import StudentList              from './StudentList/StudentList';

import ExpandableContainer      from '../../ExpandableContainer/ExpandableContainer';

import { API_UPLOAD_URL }       from '../../../data_types/ApiData';

import './Administration.css';


const AdministrationContainer = styled.div`
  width: 65vw;
  padding: 20px;
`;

class Administration extends Component {
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <AdministrationContainer>
                <ExpandableContainer render={<StudentList />} title={"Lista de Alunos"} />
                <ExpandableContainer render={<AddCourse />} title={"Adicionar Curso"} />
                <ExpandableContainer render={<Classes />} title={"Administração de Classes"} />
                <ExpandableContainer render={<Uploading handleUploadInformation={ e => this.handleUpload(e) } />} title={"Upload de Tabelas"} />
            </AdministrationContainer>
        );
    }

    /* -- CUSTOM METHODS -- */
    handleUpload = (form) => {
        const files = form.target.file.files;
        let data = new FormData();
        for(let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        fetch(API_UPLOAD_URL, {
            method: 'POST',
            body: data
        }).then( e => { console.dir(e) });
    }
}

export default Administration;