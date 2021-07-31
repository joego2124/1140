import React from 'react';
import { Container, Col } from 'react-bootstrap';
import ButtonIndicator from './components/ButtonIndicator';

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