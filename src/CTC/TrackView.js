import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { default as blockSVG } from'./assets/block.svg';
import trackLayout from './trackLayout';

const TrackView = () => {

	const maxLength = 4000;

	document.body.style.overflow='hidden';

	var prevBlock = null;
	var prevPos = {x: 0, y: 0};
	var trackBlockSVGs = trackLayout.blocks.map((v, i) => {
		// for ()
		return <img 
			alt="logo" 
			src={blockSVG} 
			style={{position: 'absolute', top: 0, left: 0}}
		/>;
	});

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
							<pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
								<path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0.25"/>
							</pattern>
							<pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
								<rect width="120" height="120" fill="url(#smallGrid)"/>
								<path d="M 120 0 L 0 0 0 120" fill="none" stroke="gray" strokeWidth=".5"/>
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