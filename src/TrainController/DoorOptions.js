import React from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function DoorOptions(parentName) {
    return (
        <div>
            <h3>DOORS</h3>
            <Container>
                <Col>
                    <ButtonIndicator parentName={parentName} varName='DoorStatus' message='Toggle Doors'/>
                </Col>
            </Container>
        </div>
    )
}

export default DoorOptions