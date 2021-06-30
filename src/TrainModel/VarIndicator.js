import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet} from '../Database';
import { BsCircleFill } from "react-icons/bs";

function VarIndicator({varName, message}) {
	
	const [vari, setVari] = useState(false);

	useEffect(() => {setTimeout(()=>DatabaseGet(setVari, varName), 1000);}, []);

	return (
		<div>
			<Container>
				<Row>
					<h3>{message}</h3>
                    <BsCircleFill size="1.0em" color={vari ? "#C44242" : 'green'}/>
				</Row>
			</Container>
		</div>
	)
}

export default VarIndicator
