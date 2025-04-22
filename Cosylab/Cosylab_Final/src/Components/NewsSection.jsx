import React, { useEffect, useState } from "react";

const NewsSection = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3005/news-section")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch news data");
                }
                return response.json();
            })
            .then((data) => {
                const formattedNews = data.map((news) => ({
                    image: news.newsImg,
                    title: news.Title,
                    link: news.Tile_Link,
                    description: news.Description,
                    extraDescription: news.Extra_Description || "",
                }));
                setNewsItems(formattedNews);
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
    }

    return (
        <div id = 'news-section'>
        <section style={{ padding: "50px 0", backgroundColor: "#f5f5f5" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>News & Views</h2>
                <hr style={{ width: "100px", border: "2px solid #ff6600", margin: "10px auto" }} />
            </div>

            <div 
                className="news-container"
                style={{
                    maxWidth: "90%",
                    margin: "0 auto",
                    position: "relative"
                }}
            >
                <div
                    className="news-scroll"
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "20px",
                        padding: "10px 0",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        scrollBehavior: "smooth",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {newsItems.map((news, index) => (
                        <div
                            key={index}
                            className="news-item"
                            style={{
                                position: "relative",
                                flexShrink: 0,
                                width: "300px",
                                height: "400px",
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                transition: "transform 0.3s ease-in-out",
                                backgroundColor: "#fff",
                                margin: "0 5px",
                            }}
                        >
                            <img
                                src={`data:image/jpeg;base64,${news.image}`}
                                alt={news.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                            />

                            {/* Content Overlay */}
                            <div className="news-overlay">
                                <h3>{news.title}</h3>
                                <p>{news.description}</p>
                                {news.extraDescription && <p className="extra">{news.extraDescription}</p>}
                                <a href={news.link} target="_blank" rel="noopener noreferrer">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Styling */}
            <style>
                {`
                .news-scroll {
                    -webkit-overflow-scrolling: touch;
                }
                
                .news-scroll::-webkit-scrollbar {
                    display: none;
                }
                
                .news-item {
                    position: relative;
                }

                .news-item:hover {
                    transform: translateY(-5px);
                }

                .news-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                    padding: 20px;
                    overflow-y: auto;
                }

                .news-item:hover .news-overlay {
                    opacity: 1;
                }

                .news-overlay h3 {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #ffcc00;
                }

                .news-overlay p {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .news-overlay .extra {
                    font-size: 12px;
                    font-style: italic;
                    opacity: 0.9;
                }

                .news-overlay a {
                    display: inline-block;
                    margin-top: 12px;
                    padding: 8px 14px;
                    background-color: #ff6600;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 14px;
                    font-weight: bold;
                    transition: background 0.3s ease-in-out;
                }

                .news-overlay a:hover {
                    background-color: #cc5200;
                }
                
                /* Responsive adjustments */
                @media (max-width: 1200px) {
                    .news-item {
                        width: 280px;
                    }
                }
                
                @media (max-width: 768px) {
                    .news-item {
                        width: 260px;
                        height: 380px;
                    }
                    
                    .news-container {
                        max-width: 95%;
                    }
                }
                
                @media (max-width: 480px) {
                    .news-item {
                        width: 240px;
                        height: 350px;
                    }
                    
                    .news-container {
                        max-width: 100%;
                    }
                }
                
                /* Make sure scrolling works smoothly on touch devices */
                @media (pointer: coarse) {
                    .news-scroll {
                        padding-bottom: 20px;  /* Add some space for comfortable touch scrolling */
                    }
                }
            `}
            </style>
        </section>
        </div>
    );
};

export default NewsSection;