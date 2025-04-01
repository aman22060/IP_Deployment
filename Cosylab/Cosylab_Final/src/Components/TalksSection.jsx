import React, { useEffect, useState } from "react";

const TalksSection = () => {
  const [talks, setTalks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3005/talks") // Replace with actual backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch talks");
        }
        return response.json();
      })
      .then((data) => {
        const formattedTalks = data.map((talk) => ({
          title: talk.title,
          src: talk.video_url,
        }));
        setTalks(formattedTalks);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <style>
        {`
          #talks-section {
            padding: 80px 0;
            background: linear-gradient(135deg, #f0f0f0, #d6d6d6);
            text-align: center;
          }

          .title-section {
            margin-bottom: 30px;
          }

          .title-section h2 {
            font-size: 36px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
          }

          .title-section hr {
            width: 60px;
            height: 4px;
            background: #ff5733;
            margin: 8px auto;
            border: none;
            border-radius: 2px;
          }

          .title-section p {
            font-size: 18px;
            color: #555;
            font-weight: 500;
          }

          .talks-container {
            display: flex;
            overflow-x: auto;
            white-space: nowrap;
            gap: 20px;
            padding: 20px;
            scrollbar-width: thin;
            scrollbar-color: rgb(236, 194, 185) #e0e0e0;
          }

          .talks-container::-webkit-scrollbar {
            height: 5px;
          }

          .talks-container::-webkit-scrollbar-track {
            background: #e0e0e0;
            border-radius: 10px;
          }

          .talks-container::-webkit-scrollbar-thumb {
            background: rgb(236, 194, 185);
            border-radius: 10px;
          }

          .talks-container::-webkit-scrollbar-thumb:hover {
            background: rgb(220, 170, 160);
          }

          .talk-card {
            display: inline-block;
            min-width: 30%;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 12px;
            border-radius: 15px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
            position: relative;
            overflow: hidden;
          }

          .talk-card:hover {
            transform: translateY(-10px) scale(1.05) rotate(2deg);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
            background: rgba(255, 255, 255, 0.4);
          }

          .talk-card iframe {
            width: 100%;
            height: 220px;
            border-radius: 8px;
            border: none;
            transition: transform 0.3s ease;
          }

          .talk-card:hover iframe {
            transform: scale(1.02);
          }

          @media (max-width: 900px) {
            .talks-container {
              flex-wrap: nowrap;
            }
            .talk-card {
              min-width: 90%;
            }
          }
        `}
      </style>
      <div id="talks-section">
        <div className="container">
          <div className="title-section">
            <h2>Featured Talks</h2>
            <hr />
            <p>Insights and discussions from industry experts</p>
          </div>
          <div className="talks-container">
            {talks.map((talk, index) => (
              <div className="talk-card" key={index}>
                <iframe
                  src={talk.src}
                  title={talk.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalksSection;
