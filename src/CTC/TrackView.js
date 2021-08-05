import React, { useState, useEffect, useCallback } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from 'react-bootstrap';
import { BiTrain } from 'react-icons/bi';
import { IoGitCompareSharp } from 'react-icons/io5';
import { BsFillSquareFill } from "react-icons/bs";
import { GiTrafficLightsGreen } from "react-icons/gi";
import { GiTrafficLightsRed } from "react-icons/gi";
import { BsCircleFill } from "react-icons/bs";
import Blocks from './assets/Blocks';
import './styles.css';

var trackLayout = require("./TrackLayout.json");

const occupiedColor = '122, 87, 140';

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

	//TODO: refactor so set blockid
	const updateSelectedBlock = useCallback((blockId, color) => {
		let blockDatabaseIndex;
		let selectedBlock = blockLists[color]?.find((block, index) => {
			if (index != "databasePath") {
				if (Math.trunc(block.BlockNumber) === blockId) {
					blockDatabaseIndex = index;
					return true;
				}
			}
		});
		if (selectedBlock != undefined) {
			selectedBlock.databasePath = `${blockLists[color].databasePath}/${blockDatabaseIndex}`;
			setSelectedBlock(selectedBlock);
		}
	}, [blockLists]);

	let greenBlockSVGs = [];
	let redBlockSVGs = [];
	let visitedBlockIds = [];

	//TODO: refactor so doesnt rerender on EVERY train change
	//render train icons on track
	useEffect(() => {
		console.log("trains rerendered");
		setTrainSVGs(Object.entries(trainsList).map(trainArr => {
			let train = trainArr[1];
			if (trainArr[0] != "databasePath") {
				let layoutBlock = trackLayout[train.Line === "GreenLine" ? "greenLine" : "redLine"]
					.find(block => Math.trunc(block.blockId < 0 ? 0 : block.blockId) === Math.trunc(train.CurrentBlock < 0 ? 0 : train.CurrentBlock));
				if (layoutBlock == undefined) return;
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
					`rgb(${occupiedColor}, 1)`,
					() => {},
					layoutBlock?.position
				);
			}
		}));
	}, [trainsList]);

	//recursive function to generate a list of tracks for rendering
	const traceTrack = (currBlock, currPos, trackLayoutList, lineName) => {
		
		let blockSVGs = [];
		let lineColor = lineName.toLowerCase().includes("red") ? "red" : "green";
		let actualBlock = blockLists[lineColor][Math.trunc(currBlock.blockId)];
		
		currBlock.position = currPos;

		//add current block to list of visited blocks
		visitedBlockIds.push(currBlock.blockId);

		//iterate through all connections
		currBlock.connectors.forEach((connnectorArr, index) => {

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
						traceTrack(nextBlock, nextPos, trackLayoutList, lineName);
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
			let color = `rgb(${lineName === "greenLine" ? "49,135,133" : "196,73,76"}, ${actualBlock?.SwitchState == index ? 1 : .25})`;
			
			color = currBlock.section === "YARD" ? "grey" : color; //yard blocks are grey

			//show occupancy based on blocks
			let block = blockLists[lineColor][Math.trunc(currBlock.blockId)];
			if (block?.Occupancy == 1) {
				color = `rgb(${occupiedColor}, ${actualBlock?.SwitchState == index ? 1 : .25})`;
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
		let color = `rgb(${lineName === "greenLine" ? "49,135,133" : "196,73,76"}, 1)`;
		if (actualBlock?.Occupancy == 1) color = `rgb(${occupiedColor}, 1)`;
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
						color: color,
						overflow: "visible",
						zIndex: 1,
					}}/>
				);
			});
		}

		let lights = [];
		if (currBlock.connectors.length > 1) {
			let lightHistory = [null, null, null, null];
			let filledBlockIds = currBlock.connectors[actualBlock?.SwitchState];
			
			currBlock.connectors.forEach(connector => {
				connector.forEach((id, i) => {
					if (id === null || lightHistory[i] != null) return;
					lightHistory[i] = true;
					let dx = 0, dy = 0;
					let dist = 41;
					switch(i) {
						case 0: dx = -dist; break;
						case 1: dy = -dist; break;
						case 2: dx = dist; break;
						case 3: dy = dist; break;
					}
					lights.push(
						<div>
							<BsCircleFill size="50px" style={{
								position: "absolute", 
								left: currPos.x + dx + 47.5,
								top: currPos.y + dy + 47.5, 
								height: "25px",
								width: "25px",
								color: color,
								overflow: "visible",
								zIndex: 1009,
							}}/>
							<BsCircleFill size="50px" style={{
								position: "absolute", 
								left: currPos.x + dx + 52.5,
								top: currPos.y + dy + 52.5, 
								height: "15px",
								width: "15px",
								color: filledBlockIds?.find(v => v == id) == undefined ? "rgb(255, 255, 255, .75)" : color,
								overflow: "visible",
								zIndex: 1010,
							}}/>
						</div>
					);
				});
			});
		}

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
			{lights}
		</div>

		if (lineName === "greenLine") {
			greenBlockSVGs.push(newBlockSVGs);
		} else {
			redBlockSVGs.push(newBlockSVGs);
		}
	}

	//TODO: refactor so doesnt rerender on EVERY block change
	useEffect(() => {
		if (Object.keys(blockLists).length == 0) return;
		console.log("[CTC/TrackView] Rendering track view");
		greenBlockSVGs = [];
		redBlockSVGs = [];
		for (const [key, value] of Object.entries(trackLayout)) {
			visitedBlockIds = [];
			traceTrack(
				value[0], 
				{x: gridBlocks / 2 * gridSize, y: gridBlocks / 2 * gridSize}, 
				value,
				key
			);
		}
		setFilteredLineSVGs(greenBlockSVGs.concat(redBlockSVGs));
	}, [blockLists]);

	return (
		<div style={styles.track}>
			{/* <DropdownButton 
				className="filterLineButton"
				id="dropdown-basic-button" 
				title={`Line: ${lineFilter}`} 
				onSelect={e => updateFilter(e)}
			>
				<Dropdown.Item eventKey="red">Red</Dropdown.Item>
				<Dropdown.Item eventKey="green">Green</Dropdown.Item>
				<Dropdown.Item eventKey="both">Both</Dropdown.Item>
			</DropdownButton> */}
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