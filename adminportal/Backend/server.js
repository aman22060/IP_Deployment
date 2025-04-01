const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Define database connection details
const getVendorDetails = () => {
  return {
    db_name: "Admin_Portal",
    user: "root",
    password: "siddharth",
    ip: "localhost",
  };
};
const vendorDetails = getVendorDetails();
// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: vendorDetails.ip,
  user: vendorDetails.user,
  password: vendorDetails.password,
  database: vendorDetails.db_name,
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'amankumar', 
//     password: 'AK1465$$aman', 
//     database: 'Admin_Portal'
// });

db.connect((err) =>{
    if(err) throw err;
    console.log('Connected to the database');
});

// Set up Multer to store the image in memory (Buffer)
const storage = multer.memoryStorage();  // Use memory storage to get the image as buffer
const upload = multer({ storage: storage });

// GET route to fetch all team members
app.get('/team-members', (req, res) => {
    db.query('SELECT * FROM Team_Members', (err, results) => {
        if (err) {
            console.error('Error fetching team members:', err);
            return res.status(500).send('Error fetching team members');
        }

        // Convert image from binary to base64 for frontend rendering
        results.forEach(member => {
            if (member.Image) {
              member.Image = Buffer.from(member.Image).toString('base64');
            }
        });

        res.json(results);
    });
});

// DELETE route to remove a team member by ID
app.delete('/team-members/:id', (req, res) => {

    const memberId = req.params.id;
  
    // Delete the team member
    const deleteQuery = 'DELETE FROM Team_Members WHERE Id = ?';
    db.query(deleteQuery, [memberId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting team member' });
      }

      // Update the Id of Members after Deletion
      const updateQuery = 'UPDATE Team_Members SET Id = Id - 1 WHERE Id > ?';
      db.query(updateQuery, [memberId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating team members\' Ids' });
        }
  
        // Fetch the updated list of team members after deletion
        const selectQuery = 'SELECT * FROM Team_Members';
        db.query(selectQuery, (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Error fetching team members' });
          }
  
          // Ensure image data is in base64 format if needed
          results.forEach(member => {
            if (member.Image) {
              member.Image = Buffer.from(member.Image).toString('base64');
            }
          });
  
          // Send back the updated team members list as an array
          res.json(results); // results should be an array
        });
      });
    });
});

// POST route to handle team member creation
app.post('/team-members', upload.single('Image'), (req, res) => {
    try {
      const { Id, Name, Position, About } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      // Update IDs if needed, then insert new team member
      const updateQuery = 'UPDATE Team_Members SET Id = Id + 1 WHERE Id >= ? ORDER BY Id DESC';
      db.query(updateQuery, [Id], (err) => {
        if (err) {
          console.error('Error updating Ids:', err);
          return res.status(500).json({ message: 'Error updating team members\' Ids' });
        }
  
        const insertQuery = 'INSERT INTO Team_Members (Id, Name, Position, About, Image) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [Id, Name, Position, About, imageBuffer], (err) => {
          if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error saving data to database.');
          }
  
          // Fetch updated team members list
          const selectQuery = 'SELECT * FROM Team_Members';
          db.query(selectQuery, (err, results) => {
            if (err) {
              return res.status(500).json({ message: 'Error fetching team members' });
            }
  
            results.forEach(member => {
              if (member.Image) {
                member.Image = Buffer.from(member.Image).toString('base64');
              }
            });
  
            res.json(results);
          });
        });
      });
    } catch (error) {
      console.error('Unexpected server error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  


app.get('/talks',upload.none(),(req,res) => {
  db.query('SELECT * FROM Talks',(err,results)=>{
    if(err){
      console.error('Error Fetching Talks:',err);
      return res.status(500).send('Error Fetching Talks');
    }
    res.json(results);
  });

});

app.delete('/talks/:id',(req,res)=>{
  const talkId=req.params.id;
  const deleteQuery ='DELETE FROM Talks WHERE id = ?';

  db.query(deleteQuery,[talkId],(err,results)=>{
      if(err){
        return res.status(500).json({message:'Error Deleting Talks'});
      }
  
  const updateQuery = 'UPDATE Talks SET id = id-1 WHERE id > ?';
  db.query(updateQuery,[talkId],(err,results)=>{
    if(err){
      return res.status(500).json({message:'Error Updating Talks\'id'});
    }

  
  const selectQuery = 'SELECT * FROM Talks';
  db.query(selectQuery,(err,results)=>{
    if(err){
      return res.status(500).json({message: 'Error Fetching Talks'});
    }
    res.json(results);

});
});
});
});

app.post('/talks',(req,res)=>{
  try{
    console.log('Request Body:', req.body);

    const{id,video_url,Title,Speaker}=req.body;
    const updateQuery = 'UPDATE Talks SET id = id+1 WHERE id >= ? ORDER BY id DESC';
    db.query(updateQuery,[id],(err)=>{
      if(err){
        console.error('Error Updating Ids:',err);
        return res.status(500).json({message: ' Error Updating Talks\'id'});
      }
      const insertQuery = 'INSERT INTO Talks (id,video_url,Title,Speaker) VALUES (?,?,?,?)';

      db.query(insertQuery,[id,video_url,Title,Speaker],(err)=>{
        if(err){
          console.error('Error Inserting Data',err);
          return res.status(500).send('Error Saving Data to Database');
        }
        const selectQuery = 'SELECT * FROM Talks';
        db.query(selectQuery,(err,results)=>{
          if(err){
            return res.status(500).json({ message: 'Error Fetching Talks'});

          }
          res.json(results);
        });
      });
    });
    }catch(error){
      console.error('Unexpected Server Error :',error);
      res.status(500).send('Internal Server Error');
    }
});
// GET News Section
app.get('/news-section', (req, res) => {
  db.query('SELECT * FROM News_Section', (err, results) => {
    if (err) {
      console.error('Error fetching News:', err);
      return res.status(500).send('Error fetching News');
    }

    // Convert image from binary to base64 for frontend rendering
    results.forEach(newsItem => {
      if (newsItem.newsImg) {
        newsItem.newsImg = Buffer.from(newsItem.newsImg, 'binary').toString('base64');
      }
    });

    res.json(results);
  });
});

// POST News Section
app.post('/news-section', upload.single('Image'), (req, res) => {
  try {
    const { id, Title, Tile_Link, Description } = req.body;
    console.log(req.body);
    const imageBuffer = req.file ? req.file.buffer : null;
    // Update IDs if needed, then insert new team member
    const updateQuery = 'UPDATE News_Section SET id = id + 1 WHERE id >= ? ORDER BY id DESC';
    db.query(updateQuery, [id], (err) => {
      if (err) {
        console.error('Error updating Ids:', err);
        return res.status(500).json({ message: 'Error updating News\' Ids' });
      }

    
    // Insert new news item with image (if provided)
    const insertQuery = 'INSERT INTO News_Section (id, Title, Tile_Link, Description, newsImg) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [id, Title, Tile_Link, Description, imageBuffer], (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error saving data to database.');
      }

      // Fetch updated news items
      const selectQuery = 'SELECT * FROM News_Section';
      db.query(selectQuery, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching News' });
        }

        results.forEach(member => {
          if (member.Image) {
            member.Image = Buffer.from(member.Image).toString('base64');
          }
        });

        res.json(results);
      });});
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    res.status(500).send('Internal Server Error');
  }
});



