const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

app.post('/api/data', (req, res) => {
  res.send(req.body)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Hello word!!!');
})