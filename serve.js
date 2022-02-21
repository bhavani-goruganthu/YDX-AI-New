const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
