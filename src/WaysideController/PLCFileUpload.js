import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';

import './styles.css';

const parser = require('./interpreter.js');

const PLCFileUpload = ({ setter }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const fs = require('fs');
    var text = fs.readFileSync(acceptedFiles, 'utf8');
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   var contents = e.target.result;
    //   console.log(contents);
    // };
    console.log(acceptedFiles);
    // reader.readAsText(acceptedFiles);
    if (acceptedFiles.length > 0) {
      setter(true);
    }
  }, []);
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
