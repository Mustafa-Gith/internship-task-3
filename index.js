const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store books
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Clean Code", author: "Robert Martin" }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST add a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;

  books = books.map(book => book.id === id ? updatedBook : book);
  res.json(updatedBook);
});


// DELETE a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.sendStatus(204);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
