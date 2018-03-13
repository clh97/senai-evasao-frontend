import React, { Component }             from 'react';
import { Route, Switch, withRouter }    from 'react-router-dom'

/* Components */
import Administration                   from './Administration/Administration';
import Home                             from './Home/Home';
import Statistics                       from './Statistics/Statistics';
import TabSelector                      from './TabSelector/TabSelector';

import './MainContainer.css';

const RouteSwitcher = withRouter( ({ history }) => {
    return <TabSelector handleRoute={ route => history.push(route) }/>
} );

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    /* -- LIFECYCLE METHODS -- */
    render() {
        const informations = this.requestInformations();
        return (
            <main className="principal">
                <button className="principal__logout" onClick={ () => this.props.logout() }>Logout</button>
                <RouteSwitcher />
                <Switch>
                    <Route exact path="/" render={ () => <Home info={informations} /> } />

                    <Route path="/home" render={ () => <Home info={informations} /> } />
                    <Route path="/administracao" render={ () => <Administration /> } />
                    <Route path="/estatisticas" component={Statistics} />
                    {/* <Route path="/adicionar" component={AddCourse} />
                    <Route path="/classes" component={AddClass} />
                    <Route path="/upload" component={Uploading} /> */}
                </Switch>
            </main>
        );
    }

    /* -- CUSTOM METHODS -- */
    requestInformations = () => {
        return {
            indiceEvasao: '90%'
        };
    }
}

export default MainContainer;