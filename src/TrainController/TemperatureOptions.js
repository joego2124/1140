import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarInput from '../components/VarInput';
import TempInput from '../components/TempInput';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function TemperatureOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>TEMPERATURE</h3>
            <Container>
                <Col>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='ExternalTemperature' message='Ext. Temp' units='°F'/>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='InternalTemperature' message='Int. Temp' units='°F'/>
                    <TempInput selectedTrain={selectedTrain} parentName={parentName} varName='InternalTemperature' message='Int. Temp'/>
                </Col>
            </Container>
        </div>
    )
}

export default TemperatureOptions