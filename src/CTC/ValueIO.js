import { Button, Dropdown } from 'react-bootstrap';
import React from 'react'

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
							console.log(`event key: ${e}, valueDatabasePath: ${valueDatabasePath}`);
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
