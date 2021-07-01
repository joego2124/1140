import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import Firebase from 'firebase';
import config from '../config';
import WaysidePanel from './WaysidePanel';
import BottomPanel from './BottomPanel';

const WaysideController = () => {
  document.body.style.overflow = 'hidden';

  if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
  } else {
    Firebase.app(); // if already initialized, use that one
  }

  return (
    <div>
      <header className='App-header'>
        <WaysidePanel />
        <BottomPanel />
      </header>
    </div>
  );

  // const [alpha, setAlpha] = useState("empty");

  // Firebase.app();

  // //when updates happen this is called and then it calls appropriate functions to update the page element
  // const handleUpdate = useCallback(
  // 	async event => {
  // 		event.preventDefault();
  // 		const { alpha } = event.target.elements;
  // 		console.log(alpha.value);
  // 		setAlphaData(alpha.value);
  // 	}, []
  // );

  // function getAlphaData() {
  // 	let ref = Firebase.database().ref('/trackController/testdata');
  // 	ref.on('value', snapshot => {
  //         setAlpha(snapshot.val());
  //     });
  // }

  // function setAlphaData(newState) {
  // 	Firebase.database().ref('/trackController/testdata').set(newState);
  // }

  // useEffect(() => getAlphaData());

  // return (
  //     <div style={{paddingLeft: '4em'}}>
  //         {alpha}

  //         <Form onSubmit={handleUpdate}>
  //             <Form.Group className="mb-3" controlId="formBasicEmail">
  //                 <Form.Label>alpha</Form.Label>
  //                 <Form.Control name="alpha" placeholder="Data here" />
  //             </Form.Group>
  //             <Button variant="primary" type="submit">
  //                 Submit
  //             </Button>
  //         </Form>
  //     </div>
  // )
};

export default WaysideController;
