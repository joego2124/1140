import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';

const PLCFileUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {}, []);
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
