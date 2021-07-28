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
  const [trackColor, setTrackColor] = useState();

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
    console.log(waysideGrouping);

    let tempIndividualWaysideBlockList = [];
    let waysides = [];
    console.log(blockList);
    for (const [index, lineData] of Object.entries(waysideGrouping.GreenLine)) {
      tempIndividualWaysideBlockList = [];
      lineData.blocks.forEach((blockId) => {
        tempIndividualWaysideBlockList.push(blockList[blockId]);
      });
      console.log(tempIndividualWaysideBlockList);
      waysides.push(tempIndividualWaysideBlockList);
    }
    console.log(waysides);
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
