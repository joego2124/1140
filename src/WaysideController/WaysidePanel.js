import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from 'react-sliding-pane';
import Firebase from 'firebase';
import { Button } from 'react-bootstrap';
import { BsCircleFill } from 'react-icons/bs';

import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';
import waysideControllers from './WaysideControllers.json';

const WaysidePanel = () => {
  const [open, setOpen] = useState(true);
  const [blockList, setBlockList] = useState([]);
  const [waysideList, setWaysideList] = useState([]);

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

  // function setWaysideListData(newState) {
  // 	Firebase.database().ref('/trackController/Waysidelist').set(newState);
  // }

  useEffect(() => getBlockListData(), []);

  function getWaysideList() {
    let WSC1 = [56, 57, 57, 59, 60, 0];

    let WSC2 = [61, 62, 0, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
    let tempWaysideList = [];
    for (let i = 0; i < WSC1.length; i++) {
      tempWaysideList.push(blockList[WSC1[i]]);
      console.log(tempWaysideList);
    }
    console.log(tempWaysideList);
    setWaysideList(tempWaysideList);
    console.log(waysideList);
  }

  function ShowWaysideList() {
    getWaysideList();
    console.log(waysideList);
    console.log(waysideList[0]);
    const listItems = 0;
    for (let i = 0; i < 2; i++) {
      listItems += (
        <Button variant='light' className='waysideButton' value={waysideList}>
          <div className='buttonDiv'>
            <BsCircleFill size='1.5em' color='#C44242' />
            <div className='buttonText'>{waysideList[0].BlockNumber}</div>
          </div>
        </Button>
      );
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
