import React from 'react';
import { Container, Col } from 'react-bootstrap';
import ButtonIndicatorHW from './components/ButtonIndicatorHW';

function HardwareOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>HARDWARE</h3>
            <Container>
                <Col>
                    <ButtonIndicatorHW selectedTrain={selectedTrain} parentName={parentName} varName='EnableHardware' message='Enable Hardware'/>
                </Col>
            </Container>
        </div>
    )
}

export default HardwareOptions