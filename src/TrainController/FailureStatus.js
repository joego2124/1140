import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function FailureStatus(parentName) {
    return (
        <div>
            <h3>FAILURES</h3>
            <Container>
                <Col>
                    <VarIndicator parentName={parentName} varName='BrakeFailure' message='Brake Failure'/>
                    <VarIndicator parentName={parentName} varName='EngineFailure' message='Engine Failure'/>
                    <VarIndicator parentName={parentName} varName='SignalFailure' message='Signal Failure'/>
                </Col>
            </Container>
        </div>
    )
}

export default FailureStatus