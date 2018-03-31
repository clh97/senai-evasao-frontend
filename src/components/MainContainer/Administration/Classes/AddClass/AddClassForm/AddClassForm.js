import React, { Component } from 'react';
import styled               from 'styled-components';

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

const AddClassFormComponent = styled.form`
  display: block;
  width: 100%;
`;

const AddClassFormSelect = styled.select`
  display: inline-block;
  width: 240px;
`;

const courses = [
  {
    name: 'Técnico em Informática',
    id: 0
  },
  {
    name: 'Técnico em Redes',
    id: 1
  },
  {
    name: 'Técnico em Mecatrônica',
    id: 2
  }
]

class AddClassForm extends Component {
    render() {
        return (
            <AddClassFormComponent action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleClassData(e); } }>

                <LineBlock>
                    <label htmlFor="course">Curso:</label>
                    <AddClassFormSelect name="course" id="course">
                        {this.getCourseOptions()}
                    </AddClassFormSelect>
                </LineBlock>

                <LineBlock>
                    <label htmlFor="semester">Semestre:</label>
                    <AddClassFormSelect name="semester" id="semester">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                    </AddClassFormSelect>
                </LineBlock>

                <LineBlock>
                    <label htmlFor="period">Período:</label>
                    <AddClassFormSelect name="period" id="period">
                        <option value="0">MANHÃ</option>
                        <option value="1">TARDE</option>
                        <option value="2">NOITE</option>
                    </AddClassFormSelect>
                </LineBlock>

                <LineBlock>
                    <label name="name" htmlFor="name">Nome:</label>
                    <input id="name" type="text"/>
                </LineBlock>

                <button type="submit">Adicionar</button>

            </AddClassFormComponent>
        )
    }

    getCourseOptions = () => {
      return courses.map( course => (
        <option key={course.id} value={course.id}>
          {course.name}
        </option>
      ))
    }
}

export default AddClassForm;