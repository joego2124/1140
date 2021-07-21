import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Blocks from './assets/Blocks';
import './styles.css';

var trackLayout = require('./TrackLayout.json');

const trackBlockCircle = (blockType, centerElement, fill, stroke, blockId) => (
  <div>
    <div
      onClick={() => console.log(`clicked svg:`)}
      style={{
        position: 'absolute',
        zIndex: 1002,
        top: blockType === 'straight' ? '47.5%' : '5%',
        left: blockType === 'straight' ? '50%' : '9%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 550,
        color: stroke,
        // backgroundColor: "red"
      }}
    >
      {centerElement}
    </div>
    <svg
      width={75}
      height={75}
      viewBox={`0 0 ${100} ${100}`}
      stroke={stroke}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      style={{
        position: 'absolute',
        left: blockType === 'straight' ? '61%' : '29.5%',
        top: blockType === 'straight' ? '61%' : '29.5%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1001,
      }}
      onClick={() => console.log(`clicked svg:`)}
    >
      {Blocks['circle']}
    </svg>
  </div>
);

const gridBlocks = 50;
const gridSize = 120;
const maxLength = gridBlocks * gridSize;

const WaysideView = ({ selectedTrain, trainsList }) => {
  document.body.style.overflow = 'hidden';

  const [selectedBlock, setSelectedBlock] = useState(0);

  let trackBlockSVGs = [];
  let visitedBlockIds = [];
  let lineName;

  //recursive function to generate a list of tracks for rendering
  const traceTrack = (currBlock, currPos, trackLayoutList) => {
    let blockSVGs = [];

    //add current block to list of visited blocks
    visitedBlockIds.push(currBlock.blockId);

    //iterate through all connections
    currBlock.connectors.forEach((connnectorArr) => {
      let blockTypeName = ''; //var for determining svg to render

      //iterate recursively through all connectioned blocks
      connnectorArr.forEach((nextBlockId, i) => {
        if (nextBlockId != null) {
          //get nextBlock from nextBlockId
          const nextBlock = trackLayoutList.find(
            (block) => block.blockId === nextBlockId
          );

          //recursively follow connected block that isn't an visited block
          if (
            visitedBlockIds.find((visitedId) => visitedId === nextBlockId) ===
            undefined
          ) {
            let dx = 0,
              dy = 0; //appy offsets to nextBlock position
            switch (i) {
              case 0:
                dx = -gridSize;
                break;
              case 1:
                dy = -gridSize;
                break;
              case 2:
                dx = gridSize;
                break;
              case 3:
                dy = gridSize;
                break;
              default:
                break;
            }
            const nextPos = { x: currPos.x + dx, y: currPos.y + dy };
            traceTrack(nextBlock, nextPos, trackLayoutList);
          }
        }
        blockTypeName += nextBlockId === null ? '0' : '1'; //inc blockTypeName
      });

      //apply offsets for svgs
      let dx = 0,
        dy = 0;
      switch (blockTypeName) {
        case '0011':
          dx = 45;
          dy = 45;
          break;
        case '1001':
          dy = 45;
          break;
        case '0110':
          dx = 45;
          break;
      }

      //conditional vars
      let blockType =
        blockTypeName === '0101' || blockTypeName === '1010'
          ? 'straight'
          : 'curved';
      let size = blockType === 'straight' ? 100 : 55;
      let color = `rgb(${
        lineName === 'greenLine' ? '49,135,133' : '196,73,76'
      }, ${blockSVGs.length > 0 ? 0.25 : 1})`;

      Object.entries(trainsList).forEach((trainArr) => {
        let targBlockId = Math.floor(trainArr[1].CurrentBlock);
        let compBlockId = Math.floor(currBlock.blockId);
        if (targBlockId == compBlockId) {
          console.log(trainArr[0], trainArr[1]);
          color = `rgb(101, 93, 110, ${blockSVGs.length > 0 ? 0.25 : 1})`;
        }
      });

      //create new svg and push to trackBlockSVGs
      let newSVG = (
        <div
          key={currBlock.blockId}
          style={{
            position: 'absolute',
            left: currPos.x + dx + 10,
            top: currPos.y + dy + 10,
            height: size,
            width: size,
            // backgroundColor: "rgba(0, 255, 255, .25)",
            overflow: 'visible',
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            stroke={blockType === 'straight' ? color : 'none'}
            fill={blockType === 'curved' ? color : 'none'}
            xmlns='http://www.w3.org/2000/svg'
            style={{
              position: 'absolute',
              left: blockTypeName === '0101' ? '95%' : '50%',
              top: blockTypeName === '1010' ? '95%' : '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
            onClick={() => console.log(`clicked svg: ${currBlock.blockId}`)}
          >
            {Blocks[blockTypeName]}
          </svg>
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{currBlock.station}</Tooltip>}
          >
            {currBlock.station != undefined ? (
              trackBlockCircle(blockType, 'S', 'white', color)
            ) : (
              <></>
            )}
          </OverlayTrigger>
        </div>
      );
      blockSVGs.push(newSVG);
    });

    let newBlockSVGs = (
      <div>
        <div
          style={{
            position: 'absolute',
            left: currPos.x + 5,
            top: currPos.y,
            margin: 0,
            fontSize: '.35em',
            zIndex: 1000,
          }}
        >{`${currBlock.section}${currBlock.blockId}`}</div>
        {blockSVGs}
      </div>
    );

    trackBlockSVGs.push(newBlockSVGs);
  };

  for (const [key, value] of Object.entries(trackLayout)) {
    lineName = key;
    visitedBlockIds = [];
    traceTrack(
      value[0],
      { x: (gridBlocks / 2) * gridSize, y: (gridBlocks / 2) * gridSize },
      value
    );
  }

  return (
    <div style={styles.track}>
      <TransformWrapper
        limitToBounds={false}
        minScale={0.01}
        initialPositionX={-maxLength / 4.5}
        initialPositionY={-maxLength / 2.7}
        initialScale={0.85}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent>
          <div style={{ width: `${maxLength}px`, height: `${maxLength}px` }}>
            <div>{trackBlockSVGs}</div>
            <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <pattern
                  id='smallGrid'
                  width={`${gridSize / 10}`}
                  height={`${gridSize / 10}`}
                  patternUnits='userSpaceOnUse'
                >
                  <path
                    d={`M ${gridSize / 10} 0 L 0 0 0 ${gridSize / 10}`}
                    fill='none'
                    stroke='gray'
                    strokeWidth='0.25'
                  />
                </pattern>
                <pattern
                  id='grid'
                  width={`${gridSize}`}
                  height={`${gridSize}`}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    width={`${gridSize}`}
                    height={`${gridSize}`}
                    fill='url(#smallGrid)'
                  />
                  <path
                    d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                    fill='none'
                    stroke='gray'
                    strokeWidth='.5'
                  />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#grid)' />
            </svg>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

const styles = {
  track: {
    width: '100%',
    height: '100%',
  },
};

export default WaysideView;
