import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from './components/VarDisplay';
import KpInput from './components/KpInput';
import KiInput from './components/KiInput';

function GainOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>GAIN</h3>
            <Container>
                <Col>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='Kp' message='Proportional Gain' units=''/>
                    <KpInput selectedTrain={selectedTrain} parentName={parentName} varName='Kp'/>
                    <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='Ki' message='Integral Gain' units=''/>
                    <KiInput selectedTrain={selectedTrain} parentName={parentName} varName='Ki'/>
                </Col>
            </Container>
        </div>
    )
}

export default GainOptions