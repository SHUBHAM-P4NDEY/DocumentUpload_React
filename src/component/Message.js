import React from 'react';
import './DocumentUpload.css';

const Message = ({ message }) => {
    if (!message) return null;

    const messageType = message.startsWith('Error') ? 'error' : 'success';
    return (
        <div className={`message ${messageType}`}>
            {message}
        </div>
    );
};

export default Message;
