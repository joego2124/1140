import React, {useEffect} from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from 'react-bootstrap';

const testSVG = <path fill-rule="evenodd" clip-rule="evenodd" d="M40 -6.55671e-07L55 0L55 4.01347L55 10L40 10L35 10L30 10C18.9543 10 10 18.9543 10 30L10 34L10 40L9.99999 55L4.01346 55L-6.21882e-06 55L-1.74846e-06 40L-1.31134e-06 30C-5.87108e-07 13.4315 13.4315 -1.81702e-06 30 -1.09278e-06L40 -6.55671e-07Z" fill="black"/>

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
}
const svgs = importAll(require.context ('./assets/blocks', true, /\.svg/));

var trackLayout = require("./TrackLayout.json");

const gridBlocks = 50;
const gridSize = 120;
const maxLength = gridBlocks * gridSize;

const TrackView = () => {

	document.body.style.overflow='hidden';

	let trackBlockSVGs = [];
	let visitedBlockIds = [];

	//recursive function to generate a list of tracks for rendering
	const traceTrack = (currBlock, currPos) => {
		//add current block to list of visited blocks
		visitedBlockIds.push(currBlock.blockId);

		let blockTypeName = ""; //var for determining svg to render
		
		//iterate through all connected blocks
		currBlock.connectors.forEach((nextBlockId, i) => {
			if (nextBlockId != null) {

				//get nextBlock from nextBlockId
				const nextBlock = trackLayout.blocks.find(block => block.blockId === nextBlockId); 
	
				//recursively follow connected block that isn't an visited block
				if (visitedBlockIds.find(visitedId => visitedId === nextBlockId) === undefined) {
					let dx = 0, dy = 0; //appy offsets to nextBlock position
					switch(i) {
						case 0: dx = -gridSize; break;
						case 1: dy = -gridSize; break;
						case 2: dx = gridSize; break;
						case 3: dy = gridSize; break;
						default: break;
					}
					const nextPos = { x: currPos.x + dx, y: currPos.y + dy };
					traceTrack(nextBlock, nextPos);
				}
			}
			blockTypeName += (nextBlockId === null ? "0" : "1"); //inc blockTypeName
		});

		//apply offsets for svgs
		let dx = 0, dy = 0; 
		switch(blockTypeName) {
			case "0011": dx = 45; dy = 45; break;
			case "1001": dy = 45; break;
			case "0110": dx = 45; break;
		}

		let size = (blockTypeName == "0101" || blockTypeName == "1010") ? 100 : 55;
		
		//create new svg and push to trackBlockSVGs
		const newSVG = <div 
			key={currBlock.blockId}
			src={svgs[`${blockTypeName}.svg`].default} 
			style={{
				position: "absolute", 
				left: currPos.x + dx + 10,
				top: currPos.y + dy + 10, 
				height: size,
				width: size,
				backgroundColor: "rgba(0, 255, 255, .5)",
			}}
		>
			{/* <img 
				src={svgs[`${blockTypeName}.svg`].default}
				style={{
					position: "absolute",
					left: 0, 
					top: 0,
					height: size,
					width: size,
				}}
			></img> */}
			<svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: "inherit", height: "inherit", position: "absolute", top: 0, left: 0}} onClick={() => console.log("clicked svg")}>
				{testSVG}
			</svg>
		</div>
		trackBlockSVGs.push(newSVG);
	}

	traceTrack(trackLayout.blocks[0], {x: gridBlocks / 2 * gridSize, y: gridBlocks / 2 * gridSize});
	// traceTrack(trackLayout.blocks[0], {x: 0, y: 0});

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