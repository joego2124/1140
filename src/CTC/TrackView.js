import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { default as blockSVG } from'./assets/block.svg';

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
}
const svgs = importAll(require.context ('./assets/blocks', true, /\.svg/));

var trackLayout = require("./TrackLayout.json");

const maxLength = 4000;
const gridSize = 100;

const TrackView = () => {

	document.body.style.overflow='hidden';

	var trackBlockSVGs = [];
	var visitedBlockIds = [];

	const traceTrack = (currBlock, currPos) => {

		//add current block to list of visited blocks
		visitedBlockIds.push(currBlock.blockId);

		var blockTypeName = ""; //var for determining svg to render
		
		//iterate through all connected blocks
		currBlock.connectors.forEach((nextBlockId, i) => {
			if (nextBlockId != null) {

				//get nextBlock from nextBlockId
				const nextBlock = trackLayout.blocks.find(block => block.blockId === nextBlockId); 
	
				 //recursively follow connected block that isn't an visited block
				if (!visitedBlockIds.find(id => id === nextBlock.blockId)) {
					var dx = 0, dy = 0;
					switch(i) {
						case 0: dx = -50; break;
						case 1: dy = -50; break;
						case 2: dx = 50; break;
						case 3: dy = 50; break;
						default: break;
					}
					const nextPos = { x: currPos.x + dx, y: currPos.y + dy };
					console.log(currBlock.blockId, nextBlock.blockId);
					traceTrack(nextBlock, nextPos);
				}
			}
			blockTypeName += (nextBlockId === null ? "0" : "1"); //inc blockTypeName
		});

		//create new svg and push to trackBlockSVGs
		console.log(blockTypeName, currPos, currBlock.blockId);
		const newSVG = <img 
			src={svgs[`${blockTypeName}.svg`].default} 
			style={{
				position: "absolute", 
				left: currPos.x,
				top: currPos.y, 
				// height: "100px",
				// width: "100px",
			}}
		/>;
		trackBlockSVGs.push(newSVG);
	}

	traceTrack(trackLayout.blocks[0], {x: 0, y: 0});

	return (
		<div style={styles.track}>
			<TransformWrapper 
				limitToBounds={false} 
				minScale={.01} 
				initialPositionX={-maxLength / 4}
				initialPositionY={-maxLength / 4}
				initialScale={2}
				panning = {{velocityDisabled: true}} 
			>
				<TransformComponent>
				<div style={{width: `${maxLength}px`, height: `${maxLength}px`}}>
					<div>
						{trackBlockSVGs}
					</div>
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="smallGrid" width={`${gridSize / 10}`} height={`${gridSize / 10}`} patternUnits="userSpaceOnUse">
								<path d={`M ${gridSize / 10} 0 L 0 0 0 ${gridSize / 10}`} fill="none" stroke="gray" strokeWidth="0.25"/>
							</pattern>
							<pattern id="grid" width={`${gridSize}`} height={`${gridSize}`} patternUnits="userSpaceOnUse">
								<rect width={`${gridSize}`} height={`${gridSize}`} fill="url(#smallGrid)"/>
								<path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="gray" strokeWidth=".5"/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" />
					</svg>
				</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	)
}

const styles = {
	track: {
		width: "100%",
		height: "100%",
	}
}

export default TrackView