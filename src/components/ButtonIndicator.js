import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet, DatabaseSet} from '../Database';
import { BsCircleFill } from "react-icons/bs";
import "./componentStyles.css";

function ButtonIndicator({ varName, message, parentName }) {
  const [vari, setVari] = useState(false);

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);

	return (
		<div className="componentDiv">
			<Button variant="light" className="componentButton" 
					onClick={()=>{DatabaseSet(vari == true ? false : true, varName, parentName)}}>
				<div className="componentButtonText">{message}</div>
			</Button>
			<BsCircleFill className="indicator" size="1.5em" color={vari ? 'green' : "#C44242"}/>
		</div>
	)
}

export default ButtonIndicator;
