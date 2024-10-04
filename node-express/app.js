const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send("hola");
  res.send(process.env.MESSAGE);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});