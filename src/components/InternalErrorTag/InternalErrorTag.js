import React          from 'react';
import styled         from 'styled-components';
import FontAwesome    from '@fortawesome/react-fontawesome';
import faError        from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';  

const InternalErrorContainer = styled.div`
  display: block;
  width: 100%;
  height: 22px;
  margin: 0 auto;
  background: orange;
`;

const InternalErrorTag = styled.h4`
  display: inline-block;
  margin: 0 1rem;
  color: white;
`;

const internalErrorIconStyle = {
  display:    'inline-block'
}


export default (props) => (
<InternalErrorContainer>
  <FontAwesome style={internalErrorIconStyle} icon={faError} />
  <InternalErrorTag>{props.msg}</InternalErrorTag>
</InternalErrorContainer>
);