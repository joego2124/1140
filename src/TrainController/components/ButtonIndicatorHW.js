import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet3, DatabaseSet3} from '../../Database';
import { BsCircleFill } from "react-icons/bs";
import "../../components/componentStyles.css";

function ButtonIndicatorHW({ varName, message, parentName }) {
  const [enableHW, setEnableHW] = useState(false);

  useEffect(() => {
    setTimeout(() => DatabaseGet3(setEnableHW), 500);
  }, [parentName]);

	return (
		<div className="componentDiv">
			<Button variant="light" className="componentButton" 
					onClick={()=>{DatabaseSet3(enableHW == true ? false : true)}}>
				<h3 className="componentButtonText">{message}</h3>
			</Button>
			<BsCircleFill className="indicator" size="1.5em" color={enableHW ? 'green' : "#C44242"}/>
		</div>
	)
}

export default ButtonIndicatorHW;
