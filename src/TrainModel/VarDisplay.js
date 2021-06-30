import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet} from '../Database';

function VarDisplay({varName, message}) {
	
	const [vari, setVari] = useState('default');

	useEffect(() => {setTimeout(()=>DatabaseGet(setVari, varName), 1000);}, []);

	return (
		<div>
            <Container>
                <Row>
                    <h3>{message}: {vari}</h3>
                </Row>
            </Container>
		</div>
	)
}

export default VarDisplay
