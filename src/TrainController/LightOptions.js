import React from 'react';
import { Container, Col } from 'react-bootstrap';
import ButtonIndicator from './components/ButtonIndicator';

function LightOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>LIGHTS</h3>
            <Container>
                <Col>
                    <ButtonIndicator selectedTrain={selectedTrain} parentName={parentName} varName='InternalLightState' message='Internal Lights'/>
                    <ButtonIndicator selectedTrain={selectedTrain} parentName={parentName} varName='ExternalLightState' message='External Lights'/>
                </Col>
            </Container>
        </div>
    )
}

export default LightOptions