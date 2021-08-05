import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';
import { BsCircleFill } from 'react-icons/bs';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';

const WaysidePanel = ({
  setTrackColor,
  greenWaysideList,
  redWaysideList,
  setSelectedWayside,
  setSelectedWaysideName,
}) => {
  const [open, setOpen] = useState(true);
  const [waysideButtonList, setWaysideButtonList] = useState([]);
  const [selectedWaysideList, setSelectedWaysideList] =
    useState(greenWaysideList);
  const [localColor, setLocalColor] = useState();

  useEffect(() => {
    var buttonList = [];
    for (const [waysideName, waysideObj] of Object.entries(
      selectedWaysideList
    )) {
      buttonList.push(
        <Button
          variant='light'
          className='waysideButton'
          key={waysideName}
          onClick={() => {
            setSelectedWaysideAndName(waysideObj, parseInt(waysideName) + 1);
          }}
        >
          <div className='buttonDiv'>
            <BsCircleFill
              size='1.5em'
              color={
                localColor == 'RedLine' ? '#C44242' : 'rgba(49,135,133, 1)'
              }
            />
            <div className='buttonText'>WSC {parseInt(waysideName) + 1}</div>
          </div>
        </Button>
      );
    }
    setWaysideButtonList(buttonList);
  }, [selectedWaysideList]);

  function setSelectedWaysideAndName(obj, name) {
    setSelectedWayside(obj);
    setSelectedWaysideName('WSC' + name);
    // for (let i = 0; i < 150; i++) {
    //   let link = 'GreenLine/' + i + '/Occupancy';
    //   Firebase.database().ref(link).set(0);
    // }

    // for (let i = 0; i < 76; i++) {
    //   let link = 'RedLine/' + i + '/Occupancy';
    //   Firebase.database().ref(link).set(0);
    // }

    // for (let i = 0; i < 150; i++) {
    //   let link = 'GreenLine/' + i + '/Authority';
    //   Firebase.database().ref(link).set(0);
    // }

    // for (let i = 0; i < 76; i++) {
    //   let link = 'RedLine/' + i + '/Authority';
    //   Firebase.database().ref(link).set(0);
    // }
  }

  function setColorAndSelectedWayside(selColor) {
    setTrackColor(selColor);
    setLocalColor(selColor);
    setSelectedWaysideList(
      selColor == 'GreenLine' ? greenWaysideList : redWaysideList
    );
    setSelectedWayside(
      selColor == 'GreenLine' ? greenWaysideList[0] : redWaysideList[0]
    );
    setSelectedWaysideName('WSC' + 1);
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
        className='showWaysideControllersButton'
      >
        Show Wayside <br />
        Controllers
      </Button>

      <SlidingPane
        isOpen={open}
        from='left'
        width='225px'
        style={{ paddingTop: '10rem' }}
        onRequestClose={() => setOpen(false)}
      >
        <Button variant='light' className='greenLineButton'>
          <div className='buttonDiv'>
            <div
              className='buttonText'
              onClick={() => {
                setColorAndSelectedWayside('GreenLine');
              }}
            >
              Green Line
            </div>
          </div>
        </Button>

        <Button variant='light' className='redLineButton'>
          <div className='buttonDiv'>
            <div
              className='buttonText'
              onClick={() => {
                setColorAndSelectedWayside('RedLine');
              }}
            >
              Red Line
            </div>
          </div>
        </Button>
        <div style={{ overflow: 'scroll', height: '30em' }}>
          <div class='waysidePanelHolder'>{waysideButtonList}</div>
        </div>
      </SlidingPane>
    </div>
  );
};

export default WaysidePanel;
