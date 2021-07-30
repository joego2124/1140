import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function ModeOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>MODES</h3>
            <Container>
                <Col>
                    <ButtonIndicator selectedTrain={selectedTrain} parentName={parentName} varName='ManualMode' message='Manual Mode'/>
                </Col>
            </Container>
        </div>
    )
}

export default ModeOptions