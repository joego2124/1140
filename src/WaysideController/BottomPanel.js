import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';
import { DatabaseGet, DatabaseSet } from '../Database';

import PLCFileUpload from './PLCFileUpload';
import VarDisplay from '../components/VarDisplay';

const BottomPanel = ({ selectedWayside }) => {
  const [open, setOpen] = useState(true);
  const [plcUploaded, setPlcUploaded] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [selectedBlockOccupancy, setSelectedBlockOccupancy] = useState();

  function handleBlocks(event) {
    if (event != undefined) {
      setSelectedBlock(
        selectedWayside?.find((v) => v.BlockNumber == event.target.value)
      );
    } else {
      setSelectedBlock(selectedWayside[0]);
    }
  }

  function setSwitchStateData() {
    let newState = selectedBlock?.SwitchState == 0 ? 1 : 0;
    let link = '/GreenLine/' + selectedBlock.BlockNumber + '/SwitchState';
    Firebase.database().ref(link).set(newState);
    selectedBlock.SwitchState = newState;
  }

  function getOccupancyData() {
    let link = 'GreenLine/' + selectedBlock.BlockNumber;
    let ref = Firebase.database().ref(link);
    ref.on('value', (snapshot) => {
      let newState = snapshot.val().Occupancy;
      selectedBlock.Occupancy = newState;
    });
  }

  useEffect(() => getOccupancyData(), []);

  useEffect(() => handleBlocks(), [selectedWayside]);

  function WaysideBlocks() {
    const listItems = selectedWayside?.map((block) => (
      <option value={block.BlockNumber}>
        {block.BlockNumber == -1 ? 'Yard' : 'Block ' + block.BlockNumber}
      </option>
    ));
    return (
      <div className='dataSection'>
        <select
          onChange={handleBlocks}
          value={selectedBlock?.BlockNumber}
          className='blockSelect'
        >
          {listItems}
        </select>
        <div className='dataContainer'>
          <div className='dataLeft'>
            <div className='dataName'>
              Status:
              <div className='dataValue'>{selectedBlock?.BlockStatus}</div>
            </div>
            <div className='dataName'>
              Occupancy:
              <div className='dataValue'>{selectedBlock?.Occupancy}</div>
            </div>
            <div className='dataName'>
              Level Crossing:
              {selectedBlock?.isLevelCrossingBlock == true ? (
                selectedBlock?.LevelCrossingState == true ? (
                  <div className='dataValue'>Lowered</div>
                ) : (
                  <div className='dataValue'>Raised</div>
                )
              ) : (
                <div className='dataValue'>None</div>
              )}
            </div>
          </div>
          <div className='dataRight'>
            <div className='dataName'>
              Crossing Lights:
              {selectedBlock?.isLevelCrossingBlock == true ? (
                selectedBlock?.CrossingLights == true ? (
                  <div className='dataValue'>On</div>
                ) : (
                  <div className='dataValue'>Off</div>
                )
              ) : (
                <div className='dataValue'>None</div>
              )}
            </div>
            <div className='dataName'>
              Speed Limit:
              <div className='dataValue'>{selectedBlock?.SpeedLimit} mph</div>
            </div>
            <div className='dataName'>
              Length:
              <div className='dataValue'>{selectedBlock?.BlockLength} feet</div>
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
              <div className='dataValue'>
                {selectedBlock?.isSwitchBlock == true
                  ? selectedBlock?.SwitchState
                  : 'None'}
              </div>
            </div>
            <Button
              variant='light'
              className='moveSwitchButton'
              onClick={setSwitchStateData}
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
