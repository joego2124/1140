import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';
import { BsCircleFill } from 'react-icons/bs';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';
import waysideControllers from './WaysideControllers.json';

const WaysidePanel = ({ setterForSelectedWayside }) => {
  const [open, setOpen] = useState(true);
  const [blockList, setBlockList] = useState([]);
  const [waysideList, setWaysideList] = useState([]);
  const [selectedWayside, setSelectedWayside] = useState([]);

  Firebase.app();

  //when updates happen this is called and then it calls appropriate functions to update the page element
  // const handleUpdate = useCallback(
  // 	async event => {
  // 		event.preventDefault();
  // 		const { waysideList } = event.target.elements;
  // 		console.log(waysideList.value);
  // 		setWaysideListData(waysideList.value);
  // 	}, []
  // );

  function getBlockListData() {
    let tempList = [];
    let ref = Firebase.database().ref('/GreenLine');
    ref.on('value', (snapshot) => {
      for (const [key, value] of Object.entries(snapshot.val())) {
        for (const [i, v] of Object.entries(value)) {
          tempList.push(v);
        }
      }
      setBlockList(tempList);
      console.log(tempList);
    });
  }

  // const getWaysideList = waysideControllers.map((list) => {
  //   return console.log(list);
  // });

  const SetSelectedWaysideData = (newState) => {
    setSelectedWayside(newState);
    console.log(newState);
    setterForSelectedWayside(newState);
    // Firebase.database().ref('/WSC/SelectedWayside/').set(newState);
  };

  useEffect(() => getBlockListData(), []);

  function getWaysideListData() {
    let WSC1 = [56, 57, 57, 59, 60, 0];
    let WSC2 = [61, 62, 0, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
    let tempWaysideList = [WSC1, WSC2];

    let tempIndividualWaysideBlockList = [];
    let waysides = [];
    for (let i = 0; i < tempWaysideList.length; i++) {
      tempIndividualWaysideBlockList = [];
      for (let j = 0; j < tempWaysideList[i].length; j++) {
        tempIndividualWaysideBlockList.push(blockList[tempWaysideList[i][j]]);
      }
      console.log(tempIndividualWaysideBlockList);
      waysides.push(tempIndividualWaysideBlockList);
    }
    setWaysideList(waysides);
  }

  useEffect(() => getWaysideListData(), []);

  function ShowWaysideList() {
    console.log(waysideList);
    console.log(waysideList[0]);
    let listItems = 0;
    for (let i = 0; i < waysideList.length; i++) {
      console.log(i);
      listItems = waysideList.map((waysideIndex, i) => (
        <Button
          variant='light'
          className='waysideButton'
          onClick={SetSelectedWaysideData(waysideIndex)}
          value={waysideIndex}
        >
          <div className='buttonDiv'>
            <BsCircleFill size='1.5em' color='#C44242' />
            <div className='buttonText'>WSC{i + 1}</div>
          </div>
        </Button>
      ));
    }
    return <div className='waysidePanelHolder'>{listItems}</div>;
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
        <ShowWaysideList />
      </SlidingPane>
    </div>
  );
};

export default WaysidePanel;
