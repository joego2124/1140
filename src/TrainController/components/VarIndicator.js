import React, { useEffect, useState, useContext } from 'react';
import { BsCircleFill } from 'react-icons/bs';

function VarIndicator({ varName, message, data }) {
	return (
		<div className="componentDiv">
			<h3 className="indicatorText">{message}</h3>
			<BsCircleFill className="indicator" size="1.0em" color={data ? 'green' : "#C44242"}/>
		</div>
	)
}

export default VarIndicator;
