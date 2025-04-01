SELECT * FROM Talks;


CREATE TABLE News_Section (
    id INT PRIMARY KEY , 
    newsImg LONGBLOB,                 
    Title VARCHAR(255) NOT NULL,       
    Tile_Link VARCHAR(2083),           
    Description VARCHAR(500),          
    Additional_Info VARCHAR(500),      
    Additional_link VARCHAR(2083)    
);
DELETE FROM Talks WHERE Id = 15;


INSERT INTO Talks (Id, video_url, Title, Speaker)
VALUES (1, 'https://www.youtube.com/embed/UK0StoErSow', 'Data driven approaches to leveraging food for better health', 'TED Talk');


main Title,subtitle,subtitle ,link