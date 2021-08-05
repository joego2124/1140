import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';

import { trainTemplate } from './TrainTemplate';

const ScheduleModal = (props) => {
	const [trainLabelList, setTrainLabelList] = useState({});
	const [file, setFile] = useState(null);

	const handleChange = e => {
    const fileReader = new FileReader();
		console.log(e.target.files[0]);
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
			console.log("e.target.result", JSON.parse(e.target.result));
      setFile(JSON.parse(e.target.result));
    };
  };

	useEffect(() => {
		if (file != null && typeof file == "object") {
			Object.entries(file).forEach(train => {
				let newTrain = {...trainTemplate, ...train};
				newTrain.Stations = stationSelections;
				newTrain.Route = props.routeTrain(train.Stations, train.Line.toLowerCase().includes("red") ? "red" : "green");
				newTrain.CurrentBlock = 0;
				newTrain.PreviousBlock = 0;
				newTrain.RouteIndex = 1;
				Firebase.database().ref(`/TrainList/${trainId}`).set(newTrain);
			});
		}
	}, [file]);

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
				{/* <Button variant="dark" type="file" onChange={handleChange}>Upload Schedule</Button> */}
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Default file input example</Form.Label>
					<Form.Control type="file" onChange={handleChange}/>
				</Form.Group>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default ScheduleModal

