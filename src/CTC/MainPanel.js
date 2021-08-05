	import React, { useState, useCallback, useEffect } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button, Dropdown } from 'react-bootstrap';
import ValueIO from "./ValueIO";
import Firebase from "firebase";


import './styles.css';

var trackLayout = require('./TrackLayout.json');

const MainPanel = ({ setModalShow, selectedTrain, selectedBlock }) => {
  const [open, setOpen] = useState(true);
  const [manualMode, setManualMode] = useState(false);

  const formatSwitchState = useCallback(
    (switchState) => {
      console.log('formatted switch state');
      let layoutBlock = trackLayout[
        selectedBlock.Line?.toLowerCase() + 'Line'
      ]?.find(
        (block) => Math.trunc(block.blockId) == selectedBlock.BlockNumber
      );

	const [open, setOpen] = useState(true);
	const [manualMode, setManualMode] = useState(false);
	const [throughput, setThroughput] = useState(0);

      return 'N/A';
    },
    [selectedBlock]
  );

		if (layoutBlock != undefined) {
			if (layoutBlock.connectors.length < 2) return "N/A"
			let str = "";
			let flag = false;
			layoutBlock.connectors[switchState].forEach(id => {
				str += id != null ? id : "";
				if (!flag && id != null) {
					flag = true;
					str += " : ";	
				};
			});
			return str;
		}
		
		return "N/A";
	}, [selectedBlock]);

	useEffect(() => {
		Firebase.database().ref("/CTC/Throughput").on("value", snapshot => setThroughput(snapshot.val()));
	}, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)} className='showControlPanelButton'>
        Show Controls
      </Button>
      <SlidingPane
        isOpen={open}
        from='bottom'
        width='100%'
        overlayClassName='bottomPanel'
        onRequestClose={() => setOpen(false)}
      >
        <div className='controlPanelHolder'>
          <div
            className='controlPanelSection'
            style={{ maxWidth: '225px', minWidth: '225px' }}
          >
            <div className='modeSection'>
              <Button
                className='button'
                variant={`${!manualMode ? 'outline-' : ''}dark`}
                onClick={() => setManualMode(!manualMode)}
              >
                Manual Mode
              </Button>
              <Button
                className='button'
                variant='primary'
                onClick={() => setModalShow(true)}
              >
                Show Schedule
              </Button>
            </div>
          </div>

          <div className='controlPanelSection'>
            <div className='controlPanelSubSection'>
              <ValueIO
                valueType='output'
                valueLabel='Next Destination'
                valueData={{
                  value: selectedTrain.NextStation,
                }}
              />
              <ValueIO
                valueType='output'
                valueLabel='Current Block ID'
                valueData={{
                  value: `${selectedTrain.Line === 'GreenLine' ? 'GRN' : 'RD'}${
                    selectedTrain.CurrentBlock
                  }`,
                }}
              />
              <ValueIO
                valueType='output'
                valueLabel='Departure Time'
                valueData={{
                  value: selectedTrain.DepartureTime,
                }}
              />
            </div>

            <div className='controlPanelDivider'></div>

            <div className='controlPanelSubSection'>
              <ValueIO
                valueType='output'
                valueLabel='Next Block'
                valueData={{
                  value: selectedTrain.NextBlock,
                }}
              />
              <ValueIO
                valueType='output'
                valueLabel='Commanded Speed'
                valueData={{
                  value: selectedTrain.SpeedLimit,
                  units: 'mi/hr',
                }}
              />
              <ValueIO
                valueType='output'
                valueLabel='Train ID'
                valueData={{
                  value: selectedTrain.TrainId,
                }}
              />
            </div>
          </div>
          <div className='controlPanelSection'>
            <div className='controlPanelSubSection'>
              <ValueIO
                valueType='input'
                valueLabel='Signal State'
                valueDatabasePath={`${selectedTrain.databasePath}/SignalState`}
                valueData={{
                  value: selectedTrain.SignalState,
                  dropdownList: [
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>,
                  ],
                }}
              />
              <ValueIO
                valueType={
                  selectedBlock.isSwitchBlock == 1 ? 'input' : 'output'
                }
                valueLabel='Switch State'
                valueDatabasePath={`${selectedBlock.databasePath}/SwitchState`}
                valueData={{
                  value: !formatSwitchState(selectedBlock.SwitchState)
                    ? 'N/A'
                    : formatSwitchState(selectedBlock.SwitchState),
                  dropdownList: [
                    <Dropdown.Item eventKey={1}>
                      {formatSwitchState(1)}
                    </Dropdown.Item>,
                    <Dropdown.Item eventKey={0}>
                      {formatSwitchState(0)}
                    </Dropdown.Item>,
                  ],
                }}
              />
              <ValueIO
                valueType='input'
                valueLabel='Maintenance Status'
                valueDatabasePath={`${selectedBlock.databasePath}/MaintenanceStatus`}
                valueData={{
                  value:
                    selectedBlock.MaintenanceStatus == 1 ? 'TRUE' : 'FALSE',
                  dropdownList: [
                    <Dropdown.Item eventKey={1}>TRUE</Dropdown.Item>,
                    <Dropdown.Item eventKey={0}>FALSE</Dropdown.Item>,
                  ],
                }}
              />
            </div>

            <div className='controlPanelDivider'></div>

						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="output"
								valueLabel="Next Block"
								valueData={{
									value: selectedTrain.NextBlock,
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Commanded Speed"
								valueData={{
									value: selectedTrain.SpeedLimit,
									units: "mi/hr"
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Train ID"
								valueData={{
									value: selectedTrain.TrainId,
								}}
							/>
						</div>
					</div>
					<div className = "controlPanelSection">
						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="input"
								valueLabel="Signal State"
								valueDatabasePath={`${selectedTrain.databasePath}/SignalState`}
								valueData={{
									value: selectedTrain.SignalState,
									dropdownList: [
										<Dropdown.Item href="#/action-1">Action</Dropdown.Item>,
									],
								}}
							/>
							<ValueIO 
								valueType={(selectedBlock.isSwitchBlock == 1 && selectedBlock.MaintenanceStatus == 1) ? "input" : "output"}
								valueLabel="Switch State"
								valueDatabasePath={`${selectedBlock.databasePath}/SwitchState`}
								valueData={{
									value: !formatSwitchState(selectedBlock.SwitchState) ? "N/A" : formatSwitchState(selectedBlock.SwitchState),
									dropdownList: [
										<Dropdown.Item eventKey={1}>{formatSwitchState(1)}</Dropdown.Item>,
										<Dropdown.Item eventKey={0}>{formatSwitchState(0)}</Dropdown.Item>,
									],
								}}
							/>
							<ValueIO 
								valueType="input"
								valueLabel="Maintenance Status"
								valueDatabasePath={`${selectedBlock.databasePath}/MaintenanceStatus`}
								valueData={{
									value: selectedBlock.MaintenanceStatus == 1 ? "TRUE" : "FALSE",
									dropdownList: [
										<Dropdown.Item eventKey={1}>TRUE</Dropdown.Item>,
										<Dropdown.Item eventKey={0}>FALSE</Dropdown.Item>,
									],
								}}
							/>
						</div>

						<div className="controlPanelDivider"></div>
						
						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="output"
								valueLabel="Selected Block"
								valueData={{
									value: `${selectedBlock.Line}${selectedBlock.BlockNumber}`,
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Track Occupancy"
								valueData={{
									value: selectedBlock.Occupancy === 0 ? "FALSE" : "TRUE",
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Tickets"
								valueData={{
									value: throughput,
									units: "tickets/hr"
								}}
							/>
						</div>
					</div>
				</div>
			</SlidingPane>
		</div>
	)
}

export default MainPanel
