import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileInput from './FileInput';
import Message from './Message';
import DataDisplay from './DataDisplay';
import DocumentsList from './DocumentsList';
import './DocumentUpload.css';

const DocumentUpload = () => {
    const [file, setFile] = useState(null);
    const [extractedContent, setExtractedContent] = useState("");
    const [message, setMessage] = useState("");
    const [documents, setDocuments] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        loadCsrfToken();
        loadDocuments();
    }, []);

    const loadCsrfToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/csrf-token');
            setCsrfToken(response.data.token);
        } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
            setMessage('Failed to fetch CSRF token.');
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleExtractContent = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
    
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/extract-content", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken
                    }
                });
    
                if (response.data.success) {
                    setExtractedContent(response.data.content);
                    setMessage('Content extracted successfully!');
                } else {
                    setMessage(response.data.message || 'File extraction failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage(`Error: ${error.response?.data?.message || 'File extraction failed.'}`);
            }
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("extracted_content", extractedContent);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/upload-document", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.data.success) {
                setMessage("File uploaded successfully.");
                loadDocuments();
                clearForm();
            } else {
                setMessage(response.data.message || 'Upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(`Error: ${error.response?.data?.message || 'Upload failed.'}`);
        }
    };

    const clearForm = () => {
        setFile(null);
        setExtractedContent("");
        setMessage("");
    };

    const loadDocuments = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get-documents");
            setDocuments(response.data.documents || []);
        } catch (error) {
            console.error('Failed to load documents:', error);
            setMessage(`Error: ${error.response?.data?.message || 'Failed to load documents.'}`);
        }
    };

    return (
        <div className="upload-wrapper">
            <div className="upload-container">
                <h2>Upload Your Document</h2>
                <form onSubmit={handleUpload}>
                    <FileInput file={file} onFileChange={handleFileChange} onExtractContent={handleExtractContent} />
                    <div className="button-container">
                        <button type="submit" className="btn">Upload</button>
                    </div>
                </form>
                <Message message={message} />
            </div>

            <DataDisplay extractedContent={extractedContent} />

            <hr />

            <DocumentsList documents={documents} />
        </div>
    );
};

export default DocumentUpload;
