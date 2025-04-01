import React, { useEffect, useState } from "react";
import config from "../config.json";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [publicationsPerPage] = useState(10);

  useEffect(() => {
    setPublications(config.publications);
  }, []);

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = publications.slice(
    indexOfFirstPublication,
    indexOfLastPublication
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(publications.length / publicationsPerPage); i++) {
    pageNumbers.push(i);
  }

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
      listStyleType: "none",
      marginTop: "20px",
    },
    pageItem: {
      margin: "0 5px",
    },
    pageLink: {
      padding: "5px 10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "pointer",
      color: "#007bff",
      fontWeight: "bold",
    },
    activePageLink: {
      backgroundColor: "#66b3ff",
      color: "#fff",
    },
    hoverEffect: {
      transform: "scale(1.02)", // Slightly enlarge the row
      backgroundColor: "#f1f1f1", // Light gray background on hover
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
              {/* Pagination */}
              <ul style={styles.pagination}>
                {pageNumbers.map((number) => (
                  <li key={number} style={styles.pageItem}>
                    <button
                      onClick={() => paginate(number)}
                      style={
                        currentPage === number
                          ? { ...styles.pageLink, ...styles.activePageLink }
                          : styles.pageLink
                      }
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Publications;
