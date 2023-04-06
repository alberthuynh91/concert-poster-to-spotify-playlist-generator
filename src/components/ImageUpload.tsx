import React, { useState, useRef, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { parseArtistsFromOcrString } from '../utils';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

registerPlugin(FilePondPluginImagePreview);

const getAccessToken = async () => {
  const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const SPOTIFY_REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
  const BASIC = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token?`;
  const TOKEN_URL =
    TOKEN_ENDPOINT +
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    });
  const response = await fetch(TOKEN_URL, {
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });
  return response.json();
};

const getDataForArtist = async (artist: string) => {
  const { access_token } = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US&limit=1&offset=0`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const data = await response.json();
  return data?.artists?.items[0] || {};
};

const getArtistList = async (list: string[]) => {
  const promises = list.map((item) => {
    return getDataForArtist(item);
  });
  const artistList = await Promise.all(promises);
  return artistList;
};

const ImageUpload = (props) => {
  const { setCurrentData } = props;
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
    await workerRef.current.setParameters({
      // tessedit_char_whitelist: '0123456789',
      preserve_interword_spaces: '0',
    });
    // sending the File Object into the Recognize function to parse the data
    const response = await workerRef.current.recognize(file.file);
    const {
      data: { text },
    } = response;
    console.log(`finished processing: `, response);
    setIsProcessing(false);
    setOcrText(text);
    const artistStrings = parseArtistsFromOcrString(text);
    const artistObjectList = await getArtistList(artistStrings);
    setCurrentData(artistObjectList);
    console.log(`>>>>>> what is artistObjectList: `, artistObjectList);
  };

  const updateProgressAndLog = (m) => {
    // Maximum value out of which percentage needs to be calculated. In our case it's 0 for 0 % and 1 for Max 100%
    var MAX_PARCENTAGE = 1;
    // DECIMAL_COUNT specifies no of floating decimal points in our percentage
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
