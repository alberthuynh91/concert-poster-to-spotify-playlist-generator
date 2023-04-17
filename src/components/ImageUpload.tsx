import React, { useState, useRef, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import Box from '@mui/material/Box';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { parseArtistsFromOcrString, getArtistList } from '@/utils';
// import ParsedOcrText from '@/components/ParsedOcrText';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

registerPlugin(FilePondPluginImagePreview);

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const ImageUpload = (props: any) => {
  const { setArtistListObject, isLoading, setIsLoading } = props;
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [percentage, setPercentage] = useState('0.00');
  const workerRef = useRef(null);
  const pondRef = useRef(null);

  const doOCR = async (file: any) => {
    setIsProcessing(true);
    setIsLoading(true);
    // @ts-expect-error
    await workerRef.current.load();
    // @ts-expect-error
    await workerRef.current.loadLanguage('eng');
    // @ts-expect-error
    await workerRef.current.initialize('eng');
    // @ts-expect-error
    await workerRef.current.setParameters({
      // tessedit_char_whitelist: '0123456789',
      // preserve_interword_spaces: '0',
      // textord_tabfind_vertical_text: '1',
    });
    // sending the File Object into the Recognize function to parse the data
    // @ts-expect-error
    const response = await workerRef.current.recognize(file.file);
    const {
      data: { text },
    } = response;
    console.log(`OCR TEXT: `, text);
    setOcrText(text);
    const artistStrings = parseArtistsFromOcrString(text);
    const artistObjectList = await getArtistList(artistStrings);
    setArtistListObject(artistObjectList);
    setIsProcessing(false);
    setIsLoading(false);
  };

  const updateProgressAndLog = (m: any) => {
    // Maximum value out of which percentage needs to be calculated. In our case it's 0 for 0 % and 1 for Max 100%
    var MAX_PARCENTAGE = 1;
    // DECIMAL_COUNT specifies no of floating decimal points in our percentage
    var DECIMAL_COUNT = 2;

    if (m.status === 'recognizing text') {
      var percentage = (m.progress / MAX_PARCENTAGE) * 100;
      setPercentage(percentage.toFixed(DECIMAL_COUNT));
    }
  };

  useEffect(() => {
    const worker = createWorker({
      logger: (m) => updateProgressAndLog(m),
    });
    worker.then((res) => {
      // @ts-expect-error
      workerRef.current = res;
    });
    return () => {
      // @ts-expect-error
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="filepond-wrapper">
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
      {isProcessing && (
        <Box pl={2} mt={4} sx={{ width: '100%' }}>
          <LinearProgressWithLabel
            variant="determinate"
            color="success"
            value={Number(percentage)}
          />
        </Box>
      )}
      {/* <ParsedOcrText
        isProcessing={isProcessing}
        percentage={percentage}
        ocrText={ocrText}
      /> */}
    </>
  );
};

export default ImageUpload;
