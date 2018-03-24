import React, { Component, Fragment }       from 'react';
import styled from 'styled-components';

/* Components */
import LoginForm                            from './components/LoginForm/LoginForm';
import MainContainer                        from './components/MainContainer/MainContainer';

const ErrorTag = styled.h3`
  position: sticky;
  top: 12px;
  width: 100%;
  margin: 0;
  padding: 6px 0;
  background: orangered;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .30);
  text-transform: uppercase;
`

const CloseErrorButton = styled.button`
  float: right;
  margin-right: 12px;
  width: auto;
  height: 12px;
  padding: 2px 6px;
  appearance: none;
  border: none;
  color: black;
  cursor: pointer;
  background: #f6f6f6;
`;

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
        {
          this.state.errorMsg && <ErrorTag>{this.state.errorMsg}<CloseErrorButton onClick={ () => this.disposeErrorMessage() }></CloseErrorButton></ErrorTag>
        }
        <PortalComponent className="animated fadeIn">
          {
            this.state.loggedIn ?
            <MainContainer logout={ () => this.setState({loggedIn: false}) } /> :
            <LoginForm authenticateUser={ () => this.handleAuthenticationSuccess() }
                       authenticationFail={ (msg) => this.handleAuthenticationFail(msg) } />
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
