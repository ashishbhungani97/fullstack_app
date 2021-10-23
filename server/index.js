const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
app.use(express.json());
connectToMongo();


app.use(cors({
  origin: '*'
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/user',require('./routes/user'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
