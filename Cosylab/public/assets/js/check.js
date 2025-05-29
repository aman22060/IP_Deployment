// JavaScript code
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('publication-table').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    let publicationsData = []; // Store fetched data
    let currentPage = 1;
    const itemsPerPage = 10;

    // Fetch data from the server
    async function fetchData() {
        console.log("fetching data");
        const response = await fetch('/getConfig');
        const data = await response.json();
        publicationsData = data.publications;
        console.log(publicationsData);
        renderTable();
    }

    // Render table rows based on current page and search query
    function renderTable() {
        table.innerHTML = ''; // Clear existing rows
        const filteredData = filterData(publicationsData, searchInput.value);
        const sortedData = sortData(filteredData);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, sortedData.length);

        for (let i = startIndex; i < endIndex; i++) {
            const publication = sortedData[i];
            const row = table.insertRow();
            const yearCell = row.insertCell(0);
            const titleCell = row.insertCell(1);
            console.log(publication['Year of Publication']);
            console.log(publication['Title']);
            yearCell.textContent = publication['Year of Publication'];
            titleCell.textContent = publication['Title'];

            // Highlight special tags and additional comments
            if (publication['Tags']) {
                titleCell.innerHTML += `<span class="text-green-500 ml-2">${publication['Tags']}</span>`;
            }
            if (publication['Additional Comments']) {
                titleCell.innerHTML += `<span class="text-red-500 ml-2">${publication['Additional Comments']}</span>`;
            }
        }
    }

    // Filter data based on the search query
    function filterData(data, query) {
        return data.filter(publication =>
            publication['Title'].toLowerCase().includes(query.toLowerCase())
        );
    }

    // Sort data based on the selected column
    function sortData(data) {
        const sortColumn = document.querySelector('[data-sort].sorted');
        if (sortColumn) {
            const columnName = sortColumn.getAttribute('data-sort');
            data.sort((a, b) => {
                if (columnName === 'year') {
                    return a['Year of Publication'] - b['Year of Publication'];
                } else if (columnName === 'title') {
                    return a['Title'].localeCompare(b['Title']);
                }
            });
        }
        return data;
    }

    // Handle sorting when clicking on table headers
    document.querySelectorAll('[data-sort]').forEach(header => {
        header.addEventListener('click', () => {
            const currentlySorted = document.querySelector('[data-sort].sorted');
            if (currentlySorted) {
                currentlySorted.classList.remove('sorted');
            }
            header.classList.add('sorted');
            renderTable();
        });
    });

    // Handle pagination buttons
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const maxPage = Math.ceil(publicationsData.length / itemsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            renderTable();
        }
    });

    // Handle search input
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset to first page when searching
        renderTable();
    });

    // Initial data fetch
    fetchData();
});
