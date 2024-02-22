import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./table.css"

export const Table = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    selectedFilter: "",
    searchText: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items to display per page

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, filters]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://advanced-library-manangement.onrender.com/getBooks");
      setBooks(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...books];
    const { selectedFilter, searchText } = filters;

    if (selectedFilter && searchText) {
      if (selectedFilter === "copies" ) {
        const searchValue = parseInt(searchText);
        if (!isNaN(searchValue)) {
          filtered = filtered.filter((book) => book[selectedFilter] === searchValue);
        }
      } else {
        filtered = filtered.filter((book) =>
          book[selectedFilter]?.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Logic to get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1>Library Management</h1>
          <Link to="/login">Login</Link>
        </div>
      </header>

      <div className="filterContainer">
        <select
          name="selectedFilter"
          value={filters.selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="">Select Filter</option>
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="Genre">Genre</option>
          <option value="pub">Publication</option>
          <option value="copies">Copies</option>
          <option value="shelf">Shelf</option>
        </select>
        <input
          type="text"
          placeholder="Enter search text"
          name="searchText"
          value={filters.searchText}
          onChange={handleFilterChange}
        />
      </div>
      
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication</th>
              <th>Copies</th>
              <th>Shelf Location</th>
              
            </tr>
          </thead>
          <tbody>
            {currentItems.map((book, index) => (
              <tr key={book.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.pub}</td>
                <td>{book.copies}</td>
                <td>{book.shelf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredBooks.length}>
          Next
        </button>
      </div>
      
    </div>
  );
};
