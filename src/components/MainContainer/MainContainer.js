import React, { Component }             from 'react';
import { Route, Switch, withRouter }    from 'react-router-dom';
import styled                           from 'styled-components';

/* Components */
import Administration                   from './Administration/Administration';
import Home                             from './Home/Home';
import Statistics                       from './Statistics/Statistics';
import Navigation                      from './Navigation/Navigation';

const Principal = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const RouteSwitcher = withRouter( ({ history, logout }) => {
    return <Navigation logoutAction={ () => logout() } handleRoute={ route => history.push(route) }/>
} );

class MainContainer extends Component {
    /* -- LIFECYCLE METHODS -- */
    render() {
        const informations = this.requestInformations();
        return (
            <Principal>
                <RouteSwitcher logout={() => this.props.logout()} />
                <Switch>
                    <Route exact path="/" render={ () => <Home info={informations} /> } />
                    <Route path="/home" render={ () => <Home info={informations} /> } />
                    <Route path="/administracao" render={ () => <Administration /> } />
                    <Route path="/estatisticas" component={Statistics} />
                </Switch>
            </Principal>
        );
    }

    /* -- CUSTOM METHODS -- */
    requestInformations = () => {
        return {
            indiceEvasao: '-90%'
        };
    }
}

export default MainContainer;