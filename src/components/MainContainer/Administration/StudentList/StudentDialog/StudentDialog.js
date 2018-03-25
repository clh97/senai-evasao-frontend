import React, { Component } from 'react';
import styled               from 'styled-components';

const StudentDialogContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
`;

const StudentPhoto = styled.img`
    position: absolute;
    width: 128px;
    border-radius: 50%;
    top: 25px;
    left: 40px;
    z-index: 4;
`;

const StudentName = styled.h2`
    position: absolute;
    text-transform: uppercase;
    font-size: 1.5rem;
    top: 75px;
    left: 210px;
    z-index: 4;    
`;

const StudentInformations = styled.div`
    position: absolute;
    width: 100%;
    height: 470px;
    background: var(--darker-bg);
    top: 128px;
`;


class StudentDialog extends Component {
    render() {
        return (
            <StudentDialogContainer>
            
                <StudentPhoto src={this.props.photoUrl ? this.props.photoUrl : 'http://placehold.it/320x320/'} alt="" />

                <StudentName>{this.props.student.name}</StudentName>

                <StudentInformations>
                    
                </StudentInformations>

            </StudentDialogContainer>
        );
    }
}

export default StudentDialog;