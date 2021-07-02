import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';
import rightAngle from './rightAngle.png';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';

const TempWaysideView = ({ changeSignal }) => {
  const [switchCommand, setSwitchCommand] = useState(true);
  const [signalCommand, setSignalCommand] = useState(true);

  Firebase.app();

  //when updates happen this is called and then it calls appropriate functions to update the page element
  const handleUpdate = () => {
    console.log(signalCommand === false ? true : false);
    setSignalCommandData(signalCommand === false ? true : false);
  };

  function setSignalCommandData(newState) {
    Firebase.database().ref('/WSC/SignalCommand').set(newState);
  }

  function getSignalCommandData() {
    let ref = Firebase.database().ref('/WSC/SignalCommand');
    ref.on('value', (snapshot) => {
      setSignalCommand(snapshot.val());
    });
  }

  function getSwitchCommandData() {
    let ref = Firebase.database().ref('/WSC/SwitchCommand');
    ref.on('value', (snapshot) => {
      setSwitchCommand(snapshot.val());
    });
  }

  useEffect(() => getSwitchCommandData(), []);

  useEffect(() => getSignalCommandData(), []);

  return (
    <div>
      <Button
        variant='dark'
        className='blockButton1'
        style={{ backgroundColor: 'Green' }}
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 1</div>
        </div>
      </Button>
      <Button
        variant='dark'
        className='blockButton2'
        style={{ backgroundColor: 'Green' }}
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 2</div>
        </div>
      </Button>
      {switchCommand === true ? (
        <div className='switch1Style'>
          <img src={rightAngle} height={100} width={100} />
        </div>
      ) : (
        <div className='switch2Style'>
          <img src={rightAngle} height={100} width={100} />
        </div>
      )}

      <Button
        variant='dark'
        className='blockButton3'
        style={{ backgroundColor: 'Green' }}
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 3</div>
        </div>
      </Button>
      <Button
        variant='dark'
        className='blockButton4'
        style={{ backgroundColor: signalCommand == true ? 'Green' : 'Red' }}
        onClick={handleUpdate}
      >
        <div className='buttonDiv'>
          <div className='buttonText'>Block 4</div>
        </div>
      </Button>
    </div>
  );
};

export default TempWaysideView;
