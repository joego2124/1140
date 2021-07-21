import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';

import PLCFileUpload from './PLCFileUpload';

const BottomPanel = ({ selectedWayside }) => {
  const [open, setOpen] = useState(true);
  const [crossingLights, setCrossingLights] = useState('string');
  const [length, setLength] = useState('string');
  const [levelCrossingState, setLevelCrossingState] = useState('string');
  const [occupancy, setOccupancy] = useState('string');
  const [speedLimit, setSpeedLimit] = useState('string');
  const [blockStatus, setBlockStatus] = useState('string');
  const [plcUploaded, setPlcUploaded] = useState(false);
  const [switchCommand, setSwitchCommand] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState('Block 1');

  function handleBlocks($event) {
    setSelectedBlock($event.target.value);
    // getWaysideListData();
  }

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
    let ref = Firebase.database().ref(
      '/GreenLine/' +
        selectedBlock.BlockNumber +
        '/' +
        selectedBlock.BlockNumber
    );
    ref.on('value', (snapshot) => {
      setCrossingLights(snapshot.val()?.CrossingLights);
      setLength(snapshot.val()?.BlockLength);
      setLevelCrossingState(snapshot.val()?.LevelCrossingState);
      setOccupancy(snapshot.val()?.Occupancy);
      setSpeedLimit(snapshot.val()?.SpeedLimit);
      setBlockStatus(snapshot.val()?.BlockStatus);
    });
  }

  useEffect(() => getWaysideListData(), []);

  function WaysideBlocks() {
    console.log(selectedWayside);
    const listItems = selectedWayside.map((key, block) => (
      <option value={block}>Block {block?.BlockNumber}</option>
    ));
    return (
      <div className='dataSection'>
        <select
          onChange={handleBlocks}
          value={'Block' + selectedBlock?.BlockNumber}
          className='blockSelect'
        >
          {listItems}
        </select>
        <div className='dataContainer'>
          <div className='dataLeft'>
            <div className='dataName'>
              Status:
              <div className='dataValue'>{selectedBlock.BlockStatus}</div>
            </div>
            <div className='dataName'>
              Occupancy:
              <div className='dataValue'>{selectedBlock.Occupancy}</div>
            </div>
            <div className='dataName'>
              Level Crossing:
              {selectedBlock.LevelCrossingState == true ? (
                <div className='dataValue'>Lowered</div>
              ) : (
                <div className='dataValue'>Raised</div>
              )}
            </div>
          </div>
          <div className='dataRight'>
            <div className='dataName'>
              Crossing Lights:
              {selectedBlock.CrossingLights == true ? (
                <div className='dataValue'>On</div>
              ) : (
                <div className='dataValue'>Off</div>
              )}
            </div>
            <div className='dataName'>
              Speed Limit:
              <div className='dataValue'>{selectedBlock.SpeedLimit} mph</div>
            </div>
            <div className='dataName'>
              Length:
              <div className='dataValue'>{selectedBlock.BlockLength} feet</div>
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
              {/* <div className='dataValue'>{switchCommand.toString()}</div> */}
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
