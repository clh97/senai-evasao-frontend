import React, { Component }       from 'react';
import styled                     from 'styled-components';

/* RESOURCES */
import logoSenai                  from '../../../img/logo-senai.svg';

const Logo = styled.img`
  min-width: 120px;
  max-width: 120px;
`;

const NavigationContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  height: 80px;
  background: var(--darker-bg);

  *:first-child, *:last-child {
    margin: 0 3rem;
  }
`;

const NavigationButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0 1rem;
  background: none;
  border: none;
  outline: none;
  color: white;
  border-radius: 0;
  cursor: pointer;
  transition: background 300ms ease-in-out, transform 100ms ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, .2);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const LogoutButton = styled.button`
  min-height: 40px;
  cursor: pointer;
  transition: box-shadow 200ms ease-in-out;
  &:active {
    box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, .33);
  }
`;

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoute: 'home'
        };
    }

    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <NavigationContainer>

                <Logo src={ logoSenai } />

                <NavigationButton onClick={() => { this.setState({selectedRoute: 'home'}, () => this.updateRoute()); }}>
                  Home
                </NavigationButton>

                <NavigationButton onClick={() => { this.setState({selectedRoute: 'administracao'}, () => this.updateRoute()); }}>
                  Administração
                </NavigationButton>

                <NavigationButton onClick={() => { this.setState({selectedRoute: 'estatisticas'}, () => this.updateRoute()); }}>
                  Estatísticas
                </NavigationButton>

                <LogoutButton onClick={() => this.props.logoutAction()}>
                  Logout
                </LogoutButton>

                
            </NavigationContainer>
        )
    }

    /* -- CUSTOM METHODS -- */
    updateRoute = () => {
        this.props.handleRoute(this.state.selectedRoute);
    }
} 

export default Navigation;