import React, { Component } from 'react';
import styled               from 'styled-components';

import { API_CLASS_URL }    from '../../../../../data_types/ApiData';
import Class                from '../../../../../data_types/Class';
import Loading from '../../../../Loading/Loading';

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

const AddClassFormSelect = styled.select`
  display: inline-block;
  width: 240px;
`;

const AddClassFormInput = styled.input`
  display: inline-block;
  width: 240px;
`;

const RadioSemesterSelector = styled.input.attrs({
  type: 'radio'
})`
  position: absolute;
  display: none;
  visibility: hidden;
  user-select: none;
`;

class AddClassForm extends Component {
  constructor() {
    super();

    this.state = {
      classes: undefined
    }
  }

  componentDidMount() {
    this.requestClasses();
  }
  /* LIFECYCLE METHODS */
    render() {
        return (
            <AddClassFormComponent action="submit" onSubmit={ e => { e.preventDefault(); this.props.handleNewClass(e); } }>

                {/*<LineBlock>
                    <label htmlFor="class">Turma:</label>
                    {
                      this.state.classes ? <AddClassFormSelect name="class" id="class">
                      {
                        this.getClassOptions(this.state.classes)
                      }
                    </AddClassFormSelect> : <Loading />
                    }
                  </LineBlock>*/}

                <LineBlock>
                    <label htmlFor="tableType">Semestre:</label>

                    <RadioSemesterSelector id="one" name="semester" value="1" defaultChecked/>
                    <label htmlFor="one">01</label>

                    <RadioSemesterSelector id="two" name="semester" value="2" />
                    <label htmlFor="two">02</label>
                    
                    <RadioSemesterSelector id="three" name="semester" value="3" />
                    <label htmlFor="three">03</label>

                    <RadioSemesterSelector id="four" name="semester" value="4" />
                    <label htmlFor="four">04</label>
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
                    <AddClassFormInput id="name" type="text"/>
                </LineBlock>

                <button type="submit">Adicionar</button>

            </AddClassFormComponent>
        )
    }


    /* CUSTOM METHODS */

    getClassOptions = classes => {
      return classes.map( _class => (
        <option key={_class.id} value={_class.id}>
          {_class.name}
        </option>
      ))
    }

    requestClasses = () => {
      let classes = undefined;
      fetch(API_CLASS_URL, {
          headers: {
              'content-type': 'application/json'
          },
          method: 'GET'
      }).then( response => response.json().then( data => {
          classes = data.map( item => new Class(item.id, undefined, item.nomeTurma, item.periodo, undefined))
          this.setState({classes})
      }));
    }

    getClassOptions = (classes) => {
      return classes.map( _class => (
        <option value={_class.id}>{_class.className}</option>
      ))
    }
}

export default AddClassForm;