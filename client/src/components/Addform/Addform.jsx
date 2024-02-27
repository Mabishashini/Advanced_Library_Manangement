import React, { useState } from 'react';
import axios from 'axios';
import './addform.css'; 
import { useNavigate } from 'react-router-dom';

export const Addform = () => {
  const [book, setBook] = useState({
    name: '',
    author: '',
    Genre: '',
    pub: '',
    copies: '',
    shelf: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });

    // Reset errors when user starts typing in the field
    setErrors({ ...errors, [name]: '' });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!book.name) {
      validationErrors.name = 'Please enter a name';
    } else if (!/^[A-Za-z. ]+$/.test(book.name)) {
      validationErrors.name = 'Name should contain only alphabets and dots';
    }
    if (!book.author) {
      validationErrors.author = 'Please enter an author';
    } else if (!/^[A-Za-z. ]+$/.test(book.author)) {
      validationErrors.author = 'Author should contain only alphabets and dots';
    }
    if (!book.Genre) {
      validationErrors.Genre = 'Please select a genre';
    }
    if (!book.pub) {
      validationErrors.pub = 'Please enter a publication';
    }
    if (!book.copies || book.copies < 0) {
      validationErrors.copies = 'Please enter a valid number of copies';
    }
    if (book.copies < 0) {
      validationErrors.copies = 'Copies should not be negative';
    }
    if (!book.shelf) {
      validationErrors.shelf = 'Please enter a shelf location';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If form is valid, submit data
    axios.post('http://localhost:8800/addBook', book)
      .then((response) => {
        console.log('Book added successfully:', response.data);
        alert("Book added successfully")
        navigate("/admin");
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });

    // Clear form fields after successful submission
    setBook({
      name: '',
      author: '',
      Genre: '',
      pub: '',
      copies: '',
      shelf: '',
    });
  };

  // Standard genres array
  const standardGenres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
  ];

  return (
    <div className="form-container">
      <h3 className="form_header">Add Book</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </label>
        <label>
          Genre:
          <select
            name="Genre"
            value={book.Genre}
            onChange={handleChange}
            className='select'
          >
            <option value="">Select Genre</option>
            {standardGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.Genre && <p className="error">{errors.Genre}</p>}
        </label>
        <label>
          Publication:
          <input
            type="text"
            name="pub"
            value={book.pub}
            onChange={handleChange}
          />
          {errors.pub && <p className="error">{errors.pub}</p>}
        </label>
        <label>
          Copies:
          <input
            type="number"
            name="copies"
            value={book.copies}
            onChange={handleChange}
          />
          {errors.copies && <p className="error">{errors.copies}</p>}
        </label>
        <label>
          Shelf Location:
          <input
            type="text"
            name="shelf"
            value={book.shelf}
            onChange={handleChange}
          />
          {errors.shelf && <p className="error">{errors.shelf}</p>}
        </label>
        <button type="submit">Add </button>
      </form>
    </div>
  );
};
