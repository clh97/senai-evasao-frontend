import React, { Component } from 'react';
import styled               from 'styled-components';

const UploadingForm = styled.form`
  & input[type="radio"] ~ label {
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
    margin: 0 2px;
  }

  & input[type="radio"]:checked + label {
    background: var(--darker-bg);
  }
`;

const LineBlock = styled.div`
  display: block;
  width: 100%;
  margin: 2rem 0;

  & label:first-child {
    display: block;
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const RadioFileTypeSelector = styled.input.attrs({
  type: 'radio'
})`
  position: absolute;
  display: none;
  visibility: hidden;
  user-select: none;
`;

const DateSelector = styled.input.attrs({
  type: 'date'
})`
  width: 240px;
`;

const FileSelector = styled.input.attrs({
  type: 'file'
})`
  width: 240px;
`;

class Uploading extends Component {
  /* -- LIFECYCLE METHODS -- */  
  render() {
        return (
            <UploadingForm action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleUploadInformation(e); } }>
            
                  <LineBlock>
                    <label htmlFor="tableType">Tipo de tabela:</label>

                    <RadioFileTypeSelector id="presenca" name="selector" value="presenca" defaultChecked/>
                    <label for="presenca">Presença</label>

                    <RadioFileTypeSelector id="sintese" name="selector" value="sintese" />
                    <label for="sintese">Síntese</label>
                    
                    <RadioFileTypeSelector id="na" name="selector" value="na" />
                    <label for="na">Não sei</label>
                  </LineBlock>

                  <LineBlock>
                    <label htmlFor="class">Turma:</label>

                    <select name="class" id="class">
                      {
                        this.getClasses().map( _class => {
                          return <option value={_class.id}>{_class.name}</option>
                        } )
                      }
                    </select>
                  </LineBlock>

                  <LineBlock>
                    <label htmlFor="date">Data:</label>
                    <DateSelector name="date" id="date" />
                  </LineBlock>
                  
                  <LineBlock>
                    <label htmlFor="course">Matéria:</label>
                    <select name="class" id="class">
                      {
                        this.getCourses().map( course => {
                          return <option value={course.id}>{course.name}</option>
                        } )
                      }
                    </select>
                  </LineBlock>
                  
                  <LineBlock>
                    <label htmlFor="file">Upload:</label>
                    <FileSelector type="file" accept=".xlsx" name="file" id="file"/>
                  </LineBlock>

                    <button type="submit">
                        Enviar
                    </button>

            </UploadingForm>
        )
    }

    /* -- CUSTOM METHODS -- */
    getClasses = () => {
      return [
        {
            id: 0,
            course: 'Técnico em Informática',
            semester: '4',
            period: 'TARDE',
            name: `0 - Técnico em Informática -> TARDE`
        },
        {
            id: 1,
            course: 'Técnico em Redes',
            semester: '4',
            period: 'MANHÃ',
            name: `1 - Técnico em Redes -> MANHÃ`
        }
    ];
  }

  getCourses = () => {
    return [
        {
            id: 0,
            name: 'Técnico em Informática'
        },
        {
            id: 1,
            name: 'Técnico em Redes'
        }
    ];
}
}

export default Uploading;