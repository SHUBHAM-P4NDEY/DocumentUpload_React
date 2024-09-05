import React from 'react';

const FileInput = ({ file, onFileChange, onExtractContent }) => {
    return (
        <div className="file-input-container">
           <div> <input
                type="file"
                accept=".pdf,.docx"
                className="file-input"
                onChange={onFileChange}
                required
            />
            </div>
            <div>
            <button type="button" className="btn" onClick={onExtractContent}>Extract Content</button></div>
        </div>
    );
};

export default FileInput;
