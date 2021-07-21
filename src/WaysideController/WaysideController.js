import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import Firebase from 'firebase';
import config from '../config';
import WaysidePanel from './WaysidePanel';
import BottomPanel from './BottomPanel';
import TempWaysideView from './TempWaysideView';

import { DatabaseGet, DatabaseSet } from '../Database';
var waysideGrouping = require('./WaysideControllers.json');

const WaysideController = () => {
  document.body.style.overflow = 'hidden';

  const [selectedWayside, setSelectedWayside] = useState([]);
  const [waysideList, setWaysideList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  // useEffect(() => {
  //   DatabaseGet(setWaysideList, 'GreenLine');
  // }, []);

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
    });

    // let tempList = [];
    // for (const [key, value] of Object.entries(waysideList)) {
    //   for (const [i, v] of Object.entries(value)) {
    //     tempList.push(v);
    //   }
    // }
    setBlockList(tempList);
  }

  useEffect(() => getBlockListData(), []);

  function getWaysideListData() {
    getBlockListData();
    console.log(waysideGrouping);
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
    console.log(waysides);
  }

  useEffect(() => getWaysideListData(), []);

  return (
    <div>
      <header className='App-header'>
        <TempWaysideView />
        <p>{selectedWayside[0]?.BlockNumber}</p>
        <WaysidePanel
          setSelectedWayside={setSelectedWayside}
          waysideList={waysideList}
        />
        <BottomPanel selectedWayside={selectedWayside} />
      </header>
    </div>
  );
};

export default WaysideController;
