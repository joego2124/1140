import { Button, Dropdown } from 'react-bootstrap';
import React from 'react'

import Firebase from "firebase";

const ValueIO = ({
	valueType,
	valueLabel,
	valueData,
	valueDatabasePath
}) => {
	return (
		<div className="controlPanelValueContainer">
			<div style={{
				maxWidth: '125px',
			}}>{valueLabel}</div>
			{
				valueType === "input" ? (
					<Dropdown
						onSelect={e => {
							let newVal = e;
							if (e == 0 || e == 1) {
								newVal = Number(e);
							} else if (typeof e == "boolean") {
								newVal = Boolean(e);
							}
							Firebase.database().ref(valueDatabasePath).set(newVal);
							console.log(`[CTC/ManiPanel/ValueIO] event key: ${e}, valueDatabasePath: ${valueDatabasePath}`);
						}}
					>
						<Dropdown.Toggle 
							variant="outline-dark" 
							id="dropdown-basic" 
							style={{
								width: "150px",
								height: "35px",
								borderRadius: "100px",
							}}
						>
							{valueData.value}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{valueData.dropdownList}
						</Dropdown.Menu>
					</Dropdown>
				) : (
					<div className="controlPanelValueUnitLabel">
						<div>{valueData.value != undefined ? valueData.value : "N/A"}</div>
						{valueData.units === undefined ? (<></>) : (<div>{valueData.units}</div>)}
					</div>
				)
			}
		</div>
	)
}

export default ValueIO
