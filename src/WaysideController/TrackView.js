import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Blocks from '../CTC/assets/Blocks';
import '../CTC/styles.css';

var trackLayout = require('../CTC/TrackLayout.json');

const trackBlockCircle = (
  blockType,
  centerElement,
  fill,
  stroke,
  clickHandler
) => (
  <div>
    <div
      onClick={clickHandler}
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
      onClick={clickHandler}
    >
      {Blocks['circle']}
    </svg>
  </div>
);

const gridBlocks = 50;
const gridSize = 120;
const maxLength = gridBlocks * gridSize;

const TrackView = ({ selectedWayside, setSelectedBlock }) => {
  document.body.style.overflow = 'hidden';

  //   const [selectedBlock, setSelectedBlock] = useState(0);
  console.log(selectedWayside);

  let trackBlockSVGs = [];
  let visitedBlockIds = [];
  let lineName = 'greenLine';

  //recursive function to generate a list of tracks for rendering
  const traceTrack = (currBlock, currPos, trackLayoutList) => {
    let blockSVGs = [];
    //add current block to list of visited blocks
    visitedBlockIds.push(currBlock.blockId);

    //iterate through all connections
    currBlock.connectors.forEach((connnectorArr, i) => {
      let blockTypeName = ''; //var for determining svg to render

      //check if switch block
      //   let switchBlock = false;
      //   if (currBlock.connectors.length > 1) {
      //     switchBlock = true;
      //   }

      //   if (switchBlock == true) {
      //     let switchB = selectedWayside.find(
      //       (v) => v.BlockNumber == currBlock.blockId
      //     );
      //     if (switchB?.SwitchState == 0 && currBlock.blockId == 62) {
      //       connnectorArr = [null, 61, -1, null];
      //     } else if (switchB?.SwitchState == 1 && currBlock.blockId == 62) {
      //       connnectorArr = [null, null, -1, 63];
      //     } else if (switchB?.SwitchState == 0 && currBlock.blockId == 58) {
      //       connnectorArr = [57, -1, null, null];
      //     } else if (switchB?.SwitchState == 1 && currBlock.blockId == 58) {
      //       connnectorArr = [58, null, null, 59];
      //     }
      //   } else {
      //     connnectorArr = connnectorArr;
      //   }

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
            if (
              selectedWayside?.find((v) => v.BlockNumber == nextBlockId) !=
              undefined
            ) {
              traceTrack(nextBlock, nextPos, trackLayoutList);
            }
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
      }, ${
        currBlock.connectors.length > 1
          ? i !=
            selectedWayside.find((v) => v.BlockNumber == currBlock.blockId)
              .SwitchState
            ? 0.25
            : 1
          : 1
      })`;

      //   Object.entries(mappedBlocks).forEach((trainArr) => {
      //     let targBlockId = Math.floor(trainArr[1].CurrentBlock);
      //     let compBlockId = Math.floor(currBlock.blockId);
      //     if (targBlockId == compBlockId) {
      //       console.log(trainArr[0], trainArr[1]);
      //       color = `rgb(101, 93, 110, ${blockSVGs.length > 0 ? 0.25 : 1})`;
      //     }
      //   });

      const clickHandler = () => {
        console.log(`svg clicked: ${currBlock.blockId}`);

        if (selectedWayside != undefined) {
          let selBlock = selectedWayside?.find(
            (v) => v.BlockNumber == currBlock.blockId
          );
          console.log(selBlock);
          setSelectedBlock(
            selectedWayside?.find((v) => v.BlockNumber == currBlock.blockId)
          );
        } else {
          setSelectedBlock(selectedWayside[0]);
        }
      };

      //create new svg and push to trackBlockSVGs
      let newSVG = (
        <div
          key={blockSVGs.length}
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
            onClick={clickHandler}
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
      <div key={currBlock.blockId}>
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

  let mappedBlocks = 0;
  if (selectedWayside?.length > 0) {
    mappedBlocks = selectedWayside?.map((block) => {
      let mappedBlock = trackLayout.greenLine.find(
        (v) => v.blockId == block.BlockNumber
      );
      return mappedBlock;
    });
  }

  if (selectedWayside?.length > 0) {
    traceTrack(
      mappedBlocks[0],
      { x: (gridBlocks / 2) * gridSize, y: (gridBlocks / 2) * gridSize },
      mappedBlocks
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

export default TrackView;
