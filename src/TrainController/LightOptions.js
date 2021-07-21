import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function LightOptions(parentName) {
    return (
        <div>
            <h3>LIGHTS</h3>
            <Container>
                <Col>
                    <ButtonIndicator parentName={parentName} varName='InternalLightState' message='Internal Lights'/>
                    <ButtonIndicator parentName={parentName} varName='ExternalLightState' message='External Lights'/>
                </Col>
            </Container>
        </div>
    )
}

export default LightOptions