// DELETE News Section
app.delete('/news-section/:id', (req, res) => {
  const memberId = req.params.id;

  // Delete the news item
  const deleteQuery = 'DELETE FROM News_Section WHERE id = ?';
  db.query(deleteQuery, [memberId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting News' });
    }

    // Fetch the updated list of news items after deletion
    const selectQuery = 'SELECT * FROM News_Section';
    db.query(selectQuery, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching News Section' });
      }

      // Ensure image data is in base64 format if needed
      results.forEach(member => {
        if (member.Image) {
          member.Image = Buffer.from(member.Image).toString('base64');
        }
      });

      res.json(results); // Return the updated list
    });
  });
});





app.get('/publications',upload.none(),(req,res) => {
  db.query('SELECT * FROM Publications',(err,results)=>{
    if(err){
      console.error('Error Fetching Publications:',err);
      return res.status(500).send('Error Fetching Publications');
    }
    res.json(results);
  });

});

app.delete('/publications/:id',(req,res)=>{
  const pubId=req.params.id;
  const deleteQuery ='DELETE FROM Publications WHERE id = ?';

  db.query(deleteQuery,[pubId],(err,results)=>{
      if(err){
        return res.status(500).json({message:'Error Deleting Publications'});
      }
  
  const updateQuery = 'UPDATE Publications SET id = id-1 WHERE id > ?';
  db.query(updateQuery,[pubId],(err,results)=>{
    if(err){
      return res.status(500).json({message:'Error Updating Publications\'id'});
    }

  
  const selectQuery = 'SELECT * FROM Publications';
  db.query(selectQuery,(err,results)=>{
    if(err){
      return res.status(500).json({message: 'Error Fetching Publications'});
    }
    res.json(results);

});
});
});
});

app.post('/publications',(req,res)=>{
  try{
    console.log('Request Body:', req.body);

    const{id,Title_Link,Title,Year,Anchor_text, Tags, addComments}=req.body;
    const updateQuery = 'UPDATE Publications SET id = id+1 WHERE id >= ? ORDER BY id DESC';
    db.query(updateQuery,[id],(err)=>{
      if(err){
        console.error('Error Updating Ids:',err);
        return res.status(500).json({message: ' Error Updating Publications\'id'});
      }
      const insertQuery = 'INSERT INTO Publications (id,TitleLink,Title,Year,Anchor_text, Tags, addComments) VALUES (?,?,?,?,?,?,?)';

      db.query(insertQuery,[id,Title_Link,Title,Year,Anchor_text, Tags, addComments],(err)=>{
        if(err){
          console.error('Error Inserting Data',err);
          return res.status(500).send('Error Saving Data to Database');
        }
        const selectQuery = 'SELECT * FROM Publications';
        db.query(selectQuery,(err,results)=>{
          if(err){
            return res.status(500).json({ message: 'Error Fetching Publications'});

          }
          res.json(results);
        });
      });
    });
    }catch(error){
      console.error('Unexpected Server Error :',error);
      res.status(500).send('Internal Server Error');
    }
});








  const PORT = 3005;
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
