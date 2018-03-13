import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

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

        this.setState({
            username: username.value,
            password: password.value
        }, () => this.props.pseudoLogin(this.state.username, this.state.password))

        

        /* conversar com a galera do back-end para ver como vai ser o request de login */
    }
}

export default LoginForm;