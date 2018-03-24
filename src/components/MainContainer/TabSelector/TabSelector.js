import React, { Component }       from 'react';
import styled                     from 'styled-components';

/* Resources */
import logoSenai                  from '../../../img/logo-senai.svg';

const Logo = styled.img`
  width: 120px;
  margin-left: 2rem;
`;

const TabSelectorContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  background: var(--darker-bg);
`;

const TabSelectorButton = styled.button`
  padding: 8px 20px;
  display: inline-block;
  appearance: none;
  background: none;
  border: none;
  outline: none;
  color: white;
`;

const LogoutButton = styled.button`
  min-height: 40px;
`;

class TabSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoute: 'home'
        };
    }

    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <TabSelectorContainer>

                <Logo src={logoSenai}></Logo>

                <TabSelectorButton onClick={() => { this.setState({selectedRoute: 'home'}, () => this.updateRoute()); }}>
                  Home
                </TabSelectorButton>

                <TabSelectorButton onClick={() => { this.setState({selectedRoute: 'administracao'}, () => this.updateRoute()); }}>
                  Administração
                </TabSelectorButton>

                <TabSelectorButton onClick={() => { this.setState({selectedRoute: 'estatisticas'}, () => this.updateRoute()); }}>
                  Estatísticas
                </TabSelectorButton>

                <LogoutButton onClick={() => this.props.logoutAction()}>
                  Logout
                </LogoutButton>

                
            </TabSelectorContainer>
        )
    }

    /* -- CUSTOM METHODS -- */

    updateRoute = () => {
        this.props.handleRoute(this.state.selectedRoute);
    }
} 

export default TabSelector;