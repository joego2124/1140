import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const ScheduleModal = (props) => {
	const [trainLabelList, setTrainLabelList] = useState({});

	useEffect(() => {
		var labelList = [];
		console.log(props.trainsList);
		for (const [trainName, trainObj] of Object.entries(props.trainsList)) {
			if (trainName != "databasePath") {
				labelList.push(
					<tr>
						<td>{trainName}</td>
						<td>{trainObj.Line}</td>
						<td>{trainObj.Route[trainObj.RouteIndex > 1 ? trainObj.RouteIndex - 1 : 0]}</td>
						<td>{trainObj.CurrentBlock}</td>
						<td>{trainObj.Route[trainObj.RouteIndex < trainObj.Route.length ? trainObj.RouteIndex + 1 : 0]}</td>
						<td>{trainObj.NextStation}</td>
						<td>{trainObj.DepartureTime}</td>
						<td>
							<Button variant="outline-dark">Toggle Stops</Button>
						</td>
					</tr>
				);
			}
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
							<th>Line Name</th>
							<th>Previous block</th>
							<th>Current Block</th>
							<th>Next Block</th>
							<th>Next Station</th>
							<th>Dispatched Time</th>
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

