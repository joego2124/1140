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
  const [jsonTree, setJsonTree] = useState([]);
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    DatabaseGet(setJsonTree, 'GreenLine');
  }, []);

  function getBlockListData() {
    let tempList = [];
    for (const [key, value] of Object.entries(jsonTree)) {
      tempList.push(value);
    }
    setBlockList(tempList);
  }

  useEffect(() => getBlockListData(), [jsonTree]);

  function getWaysideListData() {
    // console.log(waysideGrouping);
    // let tempGrouping = [];
    // for (const [key, value] of Object.entries(waysideGrouping)) {
    //   tempGrouping;
    // }
    let WSC1 = [56, 57, 58, 59, 60, 0];
    let WSC2 = [61, 62, 0, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
    let tempWaysideList = [WSC1, WSC2];

    let tempIndividualWaysideBlockList = [];
    let waysides = [];
    for (let i = 0; i < tempWaysideList.length; i++) {
      tempIndividualWaysideBlockList = [];
      for (let j = 0; j < tempWaysideList[i].length; j++) {
        tempIndividualWaysideBlockList.push(blockList[tempWaysideList[i][j]]);
      }
      // console.log(tempIndividualWaysideBlockList);
      waysides.push(tempIndividualWaysideBlockList);
    }
    setWaysideList(waysides);
    // console.log(waysides);
  }

  useEffect(() => getWaysideListData(), [blockList]);

  return (
    <div>
      <header className='App-header'>
        <TempWaysideView />
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
