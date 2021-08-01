import React, { useState, useEffect, useCallback } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from 'react-bootstrap';
import { BiTrain } from 'react-icons/bi';
import { IoGitCompareSharp } from 'react-icons/io5';
import { BsFillSquareFill } from "react-icons/bs";
import Blocks from './assets/Blocks';
import './styles.css';

var trackLayout = require("./TrackLayout.json");

const trackBlockCircle = (centerElement, fill, stroke, clickHandler, currPos) => <div
	style={{
		position: "absolute",
		zIndex: 1003,  
		left: currPos.x + 60,
		top: currPos.y + 60, 
		transform: "translate(-50%, -50%)",
		height: 100,
		width: 100,
		backgroundColor: "rgba(255, 255, 0, 0)",
		overflow: "visible",
	}}
>
	<div 
		onClick={clickHandler}
		style={{ 
			position: "absolute", 
			zIndex: 1004, 
			top: "50%", 
			left: "50%", 
			transform: "translate(-50%, -50%)",
			fontWeight: 550,
			height: 50,
			width: 50,
			color: stroke,
			backgroundColor: "rgba(255, 125, 125, 0)",
	}}>{centerElement}</div>
	<svg 
		width={75}
		height={75}
		viewBox={`-15 -15 100 100`}
		stroke={stroke}
		fill={fill}
		xmlns="http://www.w3.org/2000/svg" 
		style={{
			position: "absolute",
			top: "50%", 
			left: "50%", 
			transform: "translate(-50%, -50%)",
			zIndex: 1001,
			backgroundColor: "rgba(255, 0, 255, 0)",
		}} 
		onClick={clickHandler}
	>
		{Blocks["circle"]}
	</svg>
</div>

const gridBlocks = 500;
const gridSize = 120;
const maxLength = gridBlocks * gridSize;

