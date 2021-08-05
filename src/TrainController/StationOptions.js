import React from 'react';
import { Container, Col } from 'react-bootstrap';
import VarDisplay from './components/VarDisplay';
import ButtonIndicatorTime from './components/ButtonIndicatorTime';

function StationOptions({parentName, selectedTrain}) {
    return (
        <div>
            <h3>STATIONS</h3>
            <Container>
                <Col>
                  <VarDisplay selectedTrain={selectedTrain} parentName={parentName} varName='Stations' message='Next Station' units=''/>
                  <ButtonIndicatorTime message='Announce'/>
                </Col>
            </Container>
        </div>
    )
}

export default StationOptions