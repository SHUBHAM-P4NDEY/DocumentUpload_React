import React from 'react';

const DocumentsList = ({ documents }) => {
    return (
        <div className="documents-list">
            <h3>Uploaded Documents</h3>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Document Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={doc.id || `${doc.file_name}-${index}`}>
                            <td>{index + 1}</td>
                            <td>{doc.file_name}</td>
                            <td>{doc.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentsList;
