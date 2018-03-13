import React, { Component, Fragment }       from 'react';
import './Portal.css';

/* Resources */
import logoSenai                  from './img/logo-senai.svg';

/* Components */
import LoginForm                  from './components/LoginForm/LoginForm';
import MainContainer              from './components/MainContainer/MainContainer';

class Portal extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: true
    };
  }

  /* -- LIFECYCLE METHODS -- */
  render() {
    return (
      <Fragment>
        <img className="logo" src={ logoSenai } alt="SENAI"/>
        <div className="portal animated fadeIn">
          {
            this.state.loggedIn ?
            <MainContainer logout={ () => this.setState({loggedIn: false}) } /> :
            <LoginForm pseudoLogin={ (u, p) => this.pseudoLogin(u, p) }/>
          }
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    /* gerenciar cookie quando this.state.loggedIn for atualizado? */
  }

  /* -- CUSTOM METHODS -- */

  pseudoLogin = (username, password) => {
    if(username === 'admin' || password === '123456') {
        this.setState( { loggedIn: true } )
    } else this.setState( { loggedIn: false } )
  }

}

export default Portal;
