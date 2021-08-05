import React from 'react';
import { Container, Col } from 'react-bootstrap';
import ButtonIndicator from './components/ButtonIndicator';

function DoorOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>DOORS</h3>
            <Container>
                <Col>
                    <ButtonIndicator selectedTrain={selectedTrain} parentName={parentName} varName='DoorStatus' message='Toggle Doors'/>
                </Col>
            </Container>
        </div>
    )
}

export default DoorOptions