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
  const [block1List, setBlock1List] = useState([]);
  const [block2List, setBlock2List] = useState([]);
  const [block3List, setBlock3List] = useState([]);
  const [crossingLights, setCrossingLights] = useState('string');
  const [length, setLength] = useState('string');
  const [levelCrossing, setLevelCrossing] = useState('string');
  const [occupancy, setOccupancy] = useState('string');
  const [speedLimit, setSpeedLimit] = useState('string');
  const [status, setStatus] = useState('string');
  const [plcUploaded, setPlcUploaded] = useState(false);
  const [switchCommand, setSwitchCommand] = useState(0);
  const []

  Firebase.app();

  //when updates happen this is called and then it calls appropriate functions to update the page element
  const handleUpdate = () => {
    console.log(switchCommand == 0 ? 1 : 0);
    setSwitchCommandData(switchCommand == 0 ? 1 : 0);
  };

  function updateData(block) {
    this.setState({selectValue: e.target.value});

    if (block == 1) {
      setCrossingLights(block1List.CrossingLights);
      setLength(block1List.Length);
      setLevelCrossing(block1List.LevelCrossing);
      setOccupancy(block1List.Occupancy);
      setSpeedLimit(block1List.SpeedLimit);
      setStatus(block1List.Status);
    } else if (block == 2) {
      setCrossingLights(block2List.CrossingLights);
      setLength(block2List.Length);
      setLevelCrossing(block2List.LevelCrossing);
      setOccupancy(block2List.Occupancy);
      setSpeedLimit(block2List.SpeedLimit);
      setStatus(block2List.Status);
    } else {
      setCrossingLights(block3List.CrossingLights);
      setLength(block3List.Length);
      setLevelCrossing(block3List.LevelCrossing);
      setOccupancy(block3List.Occupancy);
      setSpeedLimit(block3List.SpeedLimit);
      setStatus(block3List.Status);
    }

    console.log(blockList[block]);
    setCrossingLights(blockList[block].CrossingLights);
    setLength(blockList[1].Length);
    setLevelCrossing(blockList[1].LevelCrossing);
    setOccupancy(blockList[1].Occupancy);
    setSpeedLimit(blockList[1].SpeedLimit);
    setStatus(blockList[1].Status);
  }

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
      console.log(snapshot.val().Block1);
      setBlock1List(snapshot.val().Block1);
      setBlock2List(snapshot.val().Block2);
      setBlock3List(snapshot.val().Block3);
      // setBlockList(
      //   Object.entries(snapshot.val()).map((element, index) => {
      //     return { ...element[1], blockId: element[0] };
      //   })
      // );
      // console.log(blockList);
      // var newArray = [];
      // val.keys(key => console.log(key));
      // snapshot.val().forEach((key, value) => newArray.push(value));
      // console.log(newArray);
    });
  }

  useEffect(() => getWaysideListData(), []);

  // console.log(blockList);
  // const listItems = blockList.map((blockIndex) => {
  //   return (
  //     <option value={blockIndex} key={blockIndex.toString()}>
  //       Block {blockIndex}
  //     </option>
  //   );
  // });

  // const listItems = blockList.map((blockIndex) => {
  //   return <option value={blockIndex}>Block {blockIndex}</option>;
  // });
  // console.log(listItems);

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
            {/* <select className='blockSelect'>{listItems}</select> */}
            <select
              className='blockSelect'
              onChange={updateData}
            >
              <option value={1}>Block 1</option>
              <option value={2}>Block 2</option>
              <option value={3}>Block 3</option>
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
