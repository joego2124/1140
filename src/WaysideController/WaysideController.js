import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import Firebase from 'firebase';
import config from '../config';
import WaysidePanel from './WaysidePanel';
import BottomPanel from './BottomPanel';
import TempWaysideView from './TempWaysideView';
import TrackView from '../WaysideController/TrackView';

import { DatabaseGet, DatabaseSet } from '../Database';
var waysideGrouping = require('./WaysideControllers.json');

const WaysideController = () => {
  document.body.style.overflow = 'hidden';

  const [selectedWayside, setSelectedWayside] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [waysideList, setWaysideList] = useState([]);
  const [jsonTree, setJsonTree] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [trainsList, setTrainsList] = useState({});

  useEffect(() => {
    DatabaseGet(setJsonTree, 'GreenLine');
  }, []);

  //update trains list
  useEffect(() => {
    DatabaseGet(setTrainsList, 'TrainList');
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
      waysides.push(tempIndividualWaysideBlockList);
    }
    setWaysideList(waysides);
  }

  useEffect(() => getWaysideListData(), [blockList]);

  return (
    <div>
      <header className='App-header'>
        <WaysidePanel
          setSelectedWayside={setSelectedWayside}
          waysideList={waysideList}
        />
        {selectedWayside.length > 0 ? (
          <TrackView
            setSelectedBlock={setSelectedBlock}
            selectedWayside={selectedWayside}
            trainsList={trainsList}
          />
        ) : (
          <div></div>
        )}
        {selectedWayside.length > 0 ? (
          <BottomPanel
            selectedBlockFromTrack={selectedBlock}
            selectedWayside={selectedWayside}
          />
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
};

export default WaysideController;
