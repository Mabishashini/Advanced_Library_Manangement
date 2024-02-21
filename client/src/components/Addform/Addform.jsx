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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.name || !book.author || !book.Genre || !book.pub || !book.copies || !book.shelf) {
      alert('Please fill in all fields');
      return;
    }
    axios.post('http://localhost:8800/addBook', book)
      .then((response) => {
        console.log('Book added successfully:', response.data);
        alert("Book added successfully")
        navigate("/admin");
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });

    setBook({
      name: '',
      author: '',
      Genre: '',
      pub: '',
      copies: '',
      shelf: '',
    });
  };

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
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="Genre"
            value={book.Genre}
            onChange={handleChange}
          />
        </label>
        <label>
          Publication:
          <input
            type="text"
            name="pub"
            value={book.pub}
            onChange={handleChange}
          />
        </label>
        <label>
          Copies:
          <input
            type="number"
            name="copies"
            value={book.copies}
            onChange={handleChange}
          />
        </label>
        <label>
          Shelf Location:
          <input
            type="text"
            name="shelf"
            value={book.shelf}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add </button>
      </form>
    </div>
  );
};
