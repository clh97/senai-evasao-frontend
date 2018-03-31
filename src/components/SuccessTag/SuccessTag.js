import React          from 'react';
import styled         from 'styled-components';
import FontAwesome    from '@fortawesome/react-fontawesome';
import faCheckCicle   from '@fortawesome/fontawesome-free-solid/faCheckCircle';  

const SuccessTagContainer = styled.div`
  display: block;
  width: 70%;
  height: 22px;
  margin: 0 auto;
  background: green;
`;

const SuccessTag = styled.h4`
  display: inline-block;
  margin: 0 1rem;
  color: white;
`;

const SuccessIconStyle = {
  display:    'inline-block'
}


export default (props) => (
<SuccessTagContainer>
  <FontAwesome style={SuccessIconStyle} icon={faCheckCicle} />
  <SuccessTag>{props.msg}</SuccessTag>
</SuccessTagContainer>
);