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

/*const allowedOrigins = ["https://advanced-library-manangement.vercel.app"];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));*/

app.use(cors())
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


app.post("/register", async(req,res) => {
  const username = req.body.username;
  const password = req.body.password
  console.log("Hello")

  try {
    const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Insert new user into the database
    const newUser = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
})

app.listen(8800, () => {
  console.log("API Working!");
});
