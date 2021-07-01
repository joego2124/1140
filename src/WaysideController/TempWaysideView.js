import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';

import PLCFileUpload from './PLCFileUpload';

const TempWaysideView = () => {
  //   const [blockList, setBlockList] = useState([]);
  //   const [crossingLights, setCrossingLights] = useState('string');
  //   const [length, setLength] = useState('string');
  //   const [levelCrossing, setLevelCrossing] = useState('string');
  //   const [occupancy, setOccupancy] = useState('string');
  //   const [speedLimit, setSpeedLimit] = useState('string');
  //   const [status, setStatus] = useState('string');
  //   const [plcUploaded, setPlcUploaded] = useState(false);
  const [switchCommand, setSwitchCommand] = useState(0);

  Firebase.app();

  //when updates happen this is called and then it calls appropriate functions to update the page element
  //   const handleUpdate = () => {
  //     console.log(switchCommand == 0 ? 1 : 0);
  //     setSwitchCommandData(switchCommand == 0 ? 1 : 0);
  //   };

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

  return (
    <div>
      <Button
        variant='light'
        className='moveSwitchButton'
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 1</div>
        </div>
      </Button>
      <Button
        variant='light'
        className='moveSwitchButton'
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 2</div>
        </div>
      </Button>
      <Button
        variant='light'
        className='moveSwitchButton'
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 3</div>
        </div>
      </Button>
    </div>
  );
};

export default TempWaysideView;
