const express = require('express');

const app = express();

const cors = require('cors');

app.use(express.static('./BackEnd/source'));
app.use(cors());
app.use(express.json());

// app.post('/setup', (req, res) => {
//   res.json({
//     result: req.body.n1 + req.body.n2,
//   });
// });

// app.get('/setup', (req, res) => 
//   console.log('Setting up board...');
//   res.send('hi');
// });

app.post('game/board/col', (req, res) => {
  res.json();
});

app.listen(8080, () => {
  console.log('server has started');
});
