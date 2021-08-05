import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet2, DatabaseSet2} from '../../Database';
import { BsCircleFill } from "react-icons/bs";
import "../../components/componentStyles.css";

function ButtonIndicator({ varName, message, parentName }) {
  const [vari, setVari] = useState(false);

  useEffect(() => {
    setTimeout(() => DatabaseGet2(setVari, varName, parentName), 500);
  }, [parentName]);

	return (
		<div className="componentDiv">
			<Button variant="light" className="componentButton" 
					onClick={()=>{DatabaseSet2(vari == true ? false : true, varName, parentName)}}>
				<h3 className="componentButtonText">{message}</h3>
			</Button>
			<BsCircleFill className="indicator" size="1.5em" color={vari ? 'green' : "#C44242"}/>
		</div>
	)
}

export default ButtonIndicator;
