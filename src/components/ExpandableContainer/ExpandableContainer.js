import React, { Component } from 'react';
import './ExpandableContainer.css';

import classnames from 'classnames';

class ExpandableContainer extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false 
        }
    }
    /* -- LIFECYCLE METHODS -- */
    render() {
        return (
            <div className={classnames( 'expandable-container', {'expanded': this.state.expanded} )}>

                <h2 className="expandable-container__title" onClick={ e => this.setState({expanded: !this.state.expanded}) }>{this.props.title}</h2>

                {
                    this.state.expanded ? this.props.render : undefined
                }

            </div>
        );
    }

    /* -- CUSTOM METHODS -- */
    expandContainer = (e) => {
        if (this.state.classes.length === 1) {
            this.setState({classes: this.state.classes.push('expanded')})
        } else {
            this.setState({classes: ['expandable-container']})
        }
    }

}

export default ExpandableContainer