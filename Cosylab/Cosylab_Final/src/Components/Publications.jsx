import React, { useEffect, useState } from "react";
import config from "../config.json";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [publicationsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPublications(config.publications);
    setFilteredPublications(config.publications);
  }, []);

  useEffect(() => {
    const results = publications.filter(publication =>
      publication.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication["Year of Publication"].toString().includes(searchTerm)
    );
    setFilteredPublications(results);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, publications]);

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredPublications.slice(
    indexOfFirstPublication,
    indexOfLastPublication
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPublications.length / publicationsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      fontWeight: "bold",
      textAlign: "left",
      padding: "12px",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
      transition: "transform 0.2s ease, background-color 0.2s ease",
    },
    tableCell: {
      padding: "12px",
      verticalAlign: "middle",
    },
    titleLink: {
      color: "#000000",
      fontWeight: "600",
      textDecoration: "none",
    },
    tag: {
      display: "inline-block",
      backgroundColor: "#66b3ff",
      color: "#000000",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "3px 6px",
      marginLeft: "8px",
      borderRadius: "3px",
    },
    newTag: {
      display: "inline-block",
      color: "#000000",
      fontWeight: "bold",
      fontSize: "12px",
      marginLeft: "8px",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
    pageItem: {
      margin: "0 4px",
      display: "flex",
    },
    pageLink: {
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
    },
    activePageLink: {
      backgroundColor: "#3999d8",
      color: "#fff",
    },
    navLink: {
      padding: "8px 12px",
      color: "#555",
      fontWeight: "bold",
      cursor: "pointer",
    },
    searchContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "20px",
      alignItems: "center",
    },
    searchLabel: {
      marginRight: "10px",
      fontWeight: "bold",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "250px",
      fontSize: "14px",
    },
  };

  return (
    <section>
      <div className="sep-section"></div>
      <section>
        <div id="publication-section" className="wrapper">
          <h2 style={{ textAlign: "center" }}>PUBLICATIONS</h2>
          <hr style={{ width: "15%", margin: "0 auto" }} />
          <div className="container w-full mx-auto px-2" style={{ marginTop: "20px" }}>
            <div className="p-8 mt-6 rounded shadow bg-white">
              {/* Search bar */}
              <div style={styles.searchContainer}>
                <label htmlFor="search" style={styles.searchLabel}>
                  Search:
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search publications..."
                  style={styles.searchInput}
                />
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Year</th>
                    <th style={styles.tableHeader}>Title (Click to View)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPublications.map((pub, index) => (
                    <tr
                      key={index}
                      style={styles.tableRow}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.backgroundColor = "#f1f1f1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      <td style={styles.tableCell}>{pub["Year of Publication"]}</td>
                      <td style={styles.tableCell}>
                        <a
                          href={pub.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.titleLink}
                        >
                          {pub.Title}
                        </a>
                        {pub["Anchor Text"] && (
                          <span style={styles.tag}>{pub["Anchor Text"]}</span>
                        )}
                        {pub.New && <span style={styles.newTag}>New</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Updated pagination to match the image */}
              <div style={styles.pagination}>
                {pageNumbers.length > 1 && (
                  <>
                    <span style={styles.navLink} onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
                      Previous
                    </span>
                    
                    {pageNumbers.map(number => (
                      <div 
                        key={number} 
                        style={styles.pageItem}
                        onClick={() => paginate(number)}
                      >
                        <div
                          style={{
                            ...styles.pageLink,
                            ...(currentPage === number ? styles.activePageLink : {})
                          }}
                        >
                          {number}
                        </div>
                      </div>
                    ))}
                    
                    <span 
                      style={styles.navLink} 
                      onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
                    >
                      Next
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Publications;