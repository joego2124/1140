import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function DoorOptions(parentName, selectedTrain) {
    return (
        <div>
            <h3>DOORS</h3>
            <Container>
                <Col>
                    <ButtonIndicator selectedTrain={selectedTrain} parentName={parentName} varName='EDoorStatus' message='Toggle Doors'/>
                </Col>
            </Container>
        </div>
    )
}

export default DoorOptions