import React, { Component } from 'react';
import './TabSelector.css'
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
            <div className="principal__tab-selector">
                <button className="principal__tab-selector__home" onClick={() => { this.setState({selectedRoute: 'home'}, () => this.updateRoute()); }
                }>Home</button>
                <button className="principal__tab-selector__administration" onClick={() => { this.setState({selectedRoute: 'administracao'}, () => this.updateRoute()); }
                }>Administração</button>
                <button className="principal__tab-selector__statistics" onClick={() => { this.setState({selectedRoute: 'estatisticas'}, () => this.updateRoute()); }
                }>Estatísticas</button>
            </div>
        )
    }

    /* -- CUSTOM METHODS -- */

    updateRoute = () => {
        this.props.handleRoute(this.state.selectedRoute);
    }
} 

export default TabSelector;