import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';

const UploadLayoutButton = ({ setter }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setter(true);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant='light' className='uploadLayoutButton'>
        <div className='buttonDiv'>
          <div className='buttonText'>Upload Layout</div>
        </div>
      </Button>
    </div>
  );
};

export default UploadLayoutButton;