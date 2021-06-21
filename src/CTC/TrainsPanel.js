import React, { useState, Button } from 'react'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const TrainsPanel = () => {

	const [state, setState] = useState(true);

	return (
		<div style={{
			position: "absolute",
			width: "100px",
			height: "100px",

		}}>
			<button onClick={() => {
				setState(true);
				console.log("clicked");
			}}> Show Panel </button>
			<SlidingPane
        closeIcon={<div>Some div containing custom close icon.</div>}
        isOpen={state}
        title="Hey, it is optional pane title.  I can be React component too."
        from="bottom"
        width="200px"
        onRequestClose={() => setState(false)}
      >
        <div>And I am pane content on left.</div>
      </SlidingPane>
		</div>
	)
}

const styles = {
	bar: {

	}
}

export default TrainsPanel
