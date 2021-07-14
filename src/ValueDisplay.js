import React from 'react';
import './styles.css';

var exampleValueData = {
	value: "val from database",
	dropdownOptions: [
		<Dropdown.Item href="#/action-1">Action</Dropdown.Item>,
		<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>,
		<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
	],
	units: "miles"
}

const ValueDisplay = ({
	valueType,
	valueLabel,
	valueData,
}) => {

	const ret = <div className="controlPanelValueContainer">
		{valueLabel}
		{
			valueType === "input" ? (
				<Dropdown>
					<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
						{valueData.value}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{value.dropdownOptions}
					</Dropdown.Menu>
				</Dropdown>
			) : (
				<div className="controlPanelValueUnitLabel">
					<div>{valueData.value}</div>
					<div>{valueData.units}</div>
				</div>
			)
		}
	</div>

	return (ret);
}

export default ValueDisplay
