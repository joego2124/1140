import React, { useState, useEffect, useCallback } from 'react'
import SlidingPane from "react-sliding-pane";
import Firebase from "firebase";
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

import "react-sliding-pane/dist/react-sliding-pane.css";
import "./styles.css";

const WaysidePanel = () => {

	const [open, setOpen] = useState(true);
    const [waysideList, setWaysideList] = useState([]);

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
        let ref = Firebase.database().ref('/trackController/Waysidelist');
        ref.on('value', snapshot => {
            setWaysideList(['WS-1', 'WS-2', 'WS-3']);
            // setWaysideList(snapshot.val());
        });
    }

    // function setWaysideListData(newState) {
	// 	Firebase.database().ref('/trackController/Waysidelist').set(newState);
	// }

    useEffect(() => getWaysideListData());
    
    function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return (
            <Button variant="light" className="waysideButton">
                <div className="buttonDiv">
                    <BsCircleFill size="1.5em" color="#C44242"/>
                    <div className="buttonText">{props.value}</div>
                </div>
            </Button>
            );
    }

    function ShowWaysideList() {
        const listItems = waysideList.map((waysideIndex) => 
            <ListItem key={waysideIndex.toString()} value={waysideIndex} />
        );
        return (
            <div>
                {listItems}
            </div>
        )
    }      

	return (
		<div>
			<Button onClick={()=> {if (open == true) {setOpen(false)} else {setOpen(true)};} } 
            className="showWaysideControllersButton">Show Wayside Controllers</Button>
			<SlidingPane
				isOpen={open}
				from="left"
				width="225px"
                style={{paddingTop: '10rem'}}
				onRequestClose={() => setOpen(false)}
			>
				<div className="waysidePanelHolder" >
                    <ShowWaysideList />
				</div>
			</SlidingPane>
		</div>
	)
}

export default WaysidePanel;