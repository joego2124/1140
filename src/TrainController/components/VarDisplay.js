import React, { useEffect, useState, useContext } from "react";
import {DatabaseGet, DatabaseSet} from '../../Database';
import "../../components/componentStyles.css";

function VarDisplay({varName, message, parentName, units, selectedTrain}) {

	const [vari, setVari] = useState('default');

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);
	return (
		<div className="componentDiv">
			<p className="componentLabel">{message}: </p>
			<div className="componentText">{selectedTrain != undefined ? selectedTrain[varName] : vari}</div> {units}
		</div>
	)
}

export default VarDisplay