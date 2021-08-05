import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet3, DatabaseSet3} from '../../Database';
import { BsCircleFill } from "react-icons/bs";
import "../../components/componentStyles.css";

function ButtonIndicatorTime({ message }) {

	return (
		<div className="componentDiv">
			<Button variant="light" className="componentButton" 
					onClick={()=>{DatabaseSet3(true == true ? false : true)}}>
				<h3 className="componentButtonText">{message}</h3>
			</Button>
			<BsCircleFill className="indicator" size="1.5em" color={true ? 'green' : "#C44242"}/>
		</div>
	)
}

export default ButtonIndicatorTime;
