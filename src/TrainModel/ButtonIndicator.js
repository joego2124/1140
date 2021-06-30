import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet, DatabaseSet} from '../Database';
import { BsCircleFill } from "react-icons/bs";

function ButtonIndicator({varName, message}) {
	
	const [vari, setVari] = useState(false);

	useEffect(() => {setTimeout(()=>DatabaseGet(setVari, varName), 1000);}, []);

	return (
		<div>
			<Container>
				<Row>
					<Button onClick={()=>{DatabaseSet(vari == true ? false : true, varName)}}>{message}</Button>
                    <BsCircleFill size="1.0em" color={vari ? "#C44242" : 'green'}/>
				</Row>
			</Container>
		</div>
	)
}

export default ButtonIndicator
