import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from './components/VarDisplay';
import TempInput from './components/TempInput';

function TemperatureOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>TEMPERATURE</h3>
            <Container>
                <Col>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='ExternalTemperature' message='External Temperature' units='°F'/>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='InternalTemperature' message='Internal Temperature' units='°F'/>
                    <TempInput selectedTrain={selectedTrain} parentName={parentName} varName='InternalTemperature'/>
                </Col>
            </Container>
        </div>
    )
}

export default TemperatureOptions