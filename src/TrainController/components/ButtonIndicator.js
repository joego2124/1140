import React, { useEffect, useState, useContext } from "react";
import { BsCircleFill } from "react-icons/bs";
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet, DatabaseSet} from '../../Database';
import "../../components/componentStyles.css";

function ButtonIndicator({ varName, message, parentName, selectedTrain }) {
  const [vari, setVari] = useState(false);

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);
	return (
		<div className="componentDiv">
			<Button variant="light" className="componentButton" 
					onClick={()=>{DatabaseSet(vari == true ? false : true, varName, parentName)}}>
				<h3 className="componentButtonText">{message}</h3>
			</Button>
			<BsCircleFill className="indicator" size="1.5em" color={selectedTrain[varName] ? '#33A8FF' : "#FFA233"}/>
		</div>
	)
}

export default ButtonIndicator; 