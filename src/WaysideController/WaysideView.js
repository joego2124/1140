import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { default as blockSVG } from './assets/block.svg';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const svgs = importAll(require.context('./assets/blocks', true, /\.svg/));

var trackLayout = require('./TrackLayout.json');

const maxLength = 4000;
const gridSize = 100;

const TrackView = () => {
  document.body.style.overflow = 'hidden';

  var trackBlockSVGs = [];
  var visitedBlockIds = [];

  //recursive function to generate a list of tracks for rendering
  const traceTrack = (currBlock, currPos) => {
    //add current block to list of visited blocks
    visitedBlockIds.push(currBlock.blockId);

    var blockTypeName = ''; //var for determining svg to render

    //iterate through all connected blocks
    currBlock.connectors.forEach((nextBlockId, i) => {
      if (nextBlockId != null) {
        //get nextBlock from nextBlockId
        const nextBlock = trackLayout.blocks.find(
          (block) => block.blockId === nextBlockId
        );

        //recursively follow connected block that isn't an visited block
        if (
          visitedBlockIds.find((visitedId) => visitedId === nextBlockId) ===
          undefined
        ) {
          var dx = 0,
            dy = 0; //appy offsets to nextBlock position
          switch (i) {
            case 0:
              dx = -100;
              break;
            case 1:
              dy = -100;
              break;
            case 2:
              dx = 100;
              break;
            case 3:
              dy = 100;
              break;
            default:
              break;
          }
          const nextPos = { x: currPos.x + dx, y: currPos.y + dy };
          traceTrack(nextBlock, nextPos);
        }
      }
      blockTypeName += nextBlockId === null ? '0' : '1'; //inc blockTypeName
    });

    //apply offsets for svgs
    var dx = 0,
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

    var size = blockTypeName == '0101' || blockTypeName == '1010' ? 100 : 55;

    //create new svg and push to trackBlockSVGs
    const newSVG = (
      <img
        key={currBlock.blockId}
        src={svgs[`${blockTypeName}.svg`].default}
        style={{
          position: 'absolute',
          left: currPos.x + dx,
          top: currPos.y + dy,
          height: size,
          width: size,
        }}
      />
    );
    trackBlockSVGs.push(newSVG);
  };

  traceTrack(trackLayout.blocks[0], {
    x: maxLength / 4,
    y: maxLength / 4 - 400,
  });

  return (
    <div style={styles.track}>
      <TransformWrapper
        limitToBounds={false}
        minScale={0.01}
        initialPositionX={-maxLength / 4}
        initialPositionY={-maxLength / 4}
        initialScale={2}
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
