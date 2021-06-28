import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const TrackView = () => {

	const maxLength = 4000;

	document.body.style.overflow='hidden';

	return (
		<div style={styles.track}>
			<TransformWrapper 
				limitToBounds={false} 
				minScale={1} 
				initialPositionX={-maxLength / 4}
				initialPositionY={-maxLength / 4}
				initialScale={2}
				panning = {{velocityDisabled: true}} 
			>
				<TransformComponent>
				<div style={{width: `${maxLength}px`, height: `${maxLength}px`}}>
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
								<path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0.25"/>
							</pattern>
							<pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
								<rect width="80" height="80" fill="url(#smallGrid)"/>
								<path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth=".5"/>
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