const TrackView = ({selectedTrain, trainsList, setSelectedBlock, blockLists}) => {

	document.body.style.overflow='hidden';

	const [lineFilter, setLineFilter] = useState("both");
	const [filteredLineSVGs, setFilteredLineSVGs] = useState([]);
	const [trainSVGs, setTrainSVGs] = useState([]);

	const updateSelectedBlock = useCallback((blockId, color) => {
		// let blockDatabaseIndex;
		// console.log(blockId, color, blockLists[color]);
		// if (blockLists[color] == undefined) {
		// 	console.log(lineFilter);
		// }
		// let selectedBlock = blockLists[color]?.find((block, index) => {
		// 	if (index != "databasePath") {
		// 		let roundedBlockId = block.BlockNumber < 0 ? Math.ceil(block.BlockNumber) : Math.floor(block.BlockNumber);
		// 		if (roundedBlockId === blockId) {
		// 			blockDatabaseIndex = index;
		// 			return true;
		// 		}
		// 	}
		// });
		// if (selectedBlock != undefined) {
		// 	selectedBlock.databasePath = `${blockLists[color].databasePath}/${blockDatabaseIndex}`;
		// 	setSelectedBlock(selectedBlock);
		// }
		console.log(blockLists);
	}, [blockLists]);

	let greenBlockSVGs = [];
	let redBlockSVGs = [];
	let visitedBlockIds = [];
	let lineName;

	useEffect(() => {
		setTrainSVGs(Object.entries(trainsList).map(trainArr => {
			let train = trainArr[1];
			if (trainArr[0] != "databasePath") {
				return trackBlockCircle(
					<BiTrain 
						key={train.TrainId}
						style={{
							position: "absolute",
							top: "50%", 
							left: "50%",
							width: 35,
							height: 35, 
							transform: "translate(-50%, -50%)",
						}}
					/>,
					"white",
					"rgb(101, 93, 110, 1)",
					() => {},
					trackLayout[train.Line === "GreenLine" ? "greenLine" : "redLine"].find(block => block.blockId === train.CurrentBlock).position
				);
			}
		}));
	}, [trainsList]);

	function updateFilter(e) {
		setLineFilter(e);
		let filteredSVGs = [];
		if (e === "green" || e === "both") {
			greenBlockSVGs.forEach(svg => filteredSVGs.push(svg));
		}
		if (e === "red" || e === "both") {
			redBlockSVGs.forEach(svg => filteredSVGs.push(svg));
		}
		setFilteredLineSVGs(filteredSVGs);
	}

	//recursive function to generate a list of tracks for rendering
	const traceTrack = (currBlock, currPos, trackLayoutList) => {
		
		let blockSVGs = [];
		
		currBlock.position = currPos;

		//add current block to list of visited blocks
		visitedBlockIds.push(currBlock.blockId);

		//iterate through all connections
		currBlock.connectors.forEach(connnectorArr => {

			let blockTypeName = ""; //var for determining svg to render

			//iterate recursively through all connectioned blocks
			connnectorArr.forEach((nextBlockId, i) => {
				if (nextBlockId != null) {
	
					//get nextBlock from nextBlockId
					const nextBlock = trackLayoutList.find(block => block.blockId === nextBlockId); 
		
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
						traceTrack(nextBlock, nextPos, trackLayoutList);
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
			
			//conditional vars
			let blockType = (blockTypeName === "0101" || blockTypeName === "1010") ? "straight" : "curved";
			let size = blockType === "straight" ? 100 : 55;
			let color = `rgb(${lineName === "greenLine" ? "49,135,133" : "196,73,76"}, ${blockSVGs.length > 0 ? .25 : 1})`;
			let lineColor = lineName === "greenLine" ? "green" : "red";

			color = currBlock.section === "YARD" ? "grey" : color; //yard blocks are grey

			//show occupancy based on blocks
			let currBlockId = currBlock.blockId > 0 ? Math.floor(currBlock.blockId) : Math.ceil(currBlock.blockId);
			let block = blockLists[lineColor][currBlockId];
			if (currBlock.blockId == 15 && lineColor == "red") {
				console.log(block?.Occupancy);
			}
			if (block?.Occupancy == 1) {
				console.log(currBlockId);
				color = `rgb(101, 93, 110, ${blockSVGs.length > 0 ? .25 : 1})`;
			}

			//create new svg and push to track block SVGs
			let newSVG = <div 
				key={blockSVGs.length}
				style={{
					position: "absolute", 
					left: currPos.x + dx + 10,
					top: currPos.y + dy + 10, 
					height: size,
					width: size,
					backgroundColor: "rgba(0, 255, 255, 0)",
					overflow: "visible",
				}}
			>
				<svg 
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					stroke={blockType === "straight" ? color : "none"} 
					fill={blockType === "curved" ? color : "none"}
					xmlns="http://www.w3.org/2000/svg" 
					style={{
						position: "absolute",
						left: blockTypeName === "0101" ? "95%" : "50%",
						top: blockTypeName === "1010" ? "95%" : "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 1000,
					}} 
					onClick={() => {
						updateSelectedBlock(currBlock.blockId, lineColor)
					}}
				>
					{Blocks[blockTypeName]}
				</svg>
			</div>
			blockSVGs.push(newSVG);
		});

		let beacons = [];
		if (currBlock.station != undefined) {
			currBlock.connectors[0].forEach((id, i) => {
				if (id === null) return;
				let dx = 0, dy = 0;
				let dist = 41;
				switch(i) {
					case 0: dx = -dist; break;
					case 1: dy = -dist; break;
					case 2: dx = dist; break;
					case 3: dy = dist; break;
				}
				beacons.push(
					<BsFillSquareFill size="50px" style={{
						position: "absolute", 
						left: currPos.x + dx + 50,
						top: currPos.y + dy + 50, 
						height: "20px",
						width: "20px",
						color: `rgb(${lineName === "greenLine" ? "49,135,133" : "196,73,76"}, 1)`,
						overflow: "visible",
						zIndex: 1,
					}}/>
				);
			});
		}

		let lineColor = lineName === "greenLine" ? "green" : "red";
		let newBlockSVGs = <div key={lineColor + currBlock.blockId}>
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip>{currBlock.station}</Tooltip>}
			>
				{currBlock.station != undefined ? trackBlockCircle(
					<IoGitCompareSharp style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 30,
						height: 30,
					}}/>, 
					"white", 
					`rgb(${lineName === "greenLine" ? "49,135,133" : "196,73,76"}, 1)`, 
					() => {
						updateSelectedBlock(currBlock.blockId, lineColor)},
					currPos
				) : <></>}
			</OverlayTrigger>
			<div
				style={{
					position: "absolute",
					left: currPos.x + 5,
					top: currPos.y,
					margin: 0,
					fontSize: ".35em",
					zIndex: 1000,
				}}
			>{`${currBlock.section}${currBlock.blockId}`}</div>
			{blockSVGs}
			{beacons}
		</div>

		if (lineName === "greenLine") {
			greenBlockSVGs.push(newBlockSVGs);
		} else {
			redBlockSVGs.push(newBlockSVGs);
		}
	}

	//iterate through lines to render track view when blockLists or lineFilter changes
	// useEffect(() => {
	// 	console.log("[CTC/TrackView] Rendering track view", blockLists);
	// 	for (const [key, value] of Object.entries(trackLayout)) {
	// 		lineName = key;
	// 		visitedBlockIds = [];
	// 		traceTrack(
	// 			value[0], 
	// 			{x: gridBlocks / 2 * gridSize, y: gridBlocks / 2 * gridSize}, 
	// 			value
	// 		);
			
	// 		let filteredSVGs = [];
	// 		greenBlockSVGs.forEach(svg => filteredSVGs.push(svg));
	// 		redBlockSVGs.forEach(svg => filteredSVGs.push(svg));
	// 		setFilteredLineSVGs(filteredSVGs);
	// 	}
	// }, [blockLists, lineFilter]);

	useEffect(() => {
		if (Object.keys(blockLists).length == 0) return;
		console.log("[CTC/TrackView] Rendering track view");
		greenBlockSVGs = [];
		redBlockSVGs = [];
		for (const [key, value] of Object.entries(trackLayout)) {
			lineName = key;
			visitedBlockIds = [];
			traceTrack(
				value[0], 
				{x: gridBlocks / 2 * gridSize, y: gridBlocks / 2 * gridSize}, 
				value
			);
		}
		setFilteredLineSVGs(greenBlockSVGs.concat(redBlockSVGs));
	}, [blockLists]);

	return (
		<div style={styles.track}>
			<DropdownButton 
				className="filterLineButton"
				id="dropdown-basic-button" 
				title={`Line: ${lineFilter}`} 
				onSelect={e => updateFilter(e)}
			>
				<Dropdown.Item eventKey="red">Red</Dropdown.Item>
				<Dropdown.Item eventKey="green">Green</Dropdown.Item>
				<Dropdown.Item eventKey="both">Both</Dropdown.Item>
			</DropdownButton>
			<TransformWrapper 
				limitToBounds={false} 
				minScale={.01} 
				initialPositionX={-maxLength / 2.5}
				initialPositionY={-maxLength / 2.35}
				initialScale={0.85}
				panning = {{velocityDisabled: true}} 
			>
				<TransformComponent>
					<div style={{width: `${maxLength}px`, height: `${maxLength}px`}}>
						<div>
							{filteredLineSVGs}
							{trainSVGs}
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
		position: "relative",
	}
}

export default TrackView