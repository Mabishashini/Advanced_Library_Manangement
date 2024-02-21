const express = require("express");
const cors = require("cors")
const mysql = require("mysql2")

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "TaylorSwift@1989",
  database: "library",
  });

app.use(cors());
app.use(express.json())

app.get("/getBooks", (req, res)=>{
    const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
})

app.post('/addBook', (req, res) => {
  const { name, author, Genre, pub, copies, shelf } = req.body;

  const query = 'INSERT INTO books (name, author, Genre, pub, copies, shelf) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, author, Genre, pub, copies, shelf], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Book added successfully');
    res.json({ message: 'Book added successfully' });
  });
});

app.delete('/deleteBook/:id', (req, res) => {
  const bookId = req.params.id;

  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [bookId], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.affectedRows === 0) {
      // If no rows were affected, it means the book with the given ID was not found
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    console.log('Book deleted successfully');
    res.json({ message: 'Book deleted successfully' });
  });
});


app.listen(8800, (req, res) => {
    console.log("API Working!")
})