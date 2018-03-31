import React          from 'react';
import styled         from 'styled-components';
import FontAwesome    from '@fortawesome/react-fontawesome';
import faError        from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';  

const ErrorContainer = styled.div`
  display: block;
  width: 70%;
  height: 22px;
  margin: 0 auto;
  background: orange;
`;

const ErrorTag = styled.h4`
  display: inline-block;
  margin: 0 1rem;
  color: white;
`;

const ErrorIconStyle = {
  display:    'inline-block'
}


export default (props) => (
<ErrorContainer>
  <FontAwesome style={ErrorIconStyle} icon={faError} />
  <ErrorTag>{props.msg}</ErrorTag>
</ErrorContainer>
);