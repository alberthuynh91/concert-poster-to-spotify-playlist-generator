// Used for debugging ocr text
const ParsedOcrText = (props: any) => {
  const { isProcessing, percentage, ocrText } = props;
  return (
    <div className="card">
      <h5 className="card-header">
        <div style={{ margin: '1%', textAlign: 'left' }} className="row">
          <div className="col-md-12">
            <i
              className={'fas fa-sync fa-2x ' + (isProcessing ? 'fa-spin' : '')}
            ></i>{' '}
            <span className="status-text">
              {isProcessing
                ? `Processing Image ( ${percentage} % )`
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
  );
};
