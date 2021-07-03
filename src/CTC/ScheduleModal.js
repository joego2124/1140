import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const ScheduleModal = (props) => {
	const [trainLabelList, setTrainLabelList] = useState({});

	useEffect(() => {
		var labelList = [];
		for (const [trainName, trainObj] of Object.entries(props.trainsList)) {
			labelList.push(
				<tr>
					<td>{trainName}</td>
					<td>Track ID</td>
					<td>Destination Station</td>
					<td>{trainObj.CurrentStation}</td>
					<td>{trainObj.NextStation}</td>
					<td>12:00:00</td>
					<td>12:00:00</td>
					<td>
						<Button variant="outline-dark">Toggle Stops</Button>
					</td>
				</tr>
			);
		}
		setTrainLabelList(labelList);
	}, [props.trainsList]);

	return (
		<Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Schedule and Routing
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Current Track</th>
							<th>Destination</th>
							<th>Current Station</th>
							<th>Next Station</th>
							<th>Dispatched Time</th>
							<th>ETA</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{trainLabelList}
					</tbody>
				</Table>
      </Modal.Body>
      <Modal.Footer>
				<Button variant="dark">Upload Schedule</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default ScheduleModal

