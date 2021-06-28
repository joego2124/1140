import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from 'firebase'

const TrainStatus = () => {

    document.body.style.overflow='hidden';
    
    const [intLights, setIntLights] = useState(false);
    const [extLights, setExtLights] = useState(false);
    const [station, setStation] = useState(false);
    const [setpointSpeed, setSetpointSpeed] = useState();
    const [temperatureControl, setTemperatureControl] = useState();

    Firebase.app();

    function getData() {
		let ref = Firebase.database().ref('/TC/InternalLightCommand');
		ref.on('value', snapshot => {
			setIntLights(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/ExternalLightCommand');
		ref.on('value', snapshot => {
			setExtLights(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/AnnounceNextStation');
		ref.on('value', snapshot => {
			setStation(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/SetpointSpeedCommand');
		ref.on('value', snapshot => {
			setSetpointSpeed(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/TemperatureCommand');
		ref.on('value', snapshot => {
			setTemperatureControl(snapshot.val());
		});
	}

	function setData(newState, commandType) {
        if(commandType == "int"){
            Firebase.database().ref('/TC/InternalLightCommand').set(newState);
        }
        else if(commandType == "ext"){
            Firebase.database().ref('/TC/ExternalLightCommand').set(newState);
        }
        else if(commandType == "sta"){
            Firebase.database().ref('/TC/AnnounceNextStation').set(newState);
        }
        else if(commandType == "set"){
            Firebase.database().ref('/TC/SetpointSpeedCommand').set(newState);
        }
        else if(commandType == "tem"){
            Firebase.database().ref('/TC/TemperatureCommand').set(newState);
        }
	}

    const setpoint = useCallback(
        async event => {
            event.preventDefault();
            const {setpointSpeed} = event.target.elements;
            setSPS(setpointSpeed.value);
        }, []
    );

    const temperature = useCallback(
        async event => {
            event.preventDefault();
            const {temperatureControl} = event.target.elements;
            setTemp(temperatureControl.value);
        }, []
    );

    function getSPS(){
        let ref = Firebase.database().ref('/TC/SetpointSpeedCommand');
        ref.on('value', snapshot => {
            setSetpointSpeed(snapshot.val());
        });
    }

    function setSPS(newSPS){
        Firebase.database().ref('/TC/SetpointSpeedCommand').set(parseInt(newSPS))
    }

    function getTemp(){
        let ref = Firebase.database().ref('/TC/TemperatureCommand');
        ref.on('value', snapshot => {
            setTemperatureControl(snapshot.val());
        });
    }

    function setTemp(newTemp){
        Firebase.database().ref('/TC/TemperatureCommand').set(parseInt(newTemp))
    }

    useEffect(getData, []);
    useEffect(() => getSPS());
    useEffect(() => getTemp());

    return (
        <div>
            <Button 
                variant={intLights ? "primary" : "outline-primary"}
                onClick={() => setData(!intLights, "int")}
            >
                Internal Lights
            </Button>
            <Button 
                variant={extLights ? "primary" : "outline-primary"}
                onClick={() => setData(!extLights, "ext")}
            >
                External Lights
            </Button>
            <Button 
                variant={station ? "primary" : "outline-primary"}
                onClick={() => setData(!station, "sta")}
            >
                Announce Next Station
            </Button>
            <div>
                <Form onSubmit={setpoint}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Update Setpoint Speed</Form.Label>
                        <Form.Control name="setpointSpeed" placeholder={setpointSpeed} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <div>
                <Form onSubmit={temperature}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Update Temperature</Form.Label>
                        <Form.Control name="temperatureControl" placeholder={temperatureControl} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default TrainStatus
