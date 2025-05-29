import React, { useEffect, useState } from "react";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Fetch publications from localhost:3005
  useEffect(() => {
    fetch(`${VITE_API_BASE_URL}/publications`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPublications(data);
        setFilteredPublications(data);
      })
      .catch((err) => setError(err.message || "Failed to load publications"))
      .finally(() => setLoading(false));
  }, []);

  // Filter on search term
  useEffect(() => {
    const results = publications.filter((pub) =>
      pub.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.Year.toString().includes(searchTerm)
    );
    setFilteredPublications(results);
    setCurrentPage(1);
  }, [searchTerm, publications]);

  const indexOfLast = currentPage * publicationsPerPage;
  const indexOfFirst = indexOfLast - publicationsPerPage;
  const currentPublications = filteredPublications.slice(indexOfFirst, indexOfLast);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPublications.length / publicationsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const paginate = (page) => setCurrentPage(page);

  return (
    <section>
      <div className="sep-section" />
      <section>
        <div id="publication-section" className="wrapper">
          <h2 style={{ textAlign: "center", paddingTop:'20px' }}>PUBLICATIONS</h2>
          <hr style={{ width: "15%", margin: "0 auto" }} />
          <div className="container w-full mx-auto px-2" style={{ marginTop: "20px" }}>
            <div className="p-8 mt-6 rounded shadow bg-white">

              {/* Search bar */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", alignItems: "center" }}>
                <label htmlFor="search" style={{ marginRight: "10px", fontWeight: "bold" }}>
                  Search:
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search publications..."
                  style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "4px", width: "250px", fontSize: "14px" }}
                />
              </div>

              {/* Table or status */}
              {loading ? (
                <p style={{ textAlign: "center" }}>Loading publications…</p>
              ) : error ? (
                <p style={{ textAlign: "center", color: "red" }}>{error}</p>
              ) : (
                <>
                  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "#f8f9fa", fontWeight: "bold", textAlign: "left", padding: "12px" }}>Year</th>
                        <th style={{ backgroundColor: "#f8f9fa", fontWeight: "bold", textAlign: "left", padding: "12px" }}>Title (Click to View)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPublications.map((pub, idx) => (
                        <tr
                          key={idx}
                          style={{ borderBottom: "1px solid #ddd", transition: "transform 0.2s ease, background-color 0.2s ease" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.backgroundColor = "#f1f1f1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.backgroundColor = "";
                          }}
                        >
                          <td style={{ padding: "12px", verticalAlign: "middle" }}>{pub.Year}</td>
                          <td style={{ padding: "12px", verticalAlign: "middle" }}>
                            <a href={pub.Link} target="_blank" rel="noopener noreferrer" style={{ color: "#000", fontWeight: "600", textDecoration: "none" }}>
                              {pub.Title}
                            </a>
                            {pub.Anchor_text && (
                              <span style={{ display: "inline-block", backgroundColor: "#66b3ff", color: "#000", fontSize: "12px", fontWeight: "bold", padding: "3px 6px", marginLeft: "8px", borderRadius: "3px" }}>
                                {pub.Anchor_text}
                              </span>
                            )}
                            {pub.New && (
                              <span style={{ display: "inline-block", color: "#000", fontWeight: "bold", fontSize: "12px", marginLeft: "8px" }}>
                                New
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                    {pageNumbers.length > 1 && (
                      <>
                        <span
                          style={{ padding: "8px 12px", color: "#555", fontWeight: "bold", cursor: "pointer" }}
                          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        >
                          Previous
                        </span>

                        {pageNumbers.map((num) => (
                          <div key={num} style={{ margin: "0 4px", display: "flex" }} onClick={() => paginate(num)}>
                            <div
                              style={{
                                padding: "8px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                color: "#007bff",
                                fontWeight: "bold",
                                textDecoration: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minWidth: "32px",
                                backgroundColor: currentPage === num ? "#3999d8" : "",
                                color: currentPage === num ? "#fff" : "#007bff",
                              }}
                            >
                              {num}
                            </div>
                          </div>
                        ))}

                        <span
                          style={{ padding: "8px 12px", color: "#555", fontWeight: "bold", cursor: "pointer" }}
                          onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
                        >
                          Next
                        </span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Publications;
