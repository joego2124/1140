import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import SPSInput from '../components/SPSInput';

function TrainStatus({parentName, selectedTrain}) {
    return (
        <div>
            <h3>SPEED</h3>
            <Container>
                <Col>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='Power' message='Power' units='kW'/>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='SpeedLimit' message='Speed Limit' units='mph'/>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='Velocity' message='Velocity' units='mph'/>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='SetpointSpeed' message='Setpoint Speed' units='mph'/>
                    <SPSInput selectedTrain={selectedTrain} parentName={parentName} varName='SetpointSpeed' message='Setpoint Speed' units='mph'/>
                </Col>
            </Container>
        </div>
    )
}

export default TrainStatus