import React, { Component } from 'react';
import './LoginForm.css';

import { API_LOGIN_URL }    from '../../data_types/ApiData';

class LoginForm extends Component {
    render() {
        return (
            <form className="portal__login" onSubmit={e => this.handleLoginEvent(e)}>
                <input type="text" name="username" placeholder="Usuário" autoFocus/>
                <input type="password" name="password" placeholder="Senha" />
                <button className="portal__login__login-button" type="submit">Login</button>
            </form>
        );
    }

    handleLoginEvent = (event) => {
        event.preventDefault();
        
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
                    this.props.authenticationFail(data.message);
                break;
            
                default:
                    this.props.authenticationFail(data.message);
                break;
            }
        } ));
    }
}

export default LoginForm;