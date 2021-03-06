import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';

import Firebase from "firebase";
import { trainTemplate } from './TrainTemplate';

const ScheduleModal = (props) => {
	const [trainLabelList, setTrainLabelList] = useState({});
	const [file, setFile] = useState(null);

	const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFile(JSON.parse(e.target.result));
    };
  };

	useEffect(() => {
		if (file != null && typeof file == "object") {
			Object.entries(file).forEach(trainArr => {
				console.log(trainArr[0]);
				let train = trainArr[1];
				let newTrain = {...trainTemplate, ...train};
				newTrain.Route = props.routeTrain(train.Stations, train.Line.toLowerCase().includes("red") ? "red" : "green");
				newTrain.CurrentBlock = 0;
				newTrain.PreviousBlock = 0;
				newTrain.RouteIndex = 1;
				Firebase.database().ref(`/TrainList/${train.TrainId}`).set(newTrain);
				Firebase.database().ref(`/${train.Line}/0/Occupancy`).set(1);
			});
		}
	}, [file]);

	useEffect(() => {
		var labelList = [];
		console.log(props.trainsList);
		for (const [trainName, trainObj] of Object.entries(props.trainsList)) {
			if (trainName != "databasePath" && trainObj?.Route != undefined) {
				labelList.push(
					<tr>
						<td>{trainName}</td>
						<td>{trainObj?.Line}</td>
						<td>{trainObj?.Route[trainObj.RouteIndex > 1 ? trainObj.RouteIndex - 1 : 0]}</td>
						<td>{trainObj?.CurrentBlock}</td>
						<td>{trainObj?.Route[trainObj.RouteIndex < trainObj.Route.length ? trainObj.RouteIndex + 1 : 0]}</td>
						<td>{trainObj?.NextStation}</td>
						<td>{trainObj?.DepartureTime}</td>
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
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Upload Schedule</Form.Label>
					<Form.Control type="file" onChange={handleChange}/>
				</Form.Group>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default ScheduleModal

