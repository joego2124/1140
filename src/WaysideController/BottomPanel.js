import React, { useState, useEffect, useCallback } from 'react'
import SlidingPane from "react-sliding-pane";
import Firebase from "firebase";
import { Button } from 'react-bootstrap';

import "react-sliding-pane/dist/react-sliding-pane.css";
import "./styles.css";

const BottomPanel = () => {

	const [open, setOpen] = useState(true);
    const [blockList, setBlockList] = useState([]);
    const [crossingLights, setCrossingLights] = useState('string');
    const [length, setLength] = useState('string');
    const [levelCrossing, setLevelCrossing] = useState('string');
    const [occupancy, setOccupancy] = useState('string');
    const [speedLimit, setSpeedLimit] = useState('string');
    const [status, setStatus] = useState('string');
    const [plcUploaded, setPlcUploaded] = useState(true);

    Firebase.app();

    //when updates happen this is called and then it calls appropriate functions to update the page element
    // const handleUpdate = useCallback(
	// 	async event => {
	// 		event.preventDefault();
	// 		const { waysideList } = event.target.elements;
	// 		console.log(waysideList.value);
	// 		setWaysideListData(waysideList.value);
	// 	}, []
	// );

    function getWaysideListData() {
        let ref = Firebase.database().ref('/WSC/WS-1');
        ref.on('value', snapshot => {
            setBlockList(['Block 1', 'Block 2', 'Block 3']);
            setCrossingLights(snapshot.val().CrossingLights);
            setLength(snapshot.val().Length);
            setLevelCrossing(snapshot.val().LevelCrossing);
            setOccupancy(snapshot.val().Occupancy);
            setSpeedLimit(snapshot.val().SpeedLimit)
            setStatus(snapshot.val().Status);
        });
    }

    // function setWaysideListData(newState) {
	// 	Firebase.database().ref('/trackController/Waysidelist').set(newState);
	// }

    useEffect(() => getWaysideListData(), []);

    function WaysideBlocks() {
        const listItems = blockList.map((blockIndex) => 
                <option value={blockIndex}>{blockIndex}</option>
        );
        return (
            <div className= "dataSection">
                <select>
                    {listItems}
                </select>
                <div className= "dataContainer">
                    <div className="dataLeft">
                        <div className= "dataName">
                            Status:
                            <div className= "dataValue">{status}</div>
                        </div>
                        <div className= "dataName">
                            Occupancy:
                            <div className= "dataValue">{occupancy}</div>
                        </div>
                        <div className= "dataName">
                            Level Crossing:
                            <div className= "dataValue">{levelCrossing}</div>
                        </div>
                    </div>
                    <div className="dataRight">
                        <div className= "dataName">
                            Crossing Lights:
                            <div className= "dataValue">{crossingLights}</div>
                        </div>
                        <div className= "dataName">
                            Speed Limit:
                            <div className= "dataValue">{speedLimit}</div>
                        </div>
                        <div className= "dataName">
                            Length:
                            <div className= "dataValue">{length}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   

	return (
		<div>
			<Button onClick={()=> {if (open == true) {setOpen(false)} else {setOpen(true)};} } 
            className="showBottomPanelButton">Show Controls</Button>
			<SlidingPane
				isOpen={open}
				from="bottom"
				width="100%"
				overlayClassName="bottomPanel"
				onRequestClose={() => setOpen(false)}
			>
				<div className="bottomPanelHolder">
					<div className = "uploadPLCSection">
						Upload PLC
                        <div>
                            PLC Upload Status: 
                            {plcUploaded ? 'Uploaded' : 'Not Uploaded'}
                        </div>
                        <Button variant="light" className="uploadPLCButton">
                        <div className="buttonDiv">
                            <div className="buttonText">Upload PLC here</div>
                        </div>
                    </Button>
					</div>
					<div className = "moveSwitchSection">
						Move Switch
					</div>
					<WaysideBlocks />
				</div>
			</SlidingPane>
		</div>
	)
}

export default BottomPanel
