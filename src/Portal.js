import React, { Component, Fragment }       from 'react';
import styled from 'styled-components';

/* Components */
import LoginForm                            from './components/LoginForm/LoginForm';
import MainContainer                        from './components/MainContainer/MainContainer';

const PortalComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

class Portal extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: true,
      errorMsg: undefined
    };
  }

  /* -- LIFECYCLE METHODS -- */
  render() {
    return (
      <Fragment>
        <PortalComponent className="animated fadeIn">
          {
            this.state.loggedIn ?
            <MainContainer logout={ () => this.setState({loggedIn: false}) } /> :
            <LoginForm authenticateUser={ () => this.handleAuthenticationSuccess() } authenticationFail={ () => this.handleAuthenticationFail() }/>
          }
        </PortalComponent>
      </Fragment>
    );
  }

  componentDidUpdate() {
    
  }

  /* -- CUSTOM METHODS -- */

  handleAuthenticationSuccess = () => this.setState({ errorMsg: undefined, loggedIn: true});

  handleAuthenticationFail = (msg) => {
    this.setState({ errorMsg: msg });
  }

  disposeErrorMessage = () => {
    this.setState({ errorMsg: undefined });
  }

}

export default Portal;
