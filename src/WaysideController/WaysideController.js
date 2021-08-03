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
  const [greenWaysideList, setGreenWaysideList] = useState([]);
  const [redWaysideList, setRedWaysideList] = useState([]);
  const [greenJsonTree, setGreenJsonTree] = useState([]);
  const [redJsonTree, setRedJsonTree] = useState([]);
  const [greenBlockList, setGreenBlockList] = useState([]);
  const [redBlockList, setRedBlockList] = useState([]);
  const [trainsList, setTrainsList] = useState({});
  const [trackColor, setTrackColor] = useState('GreenLine');
  const [selectedWaysideName, setSelectedWaysideName] = useState();

  // TODO: CHANGE ALL ON CLICKS TO INCLUDE ARROW FUNCTION

  // get json tree and find block list and wayside list for green line
  function getGreenJsonTreeData() {
    let link = 'GreenLine';
    let ref = Firebase.database().ref(link);
    ref.on('value', (snapshot) => {
      let newState = snapshot.val();
      setGreenJsonTree(newState);
    });
  }

  useEffect(() => getGreenJsonTreeData(), []);

  function getGreenBlockListData() {
    let greenList = [];
    console.log(greenJsonTree);
    for (const [key, value] of Object.entries(greenJsonTree)) {
      greenList.push(value);
    }
    setGreenBlockList(greenList);
  }

  useEffect(() => getGreenBlockListData(), [greenJsonTree]);

  function getGreenWaysideListData() {
    let tempIndividualWaysideBlockList = [];
    let greenWaysides = [];
    for (const [index, lineData] of Object.entries(waysideGrouping.GreenLine)) {
      tempIndividualWaysideBlockList = [];
      lineData.blocks.forEach((blockId) => {
        tempIndividualWaysideBlockList.push(greenBlockList[blockId]);
      });
      greenWaysides.push(tempIndividualWaysideBlockList);
    }
    setGreenWaysideList(greenWaysides);
  }

  useEffect(() => getGreenWaysideListData(), [greenBlockList]);

  // get json tree and find block list and wayside list for red line
  function getRedJsonTreeData() {
    let link = 'RedLine';
    let ref = Firebase.database().ref(link);
    ref.on('value', (snapshot) => {
      let newState = snapshot.val();
      setRedJsonTree(newState);
    });
  }

  useEffect(() => getRedJsonTreeData(), []);

  function getRedBlockListData() {
    let redList = [];
    for (const [key, value] of Object.entries(redJsonTree)) {
      redList.push(value);
    }
    setRedBlockList(redList);
  }

  useEffect(() => getRedBlockListData(), [redJsonTree]);

  function getRedWaysideListData() {
    let tempIndividualWaysideBlockList = [];
    let redWaysides = [];
    for (const [index, lineData] of Object.entries(waysideGrouping.RedLine)) {
      tempIndividualWaysideBlockList = [];
      lineData.blocks.forEach((blockId) => {
        tempIndividualWaysideBlockList.push(redBlockList[blockId]);
      });
      redWaysides.push(tempIndividualWaysideBlockList);
    }
    setRedWaysideList(redWaysides);
  }

  useEffect(() => getRedWaysideListData(), [redBlockList]);

  //update trains list
  useEffect(() => {
    DatabaseGet(setTrainsList, 'TrainList');
  }, []);

  function getTrainListData() {
    let link = 'GreenLine';
    let ref = Firebase.database().ref(link);
    ref.on('value', (snapshot) => {
      let newState = snapshot.val();
      setGreenJsonTree(newState);
    });
  }

  useEffect(() => getTrainListData(), []);

  return (
    <div>
      <header className='App-header'>
        <WaysidePanel
          setTrackColor={setTrackColor}
          setSelectedWayside={setSelectedWayside}
          greenWaysideList={greenWaysideList}
          redWaysideList={redWaysideList}
          setSelectedWaysideName={setSelectedWaysideName}
        />
        {selectedWayside.length > 0 ? (
          <TrackView
            trackColor={trackColor}
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
            selectedWaysideName={selectedWaysideName}
          />
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
};

export default WaysideController;
