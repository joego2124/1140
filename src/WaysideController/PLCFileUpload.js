import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';
import Firebase from 'firebase';

import './styles.css';

const parser = require('./interpreter.js');

const PLCFileUpload = ({ setter }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      var reader = new FileReader();
      reader.onload = () => {
        // Do whatever you want with the file contents
        const plc = reader.result;
        console.log(plc);
        let script = parser.parseFile(plc);
        setScriptData(script);
      };
      reader.readAsText(file);
    });
    // parser.parseFile(plc);
    // reader.readAsText(acceptedFiles);
    if (acceptedFiles.length > 0) {
      setter(true);
    }
  }, []);

  function setScriptData(script) {
    let link = '/WSC/WSC1/Script';
    Firebase.database().ref(link).set(script);
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant='light' className='uploadPLCButton'>
        <div className='buttonDiv'>
          <div className='buttonText'>Click to select PLC file</div>
        </div>
      </Button>
    </div>
  );
};

export default PLCFileUpload;
