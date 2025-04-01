import React, { useState, useEffect } from 'react';
import '../App.css'; 


function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]); // State to hold team member data
  const [loading, setLoading] = useState(true);        // State to show loading status
  const [error, setError] = useState(null);            // State to handle errors
  // Initialize state for each input field
  const [formData, setFormData] = useState({
    Id: '',
    Name: '',
    Position: '',
    About: '',
  });

  const [imageFile, setImageFile] = useState(null); // State for the uploaded image file

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from e.target
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the correct field
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Save file to state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('Id', formData.Id);
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('Position', formData.Position);
    formDataToSend.append('About', formData.About);

    if (imageFile) {
      formDataToSend.append('Image', imageFile); // Add the image file to FormData
    }

    try {
      const response = await fetch('http://localhost:3005/team-members', {
        method: 'POST',
        body: formDataToSend, // Pass FormData directly in the body
      });

      if (response.ok) {
        const updatedTeamMembers = await response.json();
        setTeamMembers(updatedTeamMembers); // Update the team members list with the response data
        alert('Data submitted successfully');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:3005/team-members')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
      })
      .then((data) => {
        setTeamMembers(data);  // Update state with the fetched data
        setLoading(false);     // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching team members:', error);
        setError(error.message); // Store the error message in state
        setLoading(false);       // Set loading to false even if there's an error
      });
  }, []); 




  // Deleting data from the server 
  const handleDelete = async (id) => {
    try {
      // Optimistically remove the member from the state
      setTeamMembers(teamMembers.filter(member => member.Id !== id));
  
      const response = await fetch(`http://localhost:3005/team-members/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }
  
      const data = await response.json();
  
      // Ensure data is an array before updating state
      if (Array.isArray(data)) {
        setTeamMembers(data);  // Refresh the team member list
      } else {
        throw new Error('Data returned from server is not an array');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setError('Error deleting team member');
    }
  };
  
 
  
  



  return (
    <div className="outer-container">

      <div className='teamMemberInsertion'>
        <h1 style={{textAlign: 'center'}}>Add Team Members</h1>
        <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Id">ID:</label>
          <input type="text" name="Id" value={formData.Id} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Position">Position:</label>
          <input type="text" name="Position" value={formData.Position} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="About">About:</label>
          <input type="text" name="About" value={formData.About} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Image">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
    </form>

      </div>


      
      <div className="teamMemberList">
      <h1 style={{ textAlign: 'center' }}>Team Members List</h1>
        <table border="1" className='team-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Position</th> 
              <th>About</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.Id}>
                <td>{member.Id}</td>
                <td>{member.Name}</td>
                <td>{member.Position}</td>
                <td>{member.About}</td>
                <td>
                  {member.Image && (
                            <img
                                src={`data:image/jpeg;base64,${member.Image}`} // Convert binary to base64 image
                                alt={member.Name}
                                style={{ width: '100px', height: '100px' }} // Adjust size as needed
                            />
                        )}
                </td>
                <td><button onClick={() => handleDelete(member.Id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
    
      </div>
    </div>
  );
}

export default TeamMembers;
