import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';
import VarInput from '../components/VarInput';

function TrainStatus(parentName) {
    return (
        <div>
            <h3>SPEED</h3>
            <Container>
                <Col>
                    <VarDisplay parentName={parentName} varName='SpeedLimit' message='Speed Limit'/>
                    <VarDisplay parentName={parentName} varName='CurrentSpeed' message='Current Speed'/>
                    <VarDisplay parentName={parentName} varName='Authority' message='Authority'/>
                    <VarInput parentName={parentName} varName='SetpointSpeed' message='Setpoint Speed'/>
                </Col>
            </Container>
        </div>
    )
}

export default TrainStatus