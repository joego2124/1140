import React, { useEffect, useState, useContext } from 'react';
import { DatabaseGet } from '../Database';
import { BsCircleFill } from 'react-icons/bs';

function VarIndicator({ varName, message, parentName }) {
  const [vari, setVari] = useState(false);

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);

	return (
		<div className="componentDiv">
			<div className="indicatorText">{message}</div>
			<BsCircleFill className="indicator" size="1.0em" color={vari ? 'green' : "#C44242"}/>
		</div>
	)
}

export default VarIndicator;
