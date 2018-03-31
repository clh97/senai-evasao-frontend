import React, { Component } from 'react';
import styled               from 'styled-components';

import { API_LOGIN_URL }    from '../../data_types/ApiData';

/* RESOURCES */
import logoSenai                  from '../../img/logo-senai.svg';

const Logo = styled.img`
  min-width: 240px;
  max-width: 240px;
  margin: 2rem 0;
`;

const LoginFormComponent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  padding: 20px;
`;

const ErrorMessage = styled.h3`
  color: red;
  font-size: 1rem;
`;

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            errorMessage: undefined
        }
    }
    render() {
        return (
            <LoginFormComponent onSubmit={e => this.handleLoginEvent(e)}>
            <Logo src={logoSenai}/>
                <input type="text" name="username" placeholder="Usuário" autoFocus/>
                <input type="password" name="password" placeholder="Senha" />
                { this.state.errorMessage ? <ErrorMessage>{this.state.errorMessage}</ErrorMessage> : undefined }
                <button type="submit">Login</button>
            </LoginFormComponent>
        );
    }

    handleLoginEvent = (event) => {
        event.preventDefault();

        this.setState({errorMessage: undefined});
        
        const { username, password } = event.target;

        const formData = {
            'Email': (username.value.length > 0) ? username.value : undefined,
            'Senha': (password.value.length > 0) ? password.value : undefined
        };

        fetch(API_LOGIN_URL, {
            headers: {
                'content-type': 'application/json'
            },
			method: 'POST', 
            body: JSON.stringify(formData)
        }).then( response => response.json().then( data => {
            switch (data.authenticated) {
                case true:
                    this.props.authenticateUser();
                break;
                
                case false:
                    this.showErrorMessage('Erro de autenticação.');
                    this.props.authenticationFail(data.message);
                break;
            
                default:
                    // this.showErrorMessage('Erro de autenticação.');
                    this.props.authenticationFail(data.message);
                break;
            }
        } ));
        /* TODO: ADICIONAR CATCH */
    }

    showErrorMessage = msg => {
        this.setState({errorMessage: msg})
    }
}

export default LoginForm;