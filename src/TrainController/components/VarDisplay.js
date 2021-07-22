import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row } from 'react-bootstrap';

function VarDisplay({varName, message, data}) {
	
	return (
		<div className="componentDiv">
			<p className="componentLabel">{message}: </p>
			<div className="componentText">{data} </div>
		</div>
	)
}

export default VarDisplay;
