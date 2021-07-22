import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function BrakingOptions(parentName) {
    return (
        <div>
            <h3>BRAKING</h3>
            <Container>
                <Col>
                    <ButtonIndicator parentName={parentName} varName='EBrakeStatus' message='Emergency Brake'/>
                    <ButtonIndicator parentName={parentName} varName='SBrakeStatus' message='Service Brake'/>
                </Col>
            </Container>
        </div>
    )
}

export default BrakingOptions