import React, { useState, useEffect } from 'react';
import '../App.css';

function Publication() {
    const [pub, setPub] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        id: '',
        Title_Link: '',
        Title: '',
        Year: '',
        Anchor_text:'',
        Tags:'',
        addComments:'',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data:", formData);

        try {
            const response = await fetch('http://localhost:3005/publications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Send JSON instead of FormData
            });

            if (response.ok) {
                const updatedPubs = await response.json();
                setPub(updatedPubs);
                alert('Data Submitted Successfully');
            } else {
                alert('Failed to Submit Data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An Error Occurred');
        }
    };

    useEffect(() => {
        fetch('http://localhost:3005/publications')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network Response was not Okay');
                }
                return response.json();
            })
            .then((data) => {
                setPub(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error Fetching Publications: ', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (Id) => {
        try {
            setPub(pub.filter((publication) => publication.id !== Id));

            const response = await fetch(`http://localhost:3005/publications/${Id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to Delete Publication');
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setPub(data);
            } else {
                throw new Error('Data Returned from Server is not an Array');
            }
        } catch (error) {
            console.error('Error deleting Publication: ', error);
            setError('Error Deleting Publication');
        }
    };

    return (
        <div className="outer-container">
            <div className='teamMemberInsertion'>
                <h1 style={{ textAlign: 'center' }}>Add Publications</h1>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Title_Link">Title Link</label>
                        <input
                            type="url"
                            id="Title_Link"
                            name="Title_Link"
                            value={formData.Title_Link}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Title">Title:</label>
                        <input
                            type="text"
                            id="Title"
                            name="Title"
                            value={formData.Title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Year">Year</label>
                        <input
                            type="text"
                            id="Year"
                            name="Year"
                            value={formData.Year}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Anchor_text">Anchor Text</label>
                        <input
                            type="text"
                            id="Anchor_text"
                            name="Anchor_text"
                            value={formData.Anchor_text}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Tags">Tags</label>
                        <input
                            type="text"
                            id="Tags"
                            name="Tags"
                            value={formData.Tags}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="addComments">Additional Comments</label>
                        <input
                            type="text"
                            id="addComments"
                            name="addComments"
                            value={formData.addComments}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Publication</button>
                </form>
            </div>

            <div className="teamMemberList">
                <h1 style={{ textAlign: 'center' }}>Publications List</h1>
                <table border="1" className="team-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Year</th>
                            <th>Title</th>
                            <th>Title Link</th>
                            <th>Anchor Text</th>
                            <th>Tags</th>
                            <th>Additional Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pub.map((publication) => (
                            <tr key={publication.id}>
                                <td>{publication.id}</td>
                                <td>{publication.Year}</td>
                                <td>{publication.Title}</td>
                                <td>{publication.TitleLink}</td>
                                <td>{publication.Anchor_text}</td>
                                <td>{publication.Tags}</td>
                                <td>{publication.addComments}</td>
                                <td>
                                    <button onClick={() => handleDelete(publication.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Publication;
