import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';

import PLCFileUpload from './PLCFileUpload';

const BottomPanel = () => {
  const [open, setOpen] = useState(true);
  const [blockList, setBlockList] = useState([]);
  const [crossingLights, setCrossingLights] = useState('string');
  const [length, setLength] = useState('string');
  const [levelCrossing, setLevelCrossing] = useState('string');
  const [occupancy, setOccupancy] = useState('string');
  const [speedLimit, setSpeedLimit] = useState('string');
  const [status, setStatus] = useState('string');
  const [plcUploaded, setPlcUploaded] = useState(false);
  const [switchCommand, setSwitchCommand] = useState(0);

  Firebase.app();

  //when updates happen this is called and then it calls appropriate functions to update the page element
  const handleUpdate = () => {
    console.log(switchCommand == 0 ? 1 : 0);
    setSwitchCommandData(switchCommand == 0 ? 1 : 0);
  };

  function getSwitchCommandData() {
    let ref = Firebase.database().ref('/WSC/SwitchCommand');
    ref.on('value', (snapshot) => {
      setSwitchCommand(snapshot.val());
    });
  }

  function setSwitchCommandData(newState) {
    Firebase.database().ref('/WSC/SwitchCommand').set(newState);
  }

  useEffect(() => getSwitchCommandData(), []);

  function getWaysideListData() {
    let ref = Firebase.database().ref('/WSC/WS-1');
    ref.on('value', (snapshot) => {
      setBlockList(Object.entries(snapshot.val()).map((element, index) => { 
				return {...element[1], blockId: element[0]};
			}));
      // var newArray = [];
			// val.keys(key => console.log(key));
      // snapshot.val().forEach((key, value) => newArray.push(value));
      // console.log(newArray);
			
      // setCrossingLights(snapshot.val().CrossingLights);
      // setLength(snapshot.val().Length);
      // setLevelCrossing(snapshot.val().LevelCrossing);
      // setOccupancy(snapshot.val().Occupancy);
      // setSpeedLimit(snapshot.val().SpeedLimit);
      // setStatus(snapshot.val().Status);
    });
  }

  useEffect(() => getWaysideListData(), []);

	// const listItems = blockList.map((blockIndex) => <option value={blockIndex}>{blockIndex}</option>);
	// console.log(blockList.map((blockIndex) => <option value={blockIndex}>{blockIndex}</option>));
	const listItems = [<option value={0}>0</option>, <option value={1}>1</option>];
	console.log(listItems);
	// const listItems = [];
  // function WaysideBlocks() {
  //   return (
     
  //   );
  // }

  return (
    <div>
      <Button
        onClick={() => {
          if (open == true) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
        className='showBottomPanelButton'
      >
        Show Controls
      </Button>
      <SlidingPane
        isOpen={open}
        from='bottom'
        width='100%'
        overlayClassName='bottomPanel'
        onRequestClose={() => setOpen(false)}
      >
        <div className='bottomPanelHolder'>
          <div className='uploadPLCSection'>
            Upload PLC
            <div className='dataName'>
              Upload Status:
              <div className='dataValue'>
                {plcUploaded ? ' Uploaded' : ' Not Uploaded'}
              </div>
            </div>
            <PLCFileUpload setter={setPlcUploaded} />
          </div>
          <div className='moveSwitchSection'>
            Move Switch
            <div className='dataName'>
              Current State:
              <div className='dataValue'>{switchCommand}</div>
            </div>
            <Button
              variant='light'
              className='moveSwitchButton'
              onClick={handleUpdate}
            >
              <div className='buttonDiv'>
                <div className='buttonText'>Click to Move Switch</div>
              </div>
            </Button>
          </div>
				
					<div className='dataSection'>
						<select className='blockSelect'>{listItems}</select>
						<div className='dataContainer'>
							<div className='dataLeft'>
								<div className='dataName'>
									Status:
									<div className='dataValue'>{status}</div>
								</div>
								<div className='dataName'>
									Occupancy:
									<div className='dataValue'>{occupancy}</div>
								</div>
								<div className='dataName'>
									Level Crossing:
									<div className='dataValue'>{levelCrossing}</div>
								</div>
							</div>
							<div className='dataRight'>
								<div className='dataName'>
									Crossing Lights:
									<div className='dataValue'>{crossingLights}</div>
								</div>
								<div className='dataName'>
									Speed Limit:
									<div className='dataValue'>{speedLimit}</div>
								</div>
								<div className='dataName'>
									Length:
									<div className='dataValue'>{length}</div>
								</div>
							</div>
						</div>
					</div>

        </div>
      </SlidingPane>
    </div>
  );
};

export default BottomPanel;
