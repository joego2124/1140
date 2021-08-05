import React from 'react';
import { Container, Col } from 'react-bootstrap';
import VarIndicator from './components/VarIndicator';

function FailureStatus({parentName, selectedTrain}) {
    return (
        <div>
            <h3>FAILURES</h3>
            <Container>
                <Col>
                    <VarIndicator selectedTrain={selectedTrain} parentName={parentName} varName='BrakeFailure' message='Brake Failure'/>
                    <VarIndicator selectedTrain={selectedTrain} parentName={parentName} varName='EngineFailure' message='Engine Failure'/>
                    <VarIndicator selectedTrain={selectedTrain} parentName={parentName} varName='SignalFailure' message='Signal Failure'/>
                </Col>
            </Container>
        </div>
    )
}

export default FailureStatus