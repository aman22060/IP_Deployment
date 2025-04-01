import React, { useState, useEffect } from "react";
import "../App.css";

function NewsSection() {
  const [news, setNews] = useState([]); // State to hold news data
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [error, setError] = useState(null); // Error state for handling errors
  const [formData, setFormData] = useState({
    // Form data state
    id: "",
    Title: "",
    Tile_Link: "",
    Description: "",
  });
  const [imageFile, setImageFile] = useState(null); // State for image file

  // Handle input change dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Save file to state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Tile_Link", formData.Tile_Link);
    formDataToSend.append("Description", formData.Description);

    if (imageFile) {
      formDataToSend.append("Image", imageFile); // Add image if it exists
    }

    try {
      const response = await fetch("http://localhost:3005/news-section", {
        method: "POST",
        body: formDataToSend, // Send FormData directly
      });

      if (response.ok) {
        const updatedNews = await response.json();
        setNews(updatedNews); // Update news list
        alert("Data submitted successfully");
      } else {
        alert("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the data");
    }
  };

  // Fetch news data on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3005/news-section");
        if (!response.ok) throw new Error("Failed to fetch news data");
        const data = await response.json();
        setNews(data); // Update news state with the fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures this runs once on mount

  // Delete news item
  const handleDelete = async (Id) => {
    try {
      // Optimistically remove item from UI
      setNews(news.filter((item) => item.id !== Id));

      const response = await fetch(`http://localhost:3005/news-section/${Id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete news");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setNews(data); // Update the news list
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      setError("Error deleting news");
    }
  };

  // Render Loading or Error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="outer-container">
      <div className="teamMemberInsertion">
        <h1 style={{ textAlign: "center" }}>Add News</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Title">Title:</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Tile_Link">Title Link:</label>
            <input
              type="url"
              name="Tile_Link"
              value={formData.Tile_Link}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description:</label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Image">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageFile && (
              <div>
                <p>Image Preview:</p>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      <div className="teamMemberList">
        <h1 style={{ textAlign: "center" }}>News List</h1>
        <table border="1" className="team-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Title Link</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {news.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Title}</td>
                <td>{item.Tile_Link}</td>
                <td>{item.Description}</td>
                <td>
                  {item.newsImg ? (
                    <>
                      {console.log("Image base64:", item.newsImg)}
                      <img
                        src={`data:image/jpeg;base64,${item.newsImg}`} // Display image from base64
                        alt={item.Title}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </>
                  ) : (
                    console.log("No image found for item:", item)
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsSection;
