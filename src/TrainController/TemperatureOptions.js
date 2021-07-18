import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarInput from '../components/VarInput';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function TemperatureOptions(parentName) {
    return (
        <div>
            <h3>TEMPERATURE</h3>
            <Container>
                <Col>
                    <VarDisplay parentName={parentName} varName='ExternalTemperature' message='External Temperature'/>
                    <VarDisplay parentName={parentName} varName='InternalTemperature' message='Internal Temperature'/>
                    <VarInput parentName={parentName} varName='InternalTemperature' message='Internal Temperature'/>
                </Col>
            </Container>
        </div>
    )
}

export default TemperatureOptions