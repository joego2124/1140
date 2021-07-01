import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Column from 'react-bootstrap/Column'
import config from '../config'
import Firebase from 'firebase'
import ButtonIndicator from '../components/ButtonIndicator'
import VarDisplay from '../components/VarDisplay'
import VarIndicator from '../components/VarIndicator'
import { DatabaseGet } from '../Database'
import { DatabaseSet } from '../Database'

const DoorOptions = () => {

    const [eDoor, setEDoor] = useState(false);
    const [sDoor, setSDoor] = useState(false);

    Firebase.app();

    useEffect(() => {setTimeout(() => DatabaseGet(setEDoor, 'Emergency Door', parentName), 500);}, [parentName]);
    useEffect(() => {setTimeout(() => DatabaseGet(setSDoor, 'Service Door', parentName), 500);}, [parentName]);

    

    return (
        <div style={{
            textAlign: 'center',
            background: '#cfdfe3',
            width: '70%'
        }}>
            <h1>Door Options</h1>
            <div style={{
                textAlign: 'left',
                paddingLeft: 50,
                paddingRight: 50,
                paddingBottom: 50
            }}>
                <Container fluid>
                    <Row></Row>
                </Container>
            </div>
            
        </div>
    )
}

export default DoorOptions
