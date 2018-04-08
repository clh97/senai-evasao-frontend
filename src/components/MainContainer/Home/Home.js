import React, { Component } from 'react';

import ErrorMessage         from '../../ErrorTag/ErrorTag';

class Home extends Component {
    render() {
        const { indiceEvasao } = this.props.info;
        return (
            <div className="principal__home">
                {
                    indiceEvasao ? <h3 className="principal__home__indice">Índice de Evasão: {indiceEvasao}</h3> : <ErrorMessage msg={'Não foi possível obter o índice de evasão.'} />
                }
            </div>
        );
    }
}

export default Home;