import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./admin.css"

export const Admintable = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState([]);
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
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...books];

    filters.forEach((filter) => {
      const { selectedFilter, searchText } = filter;

      if (selectedFilter && searchText) {
        if (selectedFilter === "copies") {
          const searchValue = parseInt(searchText);
          if (!isNaN(searchValue)) {
            filtered = filtered.filter(
              (book) => book[selectedFilter] === searchValue
            );
          }
        } else {
          filtered = filtered.filter((book) =>
            book[selectedFilter]
              ?.toLowerCase()
              .includes(searchText.toLowerCase())
          );
        }
      }
    });

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleFilterChange = (e, index) => {
    const { name, value } = e.target;
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [name]: value };
    setFilters(newFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { selectedFilter: "", searchText: "" }]);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters([]);
  };

  // Logic to get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDelete =async (id)=>{
    await axios.delete(`https://advanced-library-manangement.onrender.com/deleteBook/${id}`)
    .then((response) => {
      console.log('Book deleted successfully:', response.data);
      // After successful deletion, fetch updated list of books
      fetchBooks();
    })
    .catch((error) => {
      console.error('Error deleting book:', error);
    });
  }

  return (
    <div>
      <header className="admin_header">
        <div className="admin_header-content">
          <h1>Library Management</h1>
          <Link to="/addBook">Add</Link>
          <Link to="/table">Logout</Link>
        </div>
      </header>

      <div className="filterContainer">
        {filters.map((filter, index) => (
          <div key={index} className="filter">
            <select
              name="selectedFilter"
              value={filter.selectedFilter}
              onChange={(e) => handleFilterChange(e, index)}
            >
              <option value="">Select Filter</option>
              <option value="name">Name</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
              <option value="pub">Publication</option>
              <option value="copies">Copies</option>
              <option value="shelf">Shelf</option>
            </select>
            <input
              type="text"
              placeholder="Enter search text"
              name="searchText"
              value={filter.searchText}
              onChange={(e) => handleFilterChange(e, index)}
            />
            <button onClick={() => removeFilter(index)}>X</button>
          </div>
        ))}
        <button
          className="filter_button"
          onClick={addFilter}
          disabled={filters.some((filter) => !filter.searchText.trim())}
        >
          Add Filter
        </button>
        <button
          className="filter_button"
          onClick={resetFilters}
          disabled={filters.length === 0}
        >
          Reset Filters
        </button>
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
              <th>Action</th>
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
                <td>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= filteredBooks.length}
        >
          Next
        </button>
      </div>
      
    </div>
  );
};
