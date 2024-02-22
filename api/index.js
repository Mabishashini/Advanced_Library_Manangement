const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv").config()

const app = express();


const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  ssl:{
    rejectUnauthorized:false,
  },
  sslmode:'require',

});

const allowedOrigins = ["https://advanced-library-manangement.vercel.app"];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/getBooks", async (req, res) => {
  try {
    const query = 'SELECT * FROM books';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addBook', async (req, res) => {
  try {
    const { name, author, Genre, pub, copies, shelf } = req.body;
    const query = 'INSERT INTO books (name, author, Genre, pub, copies, shelf) VALUES ($1, $2, $3, $4, $5, $6)';
    await pool.query(query, [name, author, Genre, pub, copies, shelf]);
    console.log('Book added successfully');
    res.json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteBook/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const query = 'DELETE FROM books WHERE id = $1';
    const result = await pool.query(query, [bookId]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      console.log('Book deleted successfully');
      res.json({ message: 'Book deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8800, () => {
  console.log("API Working!");
});
