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
        <Button variant='light' className='waysideButton' key={waysideName}>
          <div className='buttonDiv'>
            <BsCircleFill
              size='1.5em'
              color={
                localColor == 'RedLine' ? '#C44242' : 'rgba(49,135,133, 1)'
              }
            />
            <div
              className='buttonText'
              onClick={() => {
                setSelectedWayside(waysideObj);
              }}
            >
              WSC{`${waysideName}`}
            </div>
          </div>
        </Button>
      );
    }
    setWaysideButtonList(buttonList);
  }, [selectedWaysideList]);

  function setColorAndSelectedWayside(selColor) {
    setTrackColor(selColor);
    setLocalColor(selColor);
    setSelectedWaysideList(
      selColor == 'GreenLine' ? greenWaysideList : redWaysideList
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
        <div class='waysidePanelHolder'>{waysideButtonList}</div>
      </SlidingPane>
    </div>
  );
};

export default WaysidePanel;
