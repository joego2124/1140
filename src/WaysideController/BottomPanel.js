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
  const [switchCommand, setSwitchCommand] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState('Block 1');

  Firebase.app();

  //when updates happen this is called and then it calls appropriate functions to update the page element
  const handleUpdate = () => {
    console.log(switchCommand == false ? true : false);
    setSwitchCommandData(switchCommand == false ? true : false);
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
    console.log(selectedBlock);
    let ref = Firebase.database().ref('/WSC/WS-1/Block1');
    if (selectedBlock == 'Block 1') {
      ref = Firebase.database().ref('/WSC/WS-1/Block1');
    } else if (selectedBlock == 'Block 2') {
      ref = Firebase.database().ref('/WSC/WS-1/Block2');
    } else if (selectedBlock == 'Block 3') {
      ref = Firebase.database().ref('/WSC/WS-1/Block3');
    }
    ref.on('value', (snapshot) => {
      setBlockList(['Block 1', 'Block 2', 'Block 3']);
      setCrossingLights(snapshot.val().CrossingLights);
      setLength(snapshot.val().Length);
      setLevelCrossing(snapshot.val().LevelCrossing);
      setOccupancy(snapshot.val().Occupancy);
      setSpeedLimit(snapshot.val().SpeedLimit);
      setStatus(snapshot.val().Status);
    });
  }

  useEffect(() => getWaysideListData(), []);

  function handleBlocks($event) {
    setSelectedBlock($event.target.value);
    getWaysideListData();
  }

  function WaysideBlocks() {
    const listItems = blockList.map((blockIndex) => (
      <option value={blockIndex}>{blockIndex}</option>
    ));
    return (
      <div className='dataSection'>
        <select
          onChange={handleBlocks}
          value={selectedBlock}
          className='blockSelect'
        >
          {listItems}
        </select>
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
              {levelCrossing == true ? (
                <div className='dataValue'>Lowered</div>
              ) : (
                <div className='dataValue'>Raised</div>
              )}
            </div>
          </div>
          <div className='dataRight'>
            <div className='dataName'>
              Crossing Lights:
              {crossingLights == true ? (
                <div className='dataValue'>On</div>
              ) : (
                <div className='dataValue'>Off</div>
              )}
            </div>
            <div className='dataName'>
              Speed Limit:
              <div className='dataValue'>{speedLimit} mph</div>
            </div>
            <div className='dataName'>
              Length:
              <div className='dataValue'>{length} feet</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <div className='dataValue'>{switchCommand.toString()}</div>
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
          <WaysideBlocks />
        </div>
      </SlidingPane>
    </div>
  );
};

export default BottomPanel;
