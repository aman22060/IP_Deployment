import React, { useState, useEffect } from 'react';
import '../App.css';

function Talks() {
    const [ talks, setTalks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [error, setError] = useState(null);


    const [formData, setFormData] = useState({
        id : '',
        video_url: '',
        Title: '',
        Speaker: '',
    });

    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Form Data:", formData);
    
        try {
            const response = await fetch('http://localhost:3005/talks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Send JSON instead of FormData
            });
    
            if (response.ok) {
                const updatedTalks = await response.json();
                setTalks(updatedTalks);
                alert('Data Submitted Successfully');
            } else {
                alert('Failed to Submit Data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An Error Occurred');
        }
    };
    

    useEffect(()=>{
        fetch('http://localhost:3005/talks')
        .then((response)=>{
            if (!response.ok){
            throw new Error('Network Response was not Okay');
        } return response.json();
        })
        .then((data) => {
            const updatedTalks = data.map((talk) => {
                let videoId = '';

                if (talk.video_Url && talk.video_Url.includes('youtube.com/watch?v=')) {
                    videoId = talk.video_Url.split('v=')[1]?.split('&')[0];
                } else if (talk.video_Url && talk.video_Url.includes('youtu.be/')) {
                    videoId = talk.video_Url.split('.be/')[1];
                }

                return {
                    ...talk,
                    video_Url: videoId ? `https://www.youtube.com/embed/${videoId}` : '',
                };
            });

            setTalks(updatedTalks);
            setLoading(false);
        })
        .catch((error)=>{
            console.error('Error Fetching Talks: ',error);
            setError(error.message);
            setLoading(false);
        });


    },[]);

    const handleDelete = async(Id) =>{
        try{
            setTalks(talks.filter(talk => talk.id !== Id));

            const response = await fetch (`http://localhost:3005/talks/${Id}`,{
                method:'DELETE',
            });
            if(!response.ok){
                throw new Error('Failed to Delete Talks');

            }
            const data = await response.json();
            if(Array.isArray(data)){
                setTalks(data);
            }else{
                throw new Error('Data Returned from Server is not an Array');
            }
        }catch(error){
            console.error('Error deleting Talks : ',error);
            setError('Error Deleting Talks');
        }

    };

    return (
        <div className="outer-container">
            <div className='teamMemberInsertion'>
            <h1 style={{textAlign: 'center'}}>Add Talks</h1>

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
                    <label htmlFor="video_url">Video URL:</label>
                    <input
                        type="url"
                        id="video_url"
                        name="video_url"
                        value={formData.video_url}
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
                    <label htmlFor="Speaker">Speaker:</label>
                    <input
                        type="text"
                        id="Speaker"
                        name="Speaker"
                        value={formData.Speaker}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Talk</button>
            </form>
            </div>

            <div className="teamMemberList">
            <h1 style={{ textAlign: 'center' }}>Talks List</h1>
                <table border ="1" className="team-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Video</th>
                            <th>Title</th>
                            <th>Speaker</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talks.map((talk) => (
                            <tr key={talk.id}>
                                <td>{talk.id}</td>
                                <td>
                                    {talk.video_url ? (
                                        <iframe
                                            src={talk.video_url}
                                            title={`Talk ${talk.id}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ width: '100%', height: '200px' }}
                                        ></iframe>
                                    ) : (
                                        'No video available'
                                    )}
                                </td>
                                <td>{talk.Title}</td>
                                <td>{talk.Speaker}</td>
                                <td>
                                    <button onClick={() => handleDelete(talk.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Talks;
