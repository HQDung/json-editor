const express = require('express');

const app = express();
app.use(express.json());

app.post('/api/data', (req, res) => {
  res.send(req.body)
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening on port 5000'));

app.get('/', (req, res) => {
  res.send('Hello word!!!');
})