import React from 'react';

const DataDisplay = ({ extractedContent }) => {
    return (
        <div className="data-display">
            <h3>Extracted Data</h3>
            <textarea value={extractedContent} readOnly></textarea>
        </div>
    );
};

export default DataDisplay;
