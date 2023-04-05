import React, { useState, useRef, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

registerPlugin(FilePondPluginImagePreview);

const ImageUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [pctg, setPctg] = useState('0.00');

  const workerRef = useRef(null);
  const pondRef = useRef(null);

  const doOCR = async (file) => {
    setIsProcessing(true);
    await workerRef.current.load();
    await workerRef.current.loadLanguage('eng');
    await workerRef.current.initialize('eng');
    // sending the File Object into the Recognize function to parse the data
    const response = await workerRef.current.recognize(file.file);
    const {
      data: { text },
    } = response;
    setIsProcessing(false);
    setOcrText(text);
  };

  const updateProgressAndLog = (m) => {
    // Maximum value out of which percentage needs to be
    // calculated. In our case it's 0 for 0 % and 1 for Max 100%
    // DECIMAL_COUNT specifies no of floating decimal points in our
    // Percentage
    var MAX_PARCENTAGE = 1;
    var DECIMAL_COUNT = 2;

    if (m.status === 'recognizing text') {
      var pctg = (m.progress / MAX_PARCENTAGE) * 100;
      setPctg(pctg.toFixed(DECIMAL_COUNT));
    }
  };

  useEffect(() => {
    const worker = createWorker({
      logger: (m) => updateProgressAndLog(m),
    });
    worker.then((res) => {
      workerRef.current = res;
    });

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div style={{ marginTop: '10%' }} className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <FilePond
              ref={pondRef}
              onaddfile={(err, file) => {
                doOCR(file);
              }}
              onremovefile={(err, fiile) => {
                setOcrText('');
              }}
            />
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="card">
          <h5 className="card-header">
            <div style={{ margin: '1%', textAlign: 'left' }} className="row">
              <div className="col-md-12">
                <i
                  className={
                    'fas fa-sync fa-2x ' + (isProcessing ? 'fa-spin' : '')
                  }
                ></i>{' '}
                <span className="status-text">
                  {isProcessing
                    ? `Processing Image ( ${pctg} % )`
                    : 'Parsed Text'}{' '}
                </span>
              </div>
            </div>
          </h5>
          <div className="card-body">
            <p className="card-text">
              {isProcessing
                ? '...........'
                : ocrText.length === 0
                ? 'No Valid Text Found / Upload Image to Parse Text From Image'
                : ocrText}
            </p>
          </div>
        </div>

        <div className="ocr-text"></div>
      </div>
    </div>
  );
};

export default ImageUpload;
