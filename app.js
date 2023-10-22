const express = require('express');
const app = express();
const port = 3000; // You can choose any available port number

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
  res.render('index.ejs'); // This will render index.ejs
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});