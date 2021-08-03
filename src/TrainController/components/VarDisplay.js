import React, { useEffect, useState, useContext } from "react";
import {DatabaseGet2} from '../../Database';
import "../../components/componentStyles.css";

function VarDisplay({varName, message, parentName, units, selectedTrain}) {

	const [vari, setVari] = useState('default');

  useEffect(() => {
    setTimeout(() => DatabaseGet2(setVari, varName, parentName), 500);
  }, [parentName]);
	return (
		<div className="componentDiv">
			<p className="componentLabel">{message}: </p>
			<div className="componentText">{selectedTrain != undefined ? Math.round((selectedTrain[varName] + Number.EPSILON) * 100 ) / 100 : vari}</div> {units}
		</div>
	)
}

export default VarDisplay