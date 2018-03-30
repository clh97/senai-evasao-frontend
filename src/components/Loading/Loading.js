import React            from 'react';
import FontAwesome      from '@fortawesome/react-fontawesome';
import faSync           from '@fortawesome/fontawesome-free-solid/faSync'

export default () => (<FontAwesome icon={faSync} style={ { animationName: 'rotate', animationDuration: '1.5s', animationIterationCount: 'infinite', fontSize: '1.5rem' } }/>)